import BorderedButtonComponent from "@/components/common/BorderedButtonComponent";
import ButtonComponent from "@/components/common/ButtonComponent";
import { AuroraBackground } from "../components/landingPageComponents/aurora-background";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Image from "next/image";


export default function Home() {

  const router= useRouter()
  const selectedMonth= dayjs().format('YYYY-MM')
  const expenseHandler=()=>{
    router.push({
      pathname:'expense-overview',
      query:{
        month: selectedMonth
      }
    })
  }

  return (
    <>
    <Head>
        <title>Spend Smart</title>
        <meta property="og:title" content="Spend Smart" />
        <meta property="og:image" content="/vercel.svg" />
        <meta
          property="og:description"
          content="Cultivate good financial habits and make better investment decisions for a brighter future."
        />
        <meta
          name="description"
          content="An intelligent expense tracker which cultivates good financial habits and helps to make better investment decisions."
        ></meta>
        <link
          rel="shortcut icon"
          href="/vercel.svg"
          type="image/x-icon"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>
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
        className="relative flex flex-col gap-4 items-center justify-center px-4 pt-48"
      >
        <div className="text-2xl md:text-6xl font-bold text-white text-center tracking-wide">
          Spend smart
        </div>
        <div className="font-extralight text-[0.8rem] md:text-2xl text-gray-400 py-4 tracking-wide">
        Master Your Finances, Grow Your Wealth. Track, Save, Invest and repeat.
        </div>
        <div className="flex justify-between items-center flex-wrap gap-6 mt-8"> 
        <BorderedButtonComponent>
          <p>
            Browse stocks
            <FontAwesomeIcon icon={faArrowRight} className='ml-2 rotate-[-45deg]'/>
            </p>
        </BorderedButtonComponent>
       <ButtonComponent onClick={expenseHandler}>
        <p>
          Track expense
          <FontAwesomeIcon icon={faArrowRight} className='ml-2 rotate-[-45deg]'/>
          </p>
       </ButtonComponent>
        </div>
        <div className="w-full flex justify-center items-center mt-6">
          <div className="w-2/3 rounded-lg">
          <Image 
          src={"/projectImg.png"}
          alt="spend smart image"
          layout="fill"
          className={`object-contain img rounded-lg`}
          />
          </div>
        </div>
      </motion.div>
    </AuroraBackground>

    </main>
    </>
  );
}


