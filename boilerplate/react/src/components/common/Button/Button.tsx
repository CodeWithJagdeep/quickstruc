import React from "react";

type ButtonProps = {
  onEvent: (e: any) => void | null; // onEvent is a function that takes no arguments and returns void
  children: React.ReactNode; // children can be any valid React node
  customCss?: React.CSSProperties | null; // optional prop for custom styles
  tailwindProperties: string;
};

function Button({
  onEvent,
  children,
  customCss,
  tailwindProperties,
}: ButtonProps) {
  return (
    <button
      className={tailwindProperties}
      style={{ ...customCss }}
      onClick={onEvent}
    >
      {children}
    </button>
  );
}

export default Button;
