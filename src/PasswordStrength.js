import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrength = ({ password }) => {
  const result = zxcvbn(password);
  const { score, guesses, crack_times_seconds } = result;

  const bgColor = [
    "#FF4B3E", // weak
    "#FF8A4C", // okay
    "#FFC24A", // decent
    "#ABE188", // strong
    "#46C35F", // very strong
  ][score];

  const strengthDescriptions = [
    "Weak",
    "Okay",
    "Decent",
    "Strong",
    "Very Strong",
  ];

  return (
    <div style={{ width: "100%", padding: "10px", backgroundColor: bgColor }}>
      <h4>Password Strength: {strengthDescriptions[score]}</h4>
      <p>Approximate guesses needed: {guesses}</p>
      <p>
        Estimated time to crack (seconds):{" "}
        {crack_times_seconds.online_no_throttling_10_per_second}
      </p>
    </div>
  );
};

export default PasswordStrength;
