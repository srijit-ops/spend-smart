import React from "react";

export const TextInput = ({
  label,
  type,
  placeholder,
  error,
  labelStyle,
  inputStyle,
  onChange,
}) => {
  return (
    <div className="my-4 flex flex-col">
      <label
        className="text-gray-200 tracking-wider mb-3"
        style={{ ...labelStyle }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="px-4 py-3 mb-3 border border-gray-300 text-white  rounded-md bg-transparent"
        style={{ ...inputStyle }}
      />
      <p className="tracking-wider text-red-500 text-[0.9rem]">{error}</p>
    </div>
  );
};

export const RadioInput = ({
  mainLabel,
  radioOptions,
  onChange,
  value,
  error,
}) => {
  return (
    <div className="my-4 flex flex-col">
      <label className="text-gray-200 tracking-wider mb-3">{mainLabel}</label>
      <div className="flex justify-between items-center flex-wrap">
        {radioOptions?.map((item, index) => {
          return (
            <div
              className="flex justify-start items-center gap-3 mb-3"
              key={index}
            >
              <input
                type="radio"
                value={item.value}
                id={item.id}
                onChange={onChange}
                checked={value === item.value}
              />
              <label htmlFor={item.id} className="text-white">
                {item.sublebel}
              </label>
            </div>
          );
        })}
      </div>
      <p className="tracking-wider text-red-500 text-[0.9rem]">{error}</p>
    </div>
  );
};
