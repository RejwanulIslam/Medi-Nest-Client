"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
} from "lucide-react"; // shadcn recommends lucide icons

export default function HomeFooters() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">MediNest</h2>
          <p className="text-sm text-gray-400">
            Your trusted online medicine store. Quality products delivered to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-white transition">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-gray-700 transition"
            >
              <FacebookIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-gray-700 transition"
            >
              <TwitterIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-gray-700 transition"
            >
              <InstagramIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

      </div>

      <Separator className="bg-gray-700" />

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-400 text-sm">
        © 2026 MediNest. All rights reserved.
      </div>
    </footer>
  );
}