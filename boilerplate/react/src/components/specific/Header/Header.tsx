import React from "react";
import Button from "../../common/Button/Button.tsx";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-end w-full px-32">
      <div>
        <Button
          onEvent={() => {
            navigate("/auth/login");
          }}
          customCss={{}}
          children={"Login"}
          tailwindProperties={
            "py-1.5 text-base text-black bg-white shadow-md rounded-full px-5"
          }
        />
      </div>
    </div>
  );
}

export default Header;
