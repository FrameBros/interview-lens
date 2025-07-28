import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { config } from 'dotenv';
import { GoogleGenAI } from "@google/genai";

config();



const ai = new GoogleGenAI({});

  
export async function POST(req:NextRequest, res:NextRequest){
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
  return NextResponse.json({output:response })
}


