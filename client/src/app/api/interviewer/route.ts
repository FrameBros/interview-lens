import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { config } from 'dotenv';
import { GoogleGenAI } from "@google/genai";

config();



const ai = new GoogleGenAI({});



  
export async function POST(req:NextRequest, res:NextResponse){

    const {question} = await req.json()

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: question,
  });
  console.log(response.text);
  const message =  response?.candidates?.[0]?.content?.parts?.[0]?.text;

  return NextResponse.json({Answer:message})
}


