import React, { useState } from 'react'
import CustomModal from '../common/CustomModal'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../common/Inputs';
import CreatableSelect from "react-select/creatable";
import ButtonComponent from '../common/ButtonComponent';
import dayjs from 'dayjs';

function SalaryDetailModal({ open, onCloseModal, title }) {

    const [targetOptions, setTargetOptions] = useState([
        {
            label: "5%",
            value: 5
        },
        {
            label: "10%",
            value: 10
        },
        {
            label: "15%",
            value: 15
        },
        {
            label: "20%",
            value: 20
        }
    ])

const validationSchema= yup.object({
    salary: yup.number().required("Monthly salary is required"),
    targetPercentage: yup.number().required("Target savings is required")
})
const {control, reset, formState:{errors}, handleSubmit}= useForm({
    resolver:yupResolver(validationSchema),
    defaultValues:{
        salary: null,
        targetPercentage: null
    }
})

const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#141416",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#141416",
      color: "white",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#141416",
    }),
    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      color: "white",
    }),
  };

  const onSubmit=(data)=>{
    const allTransactions= JSON.parse(localStorage.getItem("transactionData")) || {}
    const currentMonthYear= dayjs(data.date).format('YYYY-MM')
    allTransactions[currentMonthYear]={
        salary: data.salary,
        targetPercentage: data.targetPercentage,
        transactions: []
    }
    localStorage.setItem("transactionData", JSON.stringify(allTransactions))
    reset()
    onCloseModal()
  }


  return (
    <CustomModal open={open} onCloseModal={onCloseModal} title={title}>
    <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
    <Controller
          control={control}
          name="salary"
          render={({ field: { onChange } }) => (
            <TextInput
              type={"number"}
              placeholder={"Enter the salary"}
              label={"Monthly salary"}
              error={errors.salary?.message}
              onChange={onChange}
            />
          )}
        />
        
              <Controller
          name="targetPercentage"
          control={control}
          render={({ field: { onChange } }) => (
            <div className="my-4 flex flex-col">
              <label className="text-gray-200 tracking-wider mb-3">
                Enter target savings
              </label>
              <CreatableSelect
                onChange={(e) => {
                  if (e) {
                    onChange(e.value);
                    setTargetOptions([...targetOptions, e]);
                  }
                  // onChange("")
                }}
                isClearable
                options={targetOptions}
                styles={customStyles}
              />
              <p className="tracking-wider text-red-500 mt-3 text-[0.9rem]">
                {errors.targetPercentage?.message}
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

export default SalaryDetailModal