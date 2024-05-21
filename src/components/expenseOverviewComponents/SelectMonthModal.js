import React, { useState } from 'react'
import CustomModal from '../common/CustomModal'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonComponent from '../common/ButtonComponent';
import dayjs from 'dayjs';
import Styles from "../../styles/addExpenseModal.module.css"
import DatePicker from "react-datepicker";
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

function SelectMonthModal({ open, onCloseModal, title }) {

const router= useRouter()
const searchParams= useSearchParams()

const minMonth= typeof localStorage !== 'undefined' && localStorage.getItem("transactionData") ? Object.keys(JSON.parse(localStorage.getItem("transactionData")))[0] : null
const maxMonth= dayjs().format("YYYY-MM")
const validationSchema= yup.object({
    month: yup.date().required("Month is required"),
})
const {control, reset, formState:{errors}, handleSubmit}= useForm({
    resolver:yupResolver(validationSchema),
    defaultValues:{
        month: null,
    }
})

  const onSubmit=(data)=>{
    // const allTransactions= JSON.parse(localStorage.getItem("transactionData")) || {}
    // const currentMonthYear= dayjs(data.date).format('YYYY-MM')
    // allTransactions[currentMonthYear]={
    //     salary: data.salary,
    //     targetPercentage: data.targetPercentage,
    //     transactions: []
    // }
    // localStorage.setItem("transactionData", JSON.stringify(allTransactions))
    const selectedMonth= dayjs(data.month).format('YYYY-MM')

    console.log(selectedMonth)
    reset()
    onCloseModal()
    router.push({
        pathname: router.pathname,
        query:{
            month:selectedMonth
        }
    })
  }


  return (
    <CustomModal open={open} onCloseModal={onCloseModal} title={title}>
    <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
    <Controller
          control={control}
          name="month"
          render={({ field: { onChange, value } }) => (
            <div className={`my-4 flex flex-col ${Styles.datePicker}`}>
              <label className="text-gray-200 tracking-wider mb-3">
                Select month
              </label>
              {/* <TextInput type={"date"} placeholder={"Enter the expense date"} label={"Expense date"} error={errors.date?.message} onChange={onChange}/> */}
              <DatePicker
                selected={value}
                onChange={onChange}
                placeholderText="Click to select month"
                // minDate={dayjs().subtract(2, 'days').toDate()}
                minDate={minMonth}
                maxDate={maxMonth}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                calendarClassName="bg-black"
              />
              <p className="tracking-wider text-red-500 mt-3 text-[0.9rem]">
                {errors.month?.message}
              </p>
            </div>
          )}
        />
        <div className="w-full flex justify-center items-center">
          <ButtonComponent type={"submit"}>
            <p>Submit</p>
          </ButtonComponent>
        </div>
    </form>
    </CustomModal>
  )
}

export default SelectMonthModal