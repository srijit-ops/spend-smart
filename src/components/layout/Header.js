import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import { useSession, signOut } from 'next-auth/react'
import React from 'react'
import Image from "next/image";

function Header() {
    const session= useSession()
    const signOutHandler=async ()=>{
        try {
          await signOut({
            callbackUrl:"/"
          })
        } catch (error) {
          console.error("Error signing out:", error);
        }
    }
  return (
    <div className="py-4 px-6 flex justify-between items-center shadow sticky top-0 z-[1000] w-full bg-[#141416]">
      <p className="text-xl tracking-wider text-white">
        Spend Smart.
      </p>
      <div
        className="flex justify-end items-center cursor-pointer gap-4"
      >
        <div className="flex justify-center items-center">
          <div className="w-3/6 rounded-full">
          <Image
          src={session?.data?.user?.image}
          alt="user image"
          layout="fill"
          className={`object-contain img rounded-full`}
          />
          </div>
        </div>
        <div onClick={signOutHandler}>
        <FontAwesomeIcon
          icon={faPowerOff}
          className="text-xl text-gray-300 hover:text-[#EAB308]"
        />
        </div>
      </div>
    </div>
  )
}

export default Header