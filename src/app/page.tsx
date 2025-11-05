"use client"

import { RefObject } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Users, Shield } from 'lucide-react';

export default function Index() {
  const featuresRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToPageSection = (refElement: RefObject<HTMLElement | null>) => {
    if(refElement.current != null){
      refElement.current.scrollIntoView({'behavior': 'smooth'})
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 px-6 lg:px-8 ${
        isScrolled
          ? 'bg-background/80 border-border/50'
          : 'bg-[#3A3A3C]/95 border-[#E8DCC8]/10'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <svg width="116" height="40" viewBox="38 0 256 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto transition-all duration-300">
                <g clipPath="url(#clip0_46_329)">
                  <path d="M78.3303 62.931H73.9624L65.115 40.5953L64.1719 38.188L62.931 35.0672L62.2547 33.3547L60.319 28.5029L58.135 34.0124L55.9573 39.5343L43.4555 71.1084H39.0876L53.7733 34.031L55.9573 28.5029L56.0566 28.2609L57.6697 24.1971H62.9931L64.4387 27.8701L64.6 28.2609L65.115 29.5453L67.2927 35.0672L78.3303 62.931Z" fill={isScrolled ? '#3F3F58' : '#E8DCC8'} className="transition-all duration-300"/>
                  <path d="M60.4617 50.3237L55.3244 63.3157L53.854 67.0507L53.7113 67.3982L53.6927 67.4354L52.2409 71.1084H47.8792L49.3248 67.4354L49.3496 67.3982L49.4923 67.0507L50.9566 63.3157L58.2777 44.8204L60.4617 50.3237Z" fill={isScrolled ? '#3F3F58' : '#E8DCC8'} className="transition-all duration-300"/>
                  <path d="M62.6642 44.8018L62.6456 44.8204L60.4617 50.3237L58.2777 44.8204L60.4617 39.2923L60.4803 39.2737L62.3788 44.1069L62.6642 44.8018Z" fill="#F0E8E5"/>
                  <path d="M69.9481 63.235H65.5803L60.4617 50.3237L58.2777 44.8204L60.4617 39.2923L62.6456 44.8204L69.9481 63.235Z" fill="url(#paint0_linear_46_329)"/>
                  <path d="M98.6062 58.3336C98.6087 61.2775 97.584 64.13 95.7087 66.3993C95.5581 66.5923 95.3943 66.7747 95.2186 66.9453C95.2186 66.9453 95.2186 66.9887 95.1814 67.0073C93.9896 68.294 92.5439 69.3194 90.9356 70.0189C89.3273 70.7184 87.5914 71.0767 85.8376 71.0712H52.2471L53.6989 67.3982V67.3547L53.8416 67.0073H85.8438C86.1365 67.0083 86.4289 66.9875 86.7186 66.9453C88.0395 66.8164 89.3125 66.3829 90.4375 65.6788C91.5625 64.9747 92.5089 64.0193 93.2022 62.8876C94.0662 61.5219 94.5205 59.9372 94.5113 58.3212C94.5113 56.0175 93.5962 53.8081 91.9672 52.1791C90.3382 50.5502 88.1289 49.635 85.8252 49.635H77.4368L75.8237 45.5712H85.8624C88.1661 45.5712 90.3755 44.656 92.0044 43.0271C93.6334 41.3981 94.5485 39.1887 94.5485 36.885C94.5485 34.5813 93.6334 32.372 92.0044 30.743C90.3755 29.114 88.1661 28.1989 85.8624 28.1989H68.9741L68.8066 27.808L67.3609 24.2095H85.8376C86.9038 24.2132 87.9658 24.3423 89.0018 24.5942C91.4036 25.2108 93.5736 26.5141 95.2463 28.3446C96.9191 30.1751 98.0221 32.4534 98.4203 34.9009C98.8186 37.3484 98.4949 39.8589 97.4888 42.1253C96.4827 44.3917 94.8378 46.3157 92.7555 47.662C94.5421 48.813 96.0131 50.3919 97.0348 52.2555C98.0565 54.1191 98.5966 56.2083 98.6062 58.3336Z" fill="url(#paint1_linear_46_329)"/>
                  <path d="M121.621 71.8248C120.173 71.8248 118.852 71.484 117.659 70.8023C116.509 70.0781 115.572 69.1408 114.847 67.9905C114.166 66.7976 113.825 65.4982 113.825 64.0923V63.0698H119.129V64.0923C119.129 64.774 119.363 65.3704 119.832 65.8816C120.343 66.3503 120.94 66.5846 121.621 66.5846H152.615C153.297 66.5846 153.872 66.3503 154.341 65.8816C154.852 65.3704 155.108 64.774 155.108 64.0923V53.4201C155.108 52.7385 154.852 52.1633 154.341 51.6947C153.872 51.1835 153.297 50.9278 152.615 50.9278H122.644V45.6876H150.57C151.252 45.6876 151.827 45.4533 152.296 44.9847C152.807 44.4734 153.063 43.877 153.063 43.1953V33.5457C153.063 32.864 152.807 32.2889 152.296 31.8202C151.827 31.309 151.252 31.0534 150.57 31.0534H121.621C120.94 31.0534 120.343 31.309 119.832 31.8202C119.363 32.2889 119.129 32.864 119.129 33.5457V35.2072H113.825V33.5457C113.825 32.0971 114.166 30.7977 114.847 29.6474C115.572 28.4546 116.509 27.5173 117.659 26.8356C118.852 26.1114 120.173 25.7492 121.621 25.7492H150.57C152.019 25.7492 153.318 26.1114 154.469 26.8356C155.661 27.5173 156.599 28.4546 157.28 29.6474C157.962 30.7977 158.303 32.0971 158.303 33.5457V43.1953C158.303 43.7918 158.218 44.3882 158.047 44.9847C157.919 45.5385 157.749 46.0498 157.536 46.5184C158.601 47.5409 159.325 48.6699 159.709 49.9054C160.135 51.1409 160.348 52.3125 160.348 53.4201V64.0923C160.348 65.4982 159.986 66.7976 159.261 67.9905C158.58 69.1408 157.643 70.0781 156.45 70.8023C155.299 71.484 154.021 71.8248 152.615 71.8248H121.621ZM174.61 71.8248C173.161 71.8248 171.84 71.484 170.648 70.8023C169.497 70.0781 168.581 69.1408 167.9 67.9905C167.218 66.7976 166.877 65.4982 166.877 64.0923V33.5457C166.877 32.0971 167.218 30.7977 167.9 29.6474C168.581 28.4546 169.497 27.5173 170.648 26.8356C171.84 26.1114 173.161 25.7492 174.61 25.7492H205.284V31.0534H174.61C173.928 31.0534 173.332 31.309 172.82 31.8202C172.352 32.2889 172.117 32.864 172.117 33.5457V42.748C172.117 43.4296 172.352 44.0261 172.82 44.5373C173.332 45.0486 173.928 45.3042 174.61 45.3042H205.604C207.01 45.3042 208.288 45.645 209.438 46.3267C210.631 47.0083 211.568 47.9456 212.25 49.1385C212.974 50.2888 213.336 51.5882 213.336 53.0367V64.0923C213.336 65.4982 212.974 66.7976 212.25 67.9905C211.568 69.1408 210.631 70.0781 209.438 70.8023C208.288 71.484 207.01 71.8248 205.604 71.8248H174.61ZM174.61 66.5846H205.604C206.285 66.5846 206.86 66.3503 207.329 65.8816C207.84 65.3704 208.096 64.774 208.096 64.0923V53.0367C208.096 52.3551 207.84 51.7799 207.329 51.3113C206.86 50.8 206.285 50.5444 205.604 50.5444H172.117V64.0923C172.117 64.774 172.352 65.3704 172.82 65.8816C173.332 66.3503 173.928 66.5846 174.61 66.5846ZM227.032 71.8248C225.583 71.8248 224.263 71.484 223.07 70.8023C221.919 70.0781 221.003 69.1408 220.322 67.9905C219.64 66.7976 219.299 65.4982 219.299 64.0923V33.6096C219.299 32.161 219.64 30.8616 220.322 29.7113C221.003 28.5185 221.919 27.5812 223.07 26.8995C224.263 26.1753 225.583 25.8131 227.032 25.8131H258.026C259.432 25.8131 260.71 26.1753 261.86 26.8995C263.053 27.5812 263.99 28.5185 264.672 29.7113C265.396 30.8616 265.758 32.161 265.758 33.6096V64.0923C265.758 65.4982 265.396 66.7976 264.672 67.9905C263.99 69.1408 263.053 70.0781 261.86 70.8023C260.71 71.484 259.432 71.8248 258.026 71.8248H227.032ZM225.179 66.5846H258.026C258.707 66.5846 259.283 66.3503 259.751 65.8816C260.262 65.3704 260.518 64.774 260.518 64.0923V37.4439L225.179 66.5846ZM224.54 60.258L259.815 31.1173H227.032C226.35 31.1173 225.754 31.3729 225.242 31.8841C224.774 32.3528 224.54 32.9279 224.54 33.6096V60.258ZM279.625 46.1989C278.176 46.1989 276.856 45.858 275.663 45.1764C274.512 44.4521 273.575 43.5149 272.851 42.3646C272.169 41.1717 271.828 39.8723 271.828 38.4664V33.0983C271.828 31.6498 272.169 30.3504 272.851 29.2001C273.575 28.0072 274.512 27.0699 275.663 26.3883C276.856 25.664 278.176 25.3019 279.625 25.3019H285.632C287.08 25.3019 288.38 25.664 289.53 26.3883C290.723 27.0699 291.66 28.0072 292.342 29.2001C293.066 30.3504 293.428 31.6498 293.428 33.0983V38.4664C293.428 39.8723 293.066 41.1717 292.342 42.3646C291.66 43.5149 290.723 44.4521 289.53 45.1764C288.38 45.858 287.08 46.1989 285.632 46.1989H279.625ZM278.219 42.3007H287.038C287.719 42.3007 288.295 42.0663 288.763 41.5977C289.274 41.0865 289.53 40.49 289.53 39.8084V31.7563C289.53 31.0747 289.274 30.4995 288.763 30.0309C288.295 29.5196 287.719 29.264 287.038 29.264H278.219C277.537 29.264 276.941 29.5196 276.429 30.0309C275.961 30.4995 275.727 31.0747 275.727 31.7563V39.8084C275.727 40.49 275.961 41.0865 276.429 41.5977C276.941 42.0663 277.537 42.3007 278.219 42.3007Z" fill="#D6B089"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_46_329" x1="68.8686" y1="65.5058" x2="59.593" y2="42.9033" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B7926D"/>
                    <stop offset="0.26" stopColor="#BE9973"/>
                    <stop offset="0.63" stopColor="#D1AC85"/>
                    <stop offset="1" stopColor="#EBC59D"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_46_329" x1="50.2927" y1="48.2515" x2="101.739" y2="47.0788" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B7926D"/>
                    <stop offset="0.51" stopColor="#B9946F"/>
                    <stop offset="0.7" stopColor="#C09A75"/>
                    <stop offset="0.83" stopColor="#CBA680"/>
                    <stop offset="0.93" stopColor="#DCB68F"/>
                    <stop offset="1" stopColor="#EBC59D"/>
                  </linearGradient>
                  <clipPath id="clip0_46_329">
                    <rect width="340" height="91.8248" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToPageSection(featuresRef)} className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-[#E8DCC8]/70 hover:text-[#E8DCC8]'
              }`}>
                Features
              </button>
              <button onClick={() => scrollToPageSection(servicesRef)} className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-[#E8DCC8]/70 hover:text-[#E8DCC8]'
              }`}>
                Services
              </button>
              <button onClick={() => scrollToPageSection(testimonialsRef)} className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-[#E8DCC8]/70 hover:text-[#E8DCC8]'
              }`}>
                Testimonials
              </button>
              <button onClick={() => scrollToPageSection(pricingRef)} className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-[#E8DCC8]/70 hover:text-[#E8DCC8]'
              }`}>
                Pricing
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className={
                  isScrolled
                    ? ''
                    : 'text-[#E8DCC8] hover:bg-[#E8DCC8]/10 hover:text-[#E8DCC8]'
                }>Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className={`group ${
                  isScrolled
                    ? ''
                    : 'bg-[#E8DCC8] hover:bg-[#DDD3C0] text-[#3A3A3C] border-0'
                }`}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden bg-[#3A3A3C]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3A3A3C] via-[#2F2F31] to-[#3A3A3C] pointer-events-none" />
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#E8DCC8]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#E8DCC8]/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left flex flex-col justify-center">
              <div className="inline-flex size-max items-center gap-2 px-4 py-2 rounded-full bg-[#E8DCC8]/10 border border-[#E8DCC8]/20 mb-8">
                <Sparkles className="h-4 w-4 text-[#E8DCC8]" />
                <span className="text-sm font-medium text-[#E8DCC8]">AI-Powered Marketing Platform</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                <span className="text-[#E8DCC8]">
                  Marketing Intelligence,
                </span>
                <br />
                <span className="text-[#E8DCC8]">
                  Reimagined
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-[#E8DCC8]/80 mb-12 leading-relaxed">
                Transform your marketing agency with AI-powered tools that streamline strategy, creativity, and execution. All in one elegant platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12">
                <Link href="/sign-up">
                  <Button size="lg" className="text-base px-8 group bg-[#E8DCC8] hover:bg-[#DDD3C0] text-[#3A3A3C] border-0 font-semibold">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="text-base px-8 border-[#E8DCC8]/40 text-primary-background hover:bg-[#E8DCC8]/10 hover:text-[#E8DCC8]">
                    Watch Demo
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-70">
                <div className="flex items-center gap-2 text-[#E8DCC8]">
                  <Shield className="h-5 w-5 text-[#E8DCC8]" />
                  <span className="text-sm">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2 text-[#E8DCC8]">
                  <Users className="h-5 w-5 text-[#E8DCC8]" />
                  <span className="text-sm">500+ Agencies</span>
                </div>
                <div className="flex items-center gap-2 text-[#E8DCC8]">
                  <TrendingUp className="h-5 w-5 text-[#E8DCC8]" />
                  <span className="text-sm">10x Faster Delivery</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:order-last flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[450px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E8DCC8]/10 bg-gradient-to-br from-[#2F2F31] via-[#3A3A3C] to-[#2F2F31]">
                <Image
                  src="/hero.svg"
                  alt="AB360 Platform Dashboard"
                  width={500}
                  height={375}
                  className="w-full h-full object-cover opacity-90"
                  priority
                />
                {/* Floating Elements */}
                <div className="absolute top-1/4 -right-4 w-24 h-24 bg-[#E8DCC8]/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-1/4 -left-4 w-32 h-32 bg-[#E8DCC8]/5 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-6 lg:px-8 bg-gradient-to-b from-secondary/20 via-secondary/30 to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything you need to excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for modern marketing agencies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-premium group hover:scale-[1.02] transition-transform">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Reduce project timelines from months to weeks with AI-powered automation and intelligent workflows.
              </p>
            </div>

            <div className="card-premium group hover:scale-[1.02] transition-transform">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Precision Targeting</h3>
              <p className="text-muted-foreground leading-relaxed">
                Leverage advanced market research and audience insights to create campaigns that truly resonate.
              </p>
            </div>

            <div className="card-premium group hover:scale-[1.02] transition-transform">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data-Driven Growth</h3>
              <p className="text-muted-foreground leading-relaxed">
                Make informed decisions with real-time analytics and AI-powered recommendations.
              </p>
            </div>

            <div className="card-premium group hover:scale-[1.02] transition-transform">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Seamlessly coordinate across teams with integrated tools and real-time collaboration features.
              </p>
            </div>

            <div className="card-premium group hover:scale-[1.02] transition-transform">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bank-grade encryption and compliance with international security standards.
              </p>
            </div>

            <div className="card-premium group hover:scale-[1.02] transition-transform">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Harness the power of artificial intelligence to generate creative ideas and strategic recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Comprehensive Marketing Suite
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All the tools you need, unified in one powerful platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Brand Management", desc: "Build and maintain powerful brand identities with AI-assisted design and strategy tools.", gradient: "from-blue-500/10 to-indigo-500/10" },
              { title: "Market Research", desc: "Deep market insights powered by AI to understand your audience and competition.", gradient: "from-purple-500/10 to-pink-500/10" },
              { title: "Media Planning", desc: "Optimize your media spend with intelligent planning and forecasting tools.", gradient: "from-emerald-500/10 to-teal-500/10" },
              { title: "Marketing Strategy", desc: "Develop winning strategies with data-driven insights and AI recommendations.", gradient: "from-orange-500/10 to-red-500/10" },
              { title: "Digital Marketing", desc: "Execute multi-channel campaigns with precision and track performance in real-time.", gradient: "from-cyan-500/10 to-blue-500/10" },
              { title: "Proposal Development", desc: "Create compelling pitches and proposals with AI-powered content generation.", gradient: "from-violet-500/10 to-purple-500/10" },
            ].map((service, idx) => (
              <Link key={idx} href="/sign-up">
                <div className="group relative p-8 rounded-2xl border-2 border-border/50 bg-card hover:border-primary/50 transition-all hover:shadow-premium-lg cursor-pointer h-full overflow-hidden">
                  {/* Background gradient decoration */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="relative">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.desc}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-2 transition-transform">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 px-6 lg:px-8 bg-gradient-to-br from-secondary/40 via-secondary/20 to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Trusted by leading agencies
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how AB360 is transforming marketing workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Thobeka Dlongolo", role: "Managing Director - Biza iAfrica Consultants", quote: "This platform has transformed how we serve our clients. A three month project can now take 3 weeks through AB 360.", initials: "TD", color: "from-blue-500 to-indigo-500" },
              { name: "James Maposa", role: "Managing Director - Birguid", quote: "The AI-powered insights have revolutionized our strategy development. We're delivering better results in a fraction of the time.", initials: "JM", color: "from-purple-500 to-pink-500" },
              { name: "Olebone Sepeng", role: "Operations Specialist", quote: "AB360 streamlined our entire workflow. The collaboration features alone have saved us countless hours of coordination time.", initials: "OS", color: "from-emerald-500 to-teal-500" },
            ].map((testimonial, idx) => (
              <div key={idx} className="card-premium">
                <div className="mb-6">
                  <div className="flex items-center gap-1 text-primary mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-24 px-6 lg:px-8 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your agency&apos;s needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Essential",
                price: "R140,000",
                features: ["1-3 Modules", "Advanced Analytics", "Email Support", "Unlimited Users", "Basic AI Features"],
                popular: false
              },
              {
                name: "Professional",
                price: "R170,500",
                features: ["4-6 Modules", "Advanced Analytics", "Priority Support", "Unlimited Users", "Full AI Suite", "Custom Integrations"],
                popular: true
              },
              {
                name: "Premium",
                price: "R200,000",
                features: ["All Modules", "Advanced Analytics", "24/7 Premium Support", "Unlimited Users", "Full AI Suite", "Custom Integrations", "Dedicated Account Manager"],
                popular: false
              },
            ].map((plan, idx) => (
              <div key={idx} className={`relative p-8 rounded-2xl border-2 ${plan.popular ? 'border-primary shadow-premium-lg scale-105' : 'border-border/50'} bg-card transition-all hover:shadow-premium-lg`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full" size="lg" variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to transform your agency?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join hundreds of agencies already using AB360 to deliver exceptional results faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="text-base px-8 group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="text-base px-8">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8DCC8]/10 py-12 px-6 lg:px-8 bg-gradient-to-b from-[#3A3A3C] via-[#2F2F31] to-[#3A3A3C]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/header-logo.svg"
                  alt="AB360 Logo"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-[#E8DCC8]/70 mb-4 max-w-md">
                AI-powered marketing platform for modern agencies. Transform your workflow and deliver exceptional results.
              </p>
              <p className="text-sm text-[#E8DCC8]/50">
                © 2025 AdBoss Media Group. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#E8DCC8]">Product</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToPageSection(featuresRef)} className="text-[#E8DCC8]/70 hover:text-[#E8DCC8] transition-colors">Features</button></li>
                <li><button onClick={() => scrollToPageSection(servicesRef)} className="text-[#E8DCC8]/70 hover:text-[#E8DCC8] transition-colors">Services</button></li>
                <li><button onClick={() => scrollToPageSection(pricingRef)} className="text-[#E8DCC8]/70 hover:text-[#E8DCC8] transition-colors">Pricing</button></li>
                <li><button onClick={() => scrollToPageSection(testimonialsRef)} className="text-[#E8DCC8]/70 hover:text-[#E8DCC8] transition-colors">Testimonials</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#E8DCC8]">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="text-[#E8DCC8]/70">Tel: +27 69 269 6312</li>
                <li className="text-[#E8DCC8]/70">Cell: +27 82 798 5262</li>
                <li className="text-[#E8DCC8]/70">info@adbossmedia.com</li>
                <li className="text-[#E8DCC8]/70 mt-4">
                  64 Stone Manor<br />
                  46 North Road<br />
                  Morningside, Sandton<br />
                  2196
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#E8DCC8]/10">
            <div className="flex items-center gap-6 text-sm text-[#E8DCC8]/70 mb-4 md:mb-0">
              <a href="#" className="hover:text-[#E8DCC8] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[#E8DCC8] transition-colors">Privacy Policy</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-[#E8DCC8]/10 hover:bg-[#E8DCC8]/20 flex items-center justify-center transition-colors text-[#E8DCC8]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#E8DCC8]/10 hover:bg-[#E8DCC8]/20 flex items-center justify-center transition-colors text-[#E8DCC8]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#E8DCC8]/10 hover:bg-[#E8DCC8]/20 flex items-center justify-center transition-colors text-[#E8DCC8]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
