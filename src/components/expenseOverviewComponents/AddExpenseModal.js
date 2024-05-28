import React, { useState } from "react";
import CustomModal from "../common/CustomModal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RadioInput, TextInput } from "../common/Inputs";
import CreatableSelect from "react-select/creatable";
import ButtonComponent from "../common/ButtonComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import Styles from "../../styles/addExpenseModal.module.css";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddExpenseModal({ open, onCloseModal, title }) {
  const [categoryOptions, setCategoryOptions] = useState([
    { label: "Entertainment", value: "Entertainment" },
    { label: "Medicine", value: "Medicine" },
    { label: "Food", value: "Food" },
    { label: "Rent", value: "Rent" },
    { label: "Shopping", value: "Shopping" },
    { label: "Transport", value: "Transport" },
  ]);

  const validationSchema = yup.object({
    expenseName: yup.string().required("Expense name is required"),
    expenseDetail: yup
      .string()
      .max(30, "Expense detail must not exceed 30 characters"),
    amount: yup
      .number()
      .min(1)
      .required("Expense amount is required")
      .typeError("Please enter a number"),
    expenseType: yup.string().required("Expense type is required"),
    expenseCategory: yup.string().required("Expense category is required"),
    date: yup.date().required("Expense date is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    default: {
      expenseName: "",
      expenseDetail: "",
      amount: null,
      expenseType: "",
      expenseCategory: "",
      date: dayjs().toDate(),
      location: null,
    },
  });

  const generateUniqueId = () => {
    const randomPart = Math.floor(Math.random() * 100000);
    const timestamp = dayjs().valueOf().toString(36);
    const uniqueId = timestamp + randomPart;

    return uniqueId;
  };
  const onSubmit = (data) => {
    const allTransactions = JSON.parse(localStorage.getItem("transactionData"));
    const currentMonthYear = dayjs(data.date).format("YYYY-MM");
    const finalData = {
      id: generateUniqueId(),
      ...data,
    };
    allTransactions[currentMonthYear].transactions.push(finalData);
    localStorage.setItem("transactionData", JSON.stringify(allTransactions));
    onCloseModal();
    reset();
    toast("Expense added successfully");
  };

  const expenseTypeOptions = [
    {
      id: "debit",
      value: "debit",
      sublebel: "Debit",
    },
    {
      id: "credit",
      value: "credit",
      sublebel: "Credit",
    },
  ];

  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#141416",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#141416",
      color: "white",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#333",
        color: "#eab308",
      },
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

  return (
    <CustomModal open={open} onCloseModal={onCloseModal} title={title}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
        <Controller
          control={control}
          name="expenseName"
          render={({ field: { onChange } }) => (
            <TextInput
              type={"text"}
              placeholder={"Expense name"}
              label={"Expense name"}
              error={errors.expenseName?.message}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="expenseDetail"
          render={({ field: { onChange } }) => (
            <TextInput
              type={"text"}
              placeholder={"Expense description"}
              label={"Expense description"}
              error={errors.expenseDetail?.message}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="expenseCategory"
          control={control}
          render={({ field: { onChange } }) => (
            <div className="my-4 flex flex-col">
              <label className="text-gray-200 tracking-wider mb-3">
                Select expense category
              </label>
              <CreatableSelect
                onChange={(e) => {
                  if (e) {
                    onChange(e.value);
                    setCategoryOptions([...categoryOptions, e]);
                  }
                  // onChange("")
                }}
                isClearable
                options={categoryOptions}
                styles={customStyles}
              />
              <p className="tracking-wider text-red-500 mt-3 text-[0.9rem]">
                {errors.expenseCategory?.message}
              </p>
            </div>
          )}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange } }) => (
            <TextInput
              type={"number"}
              placeholder={"Enter the amount"}
              label={"Expense amount"}
              error={errors.amount?.message}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="expenseType"
          render={({ field: { onChange, value } }) => (
            <RadioInput
              mainLabel={"Expense type"}
              error={errors.expenseType?.message}
              onChange={onChange}
              radioOptions={expenseTypeOptions}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <div className={`my-4 flex flex-col ${Styles.datePicker}`}>
              <label className="text-gray-200 tracking-wider mb-3">
                Select expense date and time
              </label>
              <DatePicker
                selected={value}
                onChange={onChange}
                placeholderText="Click to select date and time"
                minDate={dayjs().subtract(2, "days").toDate()}
                // minDate={dayjs().toDate()}
                maxDate={dayjs().toDate()}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                calendarClassName="bg-black"
              />
              <p className="tracking-wider text-red-500 mt-3 text-[0.9rem]">
                {errors.date?.message}
              </p>
            </div>
          )}
        />
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <div className={`my-4 flex flex-col`}>
              <label className="text-gray-200 tracking-wider mb-3">
                Enter the location where you spent money
              </label>
              <GooglePlacesAutocomplete
                selectProps={{
                  value,
                  onChange: onChange, //e=>onChange(e)
                  styles: customStyles,
                }}
                debounce={1500}
              />
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
  );
}

export default AddExpenseModal;
