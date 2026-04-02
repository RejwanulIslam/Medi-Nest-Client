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

interface MedicineCardProps {
  medicine: {
    id: string;
    medicineName: string;
    price: number;
    image: string;
    manufacturer: string;
    categorie: {
      id: string;
      categorieName: string;
    };
    stock: number;
    detels: string;
  };
}

export default function MedicineHomeCard({ sixdata }: any) {
  return (
    <Card
            key={sixdata.id}
            className="relative mx-auto w-full max-w-sm overflow-hidden transition hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative aspect-video">
              <img
                src={sixdata.image ?? "https://avatar.vercel.sh/medicine"}
                alt={sixdata.medicineName}
                className="h-full w-full object-cover"
              />

              {sixdata.stock > 0 ? (
                <Badge className="absolute right-2 top-2 bg-green-600">
                  In Stock
                </Badge>
              ) : (
                <Badge className="absolute right-2 top-2 bg-red-600">
                  Out of Stock
                </Badge>
              )}
            </div>

            <CardHeader>
              <CardTitle className="text-lg">
                {sixdata.medicineName}
              </CardTitle>
              <CardDescription>
                Manufacturer: {sixdata.manufacturer}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex items-center justify-between">
              <p className="text-lg font-semibold">৳ {sixdata.price}</p>

              <Button disabled={sixdata.stock === 0}>
                <Link href={`/allmedicine/${sixdata.id}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
  );
}


