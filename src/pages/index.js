"use client";
import BorderedButtonComponent from "@/components/common/BorderedButtonComponent";
import ButtonComponent from "@/components/common/ButtonComponent";
import { AuroraBackground } from "@/components/landingPageComponents/aurora-background";
import { motion } from "framer-motion";
import React from "react";


export default function Home() {
  return (
    <main>
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-2xl md:text-6xl font-bold text-white text-center tracking-wide">
          Spend smart
        </div>
        <div className="font-extralight text-[0.8rem] md:text-2xl text-gray-400 py-4 tracking-wide">
        Master Your Finances, Grow Your Wealth. Track, Save, Invest and repeat.
        </div>
        <div className="flex justify-between items-center flex-wrap gap-6 mt-8"> 
        <BorderedButtonComponent name={"Browse stocks"}/>
       <ButtonComponent name={"Track expense"}/>
        </div>
      </motion.div>
    </AuroraBackground>

    </main>
  );
}


