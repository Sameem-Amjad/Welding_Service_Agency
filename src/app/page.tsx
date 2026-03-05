"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Shield, Wrench, Zap, Truck, Hammer, Settings, Menu, X, ChevronRight, Star, MapPin, Phone, Mail, CheckCircle2, Loader2, ArrowRight, Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// --- THEME CONSTANTS ---
const ACCENT_COLOR = '#ff6b00';

// --- ZOD SCHEMA ---
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
type ContactFormInputs = z.infer<typeof contactSchema>;

// --- DATA ---
const SERVICES = [
  { icon: Shield, title: 'Structural Welding', desc: 'Heavy-duty structural steel welding for commercial and industrial buildings.' },
  { icon: Wrench, title: 'Custom Fabrication', desc: 'Precision metal fabrication tailored to your exact specifications.' },
  { icon: Settings, title: 'Industrial Welding', desc: 'High-volume, specialized welding for manufacturing and plant operations.' },
  { icon: Truck, title: 'Mobile Welding', desc: '24/7 on-site emergency repairs and mobile welding services.' },
  { icon: Zap, title: 'Aluminum & Stainless', desc: 'TIG welding experts for sensitive materials requiring clean, precise welds.' },
  { icon: Hammer, title: 'Repair & Maintenance', desc: 'Comprehensive equipment repair and structural maintenance programs.' },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?q=80&w=1170&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533201357341-8d79b10dd0f0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800&auto=format&fit=crop',
];

const TESTIMONIALS = [
  { name: 'James Peterson', role: 'Construction Manager', text: 'Their structural welding team is unmatched. Delivered our steel framework 2 weeks ahead of schedule with flawless inspection results.' },
  { name: 'Sarah Jenkins', role: 'Facility Director', text: 'The mobile repair unit saved our production line. Arrived within an hour and had us back up and running. True professionals.' },
  { name: 'Michael Chen', role: 'Architect', text: 'Their custom aluminum fabrication work is essentially art. Precise, clean, and exactly to our demanding specifications.' },
];

// --- COMPONENTS ---

