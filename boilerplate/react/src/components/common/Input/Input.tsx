import React, { ChangeEvent } from "react";

// Define the prop types
interface InputProps {
  text?: string; // Optional text prop if needed
  tailwindProperty: string; // Tailwind CSS classes for styling
  placeholder?: string; // Optional placeholder for the input
  onChanges: (event: ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
  value: string; // Value of the input field
}

const Input: React.FC<InputProps> = ({
  tailwindProperty,
  placeholder,
  onChanges,
  value,
}) => {
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
};

export default Input;
