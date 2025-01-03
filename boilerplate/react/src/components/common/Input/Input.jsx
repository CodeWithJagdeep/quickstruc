import React from "react";

function Input({ text, tailwindProperty, placeholder, onChanges, value }) {
  return (
    <div className="w-full h-full">
      <input
        className={tailwindProperty}
        placeholder={placeholder}
        onChange={onChanges}
        value={value}
      />
    </div>
  );
}

export default Input;