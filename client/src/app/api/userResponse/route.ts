// app/api/test-env/route.ts
import { config } from 'dotenv';
import { NextResponse } from 'next/server';

config();

export async function GET() {
    // Check if API key exists and log details
    
    const apiKey = process.env.OPEN_AI_KEY;
    
    console.log("API Key exists:", !!apiKey);
    console.log("API Key starts with sk-:", apiKey?.startsWith('sk-'));
    console.log("API Key length:", apiKey?.length);
    
    // Don't log the full key for security!
    if (apiKey) {
        console.log("First 10 chars:", apiKey.substring(0, 10) + "...");
    }

    return NextResponse.json({ 
        hasApiKey: !!apiKey,
        isValidFormat: apiKey?.startsWith('sk-') || false,
        keyLength: apiKey?.length || 0
    });
}
