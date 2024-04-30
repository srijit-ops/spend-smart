"use client";
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
        <button className="bg-transperant rounded-lg w-fit text-white px-4 py-3 border  tracking-wider border-yellow-500 hover:bg-yellow-500">
          Browse stocks
        </button>
        <button className="bg-yellow-500 rounded-lg w-fit text-white tracking-wider px-4 py-3  hover:bg-yellow-600">
          Track Expense
        </button>
        </div>
      </motion.div>
    </AuroraBackground>

    </main>
  );
}


