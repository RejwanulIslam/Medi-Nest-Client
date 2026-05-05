"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function HomeFooters() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 border-b border-slate-800/60 mb-16">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Subscribe to our newsletter</h3>
            <p className="text-slate-400 text-sm">Get the latest updates on new medicines, health tips, and exclusive discounts directly to your inbox.</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 h-12 w-full md:w-[300px] rounded-xl focus-visible:ring-emerald-500"
            />
            <Button className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-8">
              Subscribe <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-black text-white tracking-tighter">
                Medi<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Nest</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
              Your trusted online pharmacy. We deliver 100% genuine medicines right to your doorstep, ensuring your health is never compromised.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "About Us", "All Medicines", "Contact", "Blog"].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 mr-2 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">Categories</h4>
            <ul className="space-y-4">
              {["Prescription", "Over The Counter", "Baby Care", "Personal Care", "Supplements"].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 mr-2 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-sm text-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="pt-2">Level-4, 34, Awal Centre, Banani, Dhaka</span>
              </li>
              <li className="flex items-start gap-4 text-sm text-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="pt-2">+880 1234 567890</span>
              </li>
              <li className="flex items-start gap-4 text-sm text-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="pt-2">support@medinest.com</span>
              </li>
            </ul>
          </div>

        </div>

        <Separator className="bg-slate-800/60 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MediNest. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}