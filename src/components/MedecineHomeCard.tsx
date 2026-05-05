"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";

interface MedicineCardProps {
  sixdata: {
    id: string;
    medicineName: string;
    price: number;
    image: string;
    manufacturer: string;
    categorie?: {
      id: string;
      categorieName: string;
    };
    stock: number;
    detels?: string;
  };
}

export default function MedicineHomeCard({ sixdata }: MedicineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="relative group w-full h-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
      
      <Card className="relative h-full flex flex-col bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 dark:bg-slate-800/50 p-4">
          <div className="absolute top-3 left-3 z-10">
            {sixdata.stock > 0 ? (
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 shadow-none font-medium">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 shadow-none font-medium">
                Out of Stock
              </Badge>
            )}
          </div>
          
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">4.8</span>
          </div>

          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={sixdata.image ?? "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80"}
            alt={sixdata.medicineName}
            className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal filter drop-shadow-md"
          />
        </div>

        <CardHeader className="p-5 pb-0">
          <div className="flex justify-between items-start gap-2 mb-1">
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {sixdata.medicineName}
            </CardTitle>
          </div>
          <CardDescription className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
            {sixdata.manufacturer}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 py-3 flex-grow">
          <p className="text-xl font-black text-slate-900 dark:text-white flex items-baseline gap-1">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">৳</span>
            {sixdata.price}
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-0 mt-auto">
          <Button 
            asChild 
            disabled={sixdata.stock === 0}
            className={`w-full rounded-xl transition-all duration-300 ${
              sixdata.stock > 0 
                ? "bg-slate-900 hover:bg-emerald-600 dark:bg-slate-100 dark:hover:bg-emerald-500 text-white dark:text-slate-900 hover:shadow-lg hover:shadow-emerald-500/25" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
            }`}
          >
            <Link href={`/allmedicine/${sixdata.id}`} className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="font-semibold">View Details</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
