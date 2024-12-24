import React from "react";

function Button({ onEvent, children, customCss, tailwindProperties }) {
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
