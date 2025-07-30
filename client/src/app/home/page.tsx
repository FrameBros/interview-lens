"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

import { Button } from "@/components/ui/moving-border";

// TODO Typewriter effect does not break after second word, typewriter thingy that pulses doesnt follow when new line (ACETERNITY UI TypewriterEffect component)
// TODO Change coloschemes of components
// TODO Make the "Hone your Interview now!" sized correctly, fix the border color, (ACETERNITY UI MovingBorder component)
// TODO create a modal for the signup/login buttons, use ui component from SUPABASE UI, but use shadcn dialog instead of modal popup from base react lowk cleaner

export default function InterviewLensLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Premium", link: "#" },
    { name: "About", link: "#" },
    { name: "Company Tracks", link: "#" },
    { name: "FAQ", link: "#" },
  ];
  const words = [
    {
      text: "Orbiting",
    },
    {
      text: "Barriers,",
    },
    {
      text: "Landing",
    },
    {
      text: "Opportunities",
    },
  ];

  return (
    <div>
      <div className=" bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>

        {/* Resizable Navbar */}
        <Navbar className="z-50">
          {/* Desktop Navigation */}
          <NavBody >
            {/* Custom Logo */}
            <NavbarLogo>
            </NavbarLogo>

            {/* Navigation Links */}
            <NavItems items={navItems} />

            {/* Right Side Buttons */}
            <div className="flex items-center gap-4">
              <NavbarButton
                className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
              >
                Log In
              </NavbarButton>
              <NavbarButton
                variant="primary"
                className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
              >
                Sign Up
              </NavbarButton>
            </div>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative block py-2 text-black hover:text-red"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex w-full flex-col gap-4 mt-4">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="dark"
                  className="w-full text-white hover:bg-black/50 border border-white/20"
                >
                  Log In
                </NavbarButton>
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full bg-black text-white border border-white/30 hover:bg-black/50"
                >
                  Sign Up
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        {/* Main Content */}
        <div className="relative flex items-center justify-between px-6 py-40 max-w-7xl mx-auto">
          <div className="flex-1 max-w-2xl flex flex-col items-center gap-8">
            <TypewriterEffect words={words} />
            <Button
              className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm text-lg rounded-xl"
              
            >
              Hone your Interview now!<br />
            </Button>
          </div>
        </div>
      </div>
      <div className="columns-3 p-6 mx-10 py-30 ">
        <Card className="h-150">
          <CardHeader>
            <CardTitle>Agile AI</CardTitle>
            
           
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        <Card className="h-150">
          <CardHeader>
            <CardTitle>Company Questions</CardTitle>
            
           
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        <Card className="h-150">
          <CardHeader>
            <CardTitle>Breakdown Skills, Eliminate Filler Words</CardTitle>
            
           
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>
      <div className=" bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="mx-30 py-30">
           <Card className = "h-150">
          <CardHeader>
            <CardTitle>About Us</CardTitle>
            
           
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        </div>
      </div>

    </div>
  );
}
