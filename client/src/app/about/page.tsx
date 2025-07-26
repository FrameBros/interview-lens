import React from 'react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="animated-gradient-bg">
      {/* Portraits Section - Takes full viewport height */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20">
        <div className="space-y-8 md:space-y-0 md:flex md:gap-8 lg:gap-12 xl:gap-16 justify-center items-center">
          {[
            { name: 'Ayro', src: '/images/Linkedin-ayro.jpeg' },
            { name: 'Aidan', src: '/images/Linkedin-Aidan.jpeg' },
            { name: 'Phuc', src: '/images/Linkedin-Phuc.jpeg' },
          ].map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-white rounded-lg shadow-lg" />
                <Image
                  src={member.src}
                  alt={`${member.name} portrait`}
                  width={200}
                  height={200}
                  className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-lg object-cover"
                />
              </div>
              <h2 className="text-white mt-4 text-lg sm:text-xl md:text-2xl font-medium">{member.name}</h2>
            </div>
          ))}
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-8 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Mission Statement Section - Takes full viewport height */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 lg:p-10 text-center">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6">Our Mission</h2>
            <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed">
              We empower businesses to thrive in the digital age by creating innovative,
              user-centric solutions that streamline operations, enhance customer
              experiences, and drive sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Content Section 1 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 lg:p-10 text-center">
            <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6">
              Our Services
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              This section can showcase your services, expertise, or company values. 
              Each section takes up the full viewport height, creating a natural scrolling experience.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Content Section 2 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 lg:p-10 text-center">
            <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6">
              Contact Us
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Ready to work with us? This section could contain contact information,
              a contact form, or links to your social media profiles.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
