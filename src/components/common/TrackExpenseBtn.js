"use client"

import dayjs from 'dayjs'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import ButtonComponent from './ButtonComponent'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

function TrackExpenseBtn() {
    const session= useSession()
    const router= useRouter()
  const selectedMonth= dayjs().format('YYYY-MM')
  const expenseHandler=(e)=>{
    console.log(session)
    if(session.data){
      router.push({
        pathname:'expense-overview',
        query:{
          month: selectedMonth
        }
      })
    }else{
        e.preventDefault()
      signIn()
    }
    
  }
  return (
    <ButtonComponent onClick={expenseHandler}>
        <p>
          Track expense
          <FontAwesomeIcon icon={faArrowRight} className='ml-2 rotate-[-45deg]'/>
          </p>
       </ButtonComponent>
  )
}

export default TrackExpenseBtn