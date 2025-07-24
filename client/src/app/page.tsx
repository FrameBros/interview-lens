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
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

import { Button } from "@/components/ui/moving-border";

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
  );
}
