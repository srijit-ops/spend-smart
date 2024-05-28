import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import MapComponent from "./MapComponent";

function TransactionDetailsComponent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");
  const currentMonthYear = dayjs().format("YYYY-MM");
  let transactionDetails;
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  if (
    typeof localStorage !== "undefined" &&
    JSON.parse(localStorage.getItem("transactionData"))?.[currentMonthYear]
      ?.transactions?.length > 0
  ) {
    const matchedIndex = JSON.parse(localStorage.getItem("transactionData"))?.[
      currentMonthYear
    ]?.transactions?.findIndex((item) => item.id === transactionId);
    transactionDetails = JSON.parse(localStorage.getItem("transactionData"))?.[
      currentMonthYear
    ]?.transactions[matchedIndex];

    if (transactionDetails?.location) {
      geocodeByAddress(transactionDetails?.location?.value?.description)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setLat(lat);
          setLng(lng);
        });
    }
  }
  return (
    <div className="w-full pb-5 pt-9 px-6 flex justify-between items-start flex-wrap gap-7">
      <div
        className={`text-white ${
          transactionDetails.location === "undefined" ? "w-full" : "w-5/12"
        }`}
      >
        <p className="font-semibold text-3xl mb-7 tracking-wider text-[#EAB308]">
          {transactionDetails?.expenseName}
        </p>
        <div className="flex justify-start items-start gap-2 mb-6">
          <p className="text-2xl">💵</p>
          <div>
            <p className="mb-2 text-gray-500 tracking-wider text-lg">Amount</p>
            <p className="text-white text-xl tracking-wider">
              {transactionDetails?.amount}/-
            </p>
          </div>
        </div>
        <div className="flex justify-start items-start gap-2 mb-6">
          <p className="text-2xl">📆</p>
          <div>
            <p className="mb-2 text-gray-500 tracking-wider text-lg">
              Time & date
            </p>
            <p className="text-white text-xl tracking-wider">
              {dayjs(transactionDetails?.date).format("h:mm A, MMMM D, YYYY")}
            </p>
          </div>
        </div>
        <div className="flex justify-start items-start gap-2 mb-6">
          <p className="text-2xl">🗂️</p>
          <div>
            <p className="mb-2 text-gray-500 tracking-wider text-lg">
              Expense Category
            </p>
            <p className="text-white text-xl tracking-wider">
              {transactionDetails?.expenseCategory}
            </p>
          </div>
        </div>

        {transactionDetails?.expenseDetail && (
          <div className="flex justify-start items-start gap-2 mb-6">
            <p className="text-2xl">📝</p>
            <div>
              <p className="mb-2 text-gray-500 tracking-wider text-lg">
                Expense description
              </p>
              <p className="text-white text-xl tracking-wider">
                {transactionDetails?.expenseDetail}
              </p>
            </div>
          </div>
        )}
        {transactionDetails?.location && (
          <div className="flex justify-start items-start gap-2 mb-6">
            <p className="text-2xl">📍</p>
            <div>
              <p className="mb-2 text-gray-500 tracking-wider text-lg">
                Location
              </p>
              <p className="text-white text-xl tracking-wider">
                {transactionDetails?.location?.value?.description}
              </p>
            </div>
          </div>
        )}
      </div>
      {lat && lng && (
        <div className="text-white w-5/12">
          <MapComponent
            lat={lat}
            lng={lng}
            locationName={transactionDetails?.location?.value?.description}
          />
        </div>
      )}
    </div>
  );
}

export default TransactionDetailsComponent;
