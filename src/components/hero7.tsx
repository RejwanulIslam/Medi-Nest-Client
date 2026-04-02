import { Star } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    // url: string;
    className?: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
  className?: string;
}

const Hero7 = ({
  heading = "Medi Nest is a  e-commerce medicines store for purchasing over-the-counter (OTC) medicines",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Discover all Catagory",
    // url: "https://www.shadcnblocks.com",
  },

  className,
}: Hero7Props) => {
  return (
    <section>
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-semibold lg:text-6xl">{heading}</h1>
          <p className="text-balance text-muted-foreground lg:text-lg">
            {description}
          </p>
        </div>
        <Button asChild size="lg" className="mt-10">
          {/* <a href={button.url}>{button.text}</a> */}
          <a>{button.text}</a>
        </Button>
     
      </div>
    </section>
  );
};

export { Hero7 };
