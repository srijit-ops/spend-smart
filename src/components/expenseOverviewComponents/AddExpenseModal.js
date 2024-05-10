import React from 'react'
import CustomModal from '../common/CustomModal'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { RadioInput, TextInput } from '../common/Inputs'

function AddExpenseModal({open, onCloseModal, title}) {

  const validationSchema= yup.object({
    expenseName: yup.string().required("Expense name is required"),
    expenseDetail: yup.string().test({
      name: 'max',
      exclusive:true,
      message: "Expense detail must not exceed 30 characters",
      test: (value)=> value?.length <= 30
    }),
    amount: yup.number().min(1).required("Expense amount is required"),
    expenseType: yup.string().required("Expense type is required")
  })

  const {handleSubmit, control, formState:{errors}}= useForm(
    {
    resolver: yupResolver(validationSchema),
    default:{
      expenseName:"",
      expenseDetail:"",
      amount: null,
      expenseType:""
    }
    }
  )
  const onSubmit=(data)=>{
    console.log(data)
    onCloseModal()
  }

  const expenseTypeOptions=[
    {
      id:"debit",
      value:"debit",
      sublebel:"Debit"
    },
    {
      id:"credit",
      value:"credit",
      sublebel:"Credit"
    }
  ]

  return (
    <CustomModal
        open={open}
        onCloseModal={onCloseModal}
        title={title}
      >
        <form onSubmit={handleSubmit(onSubmit)} className='mt-7'>
          <Controller
          control={control}
          name='expenseName'
          render={({field: {onChange}})=>
            <TextInput type={"text"} placeholder={"Expense name"} label={"Expense name"} error={errors.expenseName?.message} onChange={onChange}/>
          }
          />
          <Controller
          control={control}
          name='expenseDetail'
          render={({field: {onChange}})=>
            <TextInput type={"text"} placeholder={"Expense description"} label={"Expense description"} error={errors.expenseDetail?.message} onChange={onChange}/>
          }
          />
          <Controller
          control={control}
          name='amount'
          render={({field: {onChange}})=>
            <TextInput type={"number"} placeholder={"Enter the amount"} label={"Expense amount"} error={errors.amount?.message} onChange={onChange}/>
          }
          />
          <Controller
          control={control}
          name='expenseType'
          render={({field: {onChange}})=>
            <RadioInput mainLabel={"Expense type"} error={errors.expenseType?.message} onChange={onChange} radioOptions={expenseTypeOptions}/>
          }
          />
          <input type='submit'/>
        </form>
      </CustomModal>
  )
}

export default AddExpenseModal