const AnimatedCounter = ({ end, suffix = '' }: { end: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Sparks = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#ff6b00] rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            opacity: 0,
            scale: Math.random() * 2,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
            x: `+=${(Math.random() - 0.5) * 100}`,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
          style={{ filter: 'blur(1px)', boxShadow: '0 0 10px #ff6b00' }}
        />
      ))}
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Simulate initial load
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    // Fake API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    reset();
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white">
        <div className="relative flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <Settings size={64} className="text-zinc-800" />
          </motion.div>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute">
            <Zap size={32} color={ACCENT_COLOR} fill={ACCENT_COLOR} />
          </motion.div>
        </div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 text-2xl font-black tracking-widest uppercase">
          Forge <span className="text-[#ff6b00]">&</span> Spark
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-[#ff6b00] selection:text-white">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#ff6b00] origin-left z-50" style={{ scaleX }} />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <Zap className="text-[#ff6b00]" size={28} fill="#ff6b00" />
            <span className="text-2xl font-black text-white uppercase tracking-wider">Forge<span className="text-[#ff6b00]">.</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            {['Services', 'About', 'Gallery', 'Testimonials'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:text-[#ff6b00] transition-colors">{item}</button>
            ))}
            <button onClick={() => scrollTo('contact')} className="bg-[#ff6b00] hover:bg-[#e66000] text-white px-6 py-2.5 rounded-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(255,107,0,0.5)] flex items-center gap-2">
              Get a Quote <ArrowRight size={16} />
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-30 bg-zinc-950 pt-24 px-6 md:hidden">
            <div className="flex flex-col gap-6 text-xl">
              {['Services', 'About', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-left font-bold text-white hover:text-[#ff6b00] pb-4 border-b border-zinc-800">{item}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop" alt="Welding Sparks" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-zinc-950/40" />
        </div>

        <Sparks />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse" />
              <span className="text-sm font-medium text-zinc-300">Industrial & Commercial Experts</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight uppercase">
              Precision Welding. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-yellow-500">Built to Last.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl">
              High-performance fabrication and structural welding services. Certified professionals delivering unyielding strength and precision for your most demanding projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('contact')} className="bg-[#ff6b00] hover:bg-[#e66000] text-white px-8 py-4 rounded-sm font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(255,107,0,0.6)] flex items-center justify-center gap-2">
                Request Quote <ChevronRight size={20} />
              </button>
              <button onClick={() => scrollTo('services')} className="bg-transparent border-2 border-zinc-700 hover:border-zinc-500 text-white px-8 py-4 rounded-sm font-bold text-lg transition-all flex items-center justify-center gap-2">
                View Our Services
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-2">Our Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Industrial Services</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 bg-zinc-900 border border-zinc-800 rounded-sm hover:border-[#ff6b00]/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 group-hover:rotate-12 duration-500 text-white">
                  <service.icon size={120} />
                </div>
                <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 flex items-center justify-center rounded-sm mb-6 group-hover:bg-[#ff6b00] group-hover:border-[#ff6b00] transition-colors">
                  <service.icon className="text-[#ff6b00] group-hover:text-white" size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-zinc-400 relative z-10 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="absolute -inset-4 border border-[#ff6b00]/30 translate-x-4 translate-y-4 rounded-sm" />
            <div className="relative z-10 w-full rounded-sm overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1526634140919-468dc3ae3870?q=80&w=687&auto=format&fit=crop" alt="Welder Working" width={687} height={687} className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#ff6b00] text-white p-6 rounded-sm z-20 shadow-2xl">
              <div className="text-4xl font-black mb-1"><AnimatedCounter end={15} suffix="+" /></div>
              <div className="text-sm font-bold uppercase tracking-wider">Years Experience</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-2">Who We Are</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">Forged by Expertise. Driven by Quality.</h3>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              Since our founding, Forge & Spark has been the backbone of structural integrity for hundreds of industrial and commercial projects. We don't just weld metal; we fuse trust, safety, and durability into every joint.
            </p>
            <ul className="space-y-4 mb-10">
              {['AWS Certified Welders', 'Rigorous Safety Standards', 'State-of-the-Art Equipment', 'On-Time Project Delivery'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-medium">
                  <CheckCircle2 className="text-[#ff6b00]" size={20} /> {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-8 border-t border-zinc-800 pt-8">
              <div>
                <div className="text-3xl font-black text-white mb-1"><AnimatedCounter end={500} suffix="+" /></div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-bold">Projects Done</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1"><AnimatedCounter end={98} suffix="%" /></div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-bold">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-2">Our Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Recent Projects</h3>
            </div>
            <button className="hidden md:flex items-center gap-2 text-white hover:text-[#ff6b00] transition-colors font-bold uppercase tracking-wide">
              View Full Gallery <ArrowRight size={18} />
            </button>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {GALLERY.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative overflow-hidden group cursor-pointer break-inside-avoid rounded-sm"
              >
                <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <Zap className="text-[#ff6b00] scale-0 group-hover:scale-100 transition-transform duration-300" size={32} />
                </div>
                <Image src={img} alt={`Project ${idx}`} width={400} height={300} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
          <button className="mt-8 md:hidden w-full flex items-center justify-center gap-2 text-white border border-zinc-800 py-4 hover:border-[#ff6b00] transition-colors font-bold uppercase tracking-wide">
            View Full Gallery <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-zinc-900 border-t border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-800/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-2">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Ironclad Reputations</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-zinc-950/50 backdrop-blur-sm p-8 rounded-sm border border-zinc-800 relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-[#ff6b00] fill-[#ff6b00]" />)}
                </div>
                <p className="text-zinc-300 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <h4 className="text-white font-bold uppercase">{testimonial.name}</h4>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-[#ff6b00]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6 drop-shadow-lg">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/90 mb-10 font-medium">Get a precise estimate for your fabrication or structural needs today.</p>
          <button onClick={() => scrollTo('contact')} className="bg-zinc-950 hover:bg-zinc-900 text-white px-10 py-5 rounded-sm font-black text-xl tracking-wider uppercase transition-all shadow-2xl hover:scale-105">
            Get a Free Quote Now
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-[#ff6b00] font-bold tracking-widest uppercase mb-2">Contact Us</h2>
            <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-8">Let's Talk Metal.</h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-sm shrink-0">
                  <MapPin className="text-[#ff6b00]" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase mb-1">Headquarters</h4>
                  <p className="text-zinc-400">123 Industrial Forge Ave,<br />Steel City, SC 45091</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-sm shrink-0">
                  <Phone className="text-[#ff6b00]" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase mb-1">Phone</h4>
                  <p className="text-zinc-400">1-800-WELD-PRO</p>
                  <p className="text-zinc-400 text-sm">24/7 Mobile Dispatch Available</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-sm shrink-0">
                  <Mail className="text-[#ff6b00]" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase mb-1">Email</h4>
                  <p className="text-zinc-400">quotes@forgespark.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 w-full h-48 bg-zinc-900 border border-zinc-800 rounded-sm relative overflow-hidden group">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-zinc-950/80 text-white px-4 py-2 font-bold uppercase tracking-widest border border-zinc-800 backdrop-blur-sm">View on Map</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-zinc-900 p-8 md:p-10 rounded-sm border border-zinc-800">
            {isSubmitSuccessful ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase mb-4">Request Received</h3>
                <p className="text-zinc-400 text-lg">Our engineering team will review your specifications and contact you within 24 hours.</p>
                <button onClick={() => reset()} className="mt-8 text-[#ff6b00] font-bold uppercase tracking-widest hover:text-white transition-colors">Submit Another Request</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
                    <input {...register('name')} className={`w-full bg-zinc-950 border ${errors.name ? 'border-red-500' : 'border-zinc-800'} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#ff6b00] transition-colors`} placeholder="John Doe" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone</label>
                    <input {...register('phone')} className={`w-full bg-zinc-950 border ${errors.phone ? 'border-red-500' : 'border-zinc-800'} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#ff6b00] transition-colors`} placeholder="(555) 123-4567" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                  <input {...register('email')} className={`w-full bg-zinc-950 border ${errors.email ? 'border-red-500' : 'border-zinc-800'} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#ff6b00] transition-colors`} placeholder="john@company.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Service Type</label>
                  <select {...register('service')} className={`w-full bg-zinc-950 border ${errors.service ? 'border-red-500' : 'border-zinc-800'} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#ff6b00] transition-colors appearance-none`}>
                    <option value="">Select a service...</option>
                    <option value="structural">Structural Welding</option>
                    <option value="fabrication">Custom Fabrication</option>
                    <option value="industrial">Industrial Maintenance</option>
                    <option value="mobile">Mobile / Emergency Service</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Project Details</label>
                  <textarea {...register('message')} rows={4} className={`w-full bg-zinc-950 border ${errors.message ? 'border-red-500' : 'border-zinc-800'} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#ff6b00] transition-colors resize-none`} placeholder="Describe your project, materials, and timeline..." />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full bg-[#ff6b00] hover:bg-[#e66000] disabled:bg-zinc-700 text-white px-8 py-4 rounded-sm font-black text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff6b00]/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-[#ff6b00]" size={24} fill="#ff6b00" />
              <span className="text-xl font-black text-white uppercase tracking-wider">Forge<span className="text-[#ff6b00]">.</span></span>
            </div>
            <p className="text-zinc-500 max-w-sm mb-6">Premium industrial and commercial welding services. We build the structures that build the world. Licensed, bonded, and insured.</p>
            <div className="flex gap-4">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center hover:bg-[#ff6b00] hover:border-[#ff6b00] hover:text-white transition-all cursor-pointer">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-6 tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About Us', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}><button onClick={() => scrollTo(link === 'Home' ? 'hero' : link.toLowerCase().split(' ')[0])} className="text-zinc-500 hover:text-[#ff6b00] transition-colors">{link}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-6 tracking-widest">Services</h4>
            <ul className="space-y-3">
              {['Structural', 'Fabrication', 'Industrial', 'Mobile Team'].map((link) => (
                <li key={link}><span className="text-zinc-500 cursor-pointer hover:text-[#ff6b00] transition-colors">{link} Welding</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-zinc-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Forge & Spark Welding. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}