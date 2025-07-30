import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase' // Adjust import path as needed

interface LoginProps {
  onSwitchToSignup?: () => void
}

// Rate limiting utility
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map()
  private maxAttempts: number
  private windowMs: number

  constructor(maxAttempts = 8, windowMs = 60 * 60 * 1000) { // 8 attempts per hour
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  canAttempt(identifier: string): boolean {
    const now = Date.now()
    const attemptData = this.attempts.get(identifier)

    if (!attemptData) {
      return true
    }

    // Reset if window has passed
    if (now > attemptData.resetTime) {
      this.attempts.delete(identifier)
      return true
    }

    return attemptData.count < this.maxAttempts
  }

  recordAttempt(identifier: string): void {
    const now = Date.now()
    const attemptData = this.attempts.get(identifier)

    if (!attemptData || now > attemptData.resetTime) {
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      })
    } else {
      attemptData.count++
    }
  }

  getRemainingTime(identifier: string): number {
    const attemptData = this.attempts.get(identifier)
    if (!attemptData) return 0
    
    const remaining = attemptData.resetTime - Date.now()
    return Math.max(0, remaining)
  }

  getRemainingAttempts(identifier: string): number {
    const attemptData = this.attempts.get(identifier)
    if (!attemptData) return this.maxAttempts
    
    if (Date.now() > attemptData.resetTime) {
      return this.maxAttempts
    }
    
    return Math.max(0, this.maxAttempts - attemptData.count)
  }
}

// Create a singleton instance
const rateLimiter = new RateLimiter(8, 60 * 60 * 1000) // 8 attempts per hour

export default function Login({ onSwitchToSignup }: LoginProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const validateForm = () => {
    const newErrors: string[] = []

    if (!formData.email.trim()) {
      newErrors.push('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('Please enter a valid email address')
    }

    if (!formData.password) {
      newErrors.push('Password is required')
    } else if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters')
    }

    return newErrors
  }

  const formatTime = (ms: number): string => {
    const minutes = Math.ceil(ms / (1000 * 60))
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`
    }
    const hours = Math.ceil(minutes / 60)
    return `${hours} hour${hours !== 1 ? 's' : ''}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    // Rate limiting check
    const identifier = formData.email.toLowerCase()
    if (!rateLimiter.canAttempt(identifier)) {
      const remainingTime = rateLimiter.getRemainingTime(identifier)
      const timeString = formatTime(remainingTime)
      setErrors([
        `Too many login attempts. Please try again in ${timeString}.`,
        `You have exceeded the maximum of 8 attempts per hour.`
      ])
      return
    }

    setIsLoading(true)
    setErrors([])

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (authError) {
        // Record failed attempt
        rateLimiter.recordAttempt(identifier)
        
        const remainingAttempts = rateLimiter.getRemainingAttempts(identifier)
        const errorMessages = [authError.message]
        
        if (remainingAttempts <= 3 && remainingAttempts > 0) {
          errorMessages.push(`Warning: ${remainingAttempts} attempts remaining before lockout.`)
        }
        
        setErrors(errorMessages)
        console.error('Login failed:', authError)
        return
      }

      // Successful login
      if (authData.user) {
        console.log('Login successful:', authData.user)
        
        // Clear the form
        setFormData({ email: '', password: '' })
        
        // Redirect to dashboard
        router.push('/dashboard')
      }

    } catch (error) {
      console.error('Login failed:', error)
      rateLimiter.recordAttempt(identifier)
      setErrors(['Login failed. Please try again.'])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          />
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        {onSwitchToSignup && (
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </button>
          </p>
        )}
      </form>
    </div>
  )
}