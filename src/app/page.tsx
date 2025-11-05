"use client"

import { RefObject } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Users, Shield } from 'lucide-react';

export default function Index() {
  const featuresRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)

  const scrollToPageSection = (refElement: RefObject<HTMLElement | null>) => {
    if(refElement.current != null){
      refElement.current.scrollIntoView({'behavior': 'smooth'})
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/header-logo.svg"
                alt="AB360 Logo"
                width={180}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToPageSection(featuresRef)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </button>
              <button onClick={() => scrollToPageSection(servicesRef)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Services
              </button>
              <button onClick={() => scrollToPageSection(testimonialsRef)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </button>
              <button onClick={() => scrollToPageSection(pricingRef)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="group">
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
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8DCC8]/10 border border-[#E8DCC8]/20 mb-8">
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
                  <Button size="lg" variant="outline" className="text-base px-8 border-[#E8DCC8]/40 text-[#E8DCC8] hover:bg-[#E8DCC8]/10 hover:text-[#E8DCC8]">
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
            <div className="relative lg:order-last">
              <div className="relative w-[480px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E8DCC8]/10 bg-gradient-to-br from-[#2F2F31] via-[#3A3A3C] to-[#2F2F31]">
                <Image
                  src="/hero.svg"
                  alt="AB360 Platform Dashboard"
                  width={480}
                  height={400}
                  className=" opacity-90"
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
      <footer className="border-t border-border/50 py-12 px-6 lg:px-8 bg-gradient-to-b from-secondary/10 to-background">
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
              <p className="text-muted-foreground mb-4 max-w-md">
                AI-powered marketing platform for modern agencies. Transform your workflow and deliver exceptional results.
              </p>
              <p className="text-sm text-muted-foreground">
                © 2025 AdBoss Media Group. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToPageSection(featuresRef)} className="text-muted-foreground hover:text-foreground transition-colors">Features</button></li>
                <li><button onClick={() => scrollToPageSection(servicesRef)} className="text-muted-foreground hover:text-foreground transition-colors">Services</button></li>
                <li><button onClick={() => scrollToPageSection(pricingRef)} className="text-muted-foreground hover:text-foreground transition-colors">Pricing</button></li>
                <li><button onClick={() => scrollToPageSection(testimonialsRef)} className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="text-muted-foreground">Tel: +27 69 269 6312</li>
                <li className="text-muted-foreground">Cell: +27 82 798 5262</li>
                <li className="text-muted-foreground">info@adbossmedia.com</li>
                <li className="text-muted-foreground mt-4">
                  64 Stone Manor<br />
                  46 North Road<br />
                  Morningside, Sandton<br />
                  2196
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4 md:mb-0">
              <a href="#" className="hover:text-foreground transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
