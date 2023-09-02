import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPassword } from "./features/passwords/passwordsSlice";
import PasswordStrength from "./PasswordStrength";
import PasswordsList from "./PasswordsList";
import "./password.css";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Password() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("p@$$w0rd");
  const [name, setName] = useState("");
  const [passwordLength, setPasswordLength] = useState(9);
  const [useHyphens, setUseHyphens] = useState(false);
  const [passwordType, setPasswordType] = useState(
    "Letters + Numbers + Punctuation"
  );

  function generatePassword() {
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      let charCode;
      switch (passwordType) {
        case "Letters":
          charCode = random(65, 122);
          if (charCode > 90 && charCode < 97) charCode = random(65, 90);
          break;
        case "Letters + Numbers":
          const isLetter = Math.random() > 0.5;
          charCode = isLetter ? random(65, 122) : random(48, 57);
          if (charCode > 90 && charCode < 97) charCode = random(65, 90);
          break;
        default:
          charCode = random(33, 126);
          break;
      }
      password += String.fromCharCode(charCode);
    }

    if (useHyphens) {
      let formattedPassword = "";
      for (let i = 0; i < password.length; i += 3) {
        formattedPassword +=
          password.slice(i, i + 3) + (i + 3 < password.length ? "-" : "");
      }
      return formattedPassword;
    }
    return password;
  }

  return (
    <div className="password-container">
      <div className="input-group">
        <label className="label">
          Password Name/Description:
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className="input-group">
        <label className="label">
          Password:
          <input
            className="input"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="input-group">
        <label className="label">
          Password Length:
          <input
            className="range-input"
            type="range"
            min="4"
            max="20"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          <span className="range-value">{passwordLength}</span>
        </label>
      </div>
      <div className="input-group">
        <label className="label">
          Use Hyphens:
          <input
            className="checkbox"
            type="checkbox"
            checked={useHyphens}
            onChange={() => setUseHyphens(!useHyphens)}
          />
        </label>
      </div>
      <div className="input-group">
        <label className="label">
          Password Type:
          <select
            className="select"
            value={passwordType}
            onChange={(e) => setPasswordType(e.target.value)}
          >
            <option>Letters</option>
            <option>Letters + Numbers</option>
            <option>Letters + Numbers + Punctuation</option>
          </select>
        </label>
      </div>
      <div className="button-group">
        <button
          className="button generate-btn"
          onClick={() => setPassword(generatePassword())}
        >
          Generate
        </button>
        <button
          className="button save-btn"
          onClick={() =>
            dispatch(addPassword({ name: name, password: password }))
          }
        >
          Save
        </button>
      </div>
      <div className="widgets">
        <PasswordsList />
        <PasswordStrength password={password} />
      </div>
    </div>
  );
}

export default Password;
