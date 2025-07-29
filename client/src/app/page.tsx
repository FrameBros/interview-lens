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
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "@/components/ui/moving-border";

// TODO Typewriter effect does not break after second word, typewriter thingy that pulses doesnt follow when new line (ACETERNITY UI TypewriterEffect component)
// TODO Change coloschemes of components
// TODO Make the "Hone your Interview now!" sized correctly
// TODO Create a 3D Marquee for company tracks
// TODO use ui component from SUPABASE UI in dialog buttons, 

export default function InterviewLensLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "About", link: "#about" },
    { name: "Premium", link: "#premium" },
    { name: "Company Tracks", link: "#company-tracks" },
    { name: "FAQ", link: "#faq" },
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
              <Dialog>
                <DialogTrigger asChild>
                  <NavbarButton
                    className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  >
                    Log In
                  </NavbarButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Log In</DialogTitle>
                    <DialogDescription>
                      Log in form goes here.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <NavbarButton
                    variant="primary"
                    className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  >
                    Sign Up
                  </NavbarButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sign Up</DialogTitle>
                    <DialogDescription>
                      {/* Place your signup form or content here */}
                      Sign up form goes here.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
        <div className="relative flex items-center justify-between px-6 py-60 max-w-7xl mx-auto">
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
      <div className="my-20">
        <p className="flex justify-center text-3xl font-semibold">Why Interview Lens</p>
        <div id="about" className="columns-3 p-6 mx-10 pbottom-20 ">
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50  group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  sm:w-[27rem] sm:h-[30rem] rounded-xl p-12 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Agile AI Interview
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Hover over this card to unleash the power of CSS perspective
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  sm:w-[27rem] sm:h-[30rem] rounded-xl p-12 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Dedicated Company Tracks
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Hover over this card to unleash the power of CSS perspective
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  sm:w-[27rem] sm:h-[30rem] rounded-xl p-12 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Eliminate Filler Words
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Breakdown Skills and blah blah blah
              </CardItem>
            </CardBody>
          </CardContainer>
      
        </div>
      </div>
      <div className=" bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="mx-30 py-30">
           <Card className = "h-150">
          <CardHeader>
            <CardTitle className="flex justify-center text-3xl">About Us</CardTitle>
            
           
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        </div>
      </div>
      <div id="company-tracks" className="my-20">
        <p className="flex justify-center text-3xl font-semibold">Company Tracks</p>
          

      </div>
      <div id="premium" className=" bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden ">
        <p className="flex justify-center text-3xl font-semibold my-20  ">Premium</p>
            
      </div>
    </div>
  );
}
