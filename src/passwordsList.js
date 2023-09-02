import React from "react";
import { useSelector } from "react-redux";

function PasswordsList() {
  const passwords = useSelector((state) => state.passwords.value);

  return (
    <ul>
      {passwords.map((password, i) => (
        <li key={`${i}-item`}>
          {password.name} : {password.password}
        </li>
      ))}
    </ul>
  );
}

export default PasswordsList;
