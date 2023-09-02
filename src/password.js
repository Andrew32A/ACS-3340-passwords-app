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
    <div>
      <div>
        <label>
          Password Name/Description:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password Length:
          <input
            type="range"
            min="4"
            max="20"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          {passwordLength}
        </label>
      </div>
      <div>
        <label>
          Use Hyphens:
          <input
            type="checkbox"
            checked={useHyphens}
            onChange={() => setUseHyphens(!useHyphens)}
          />
        </label>
      </div>
      <div>
        <label>
          Password Type:
          <select
            value={passwordType}
            onChange={(e) => setPasswordType(e.target.value)}
          >
            <option>Letters</option>
            <option>Letters + Numbers</option>
            <option>Letters + Numbers + Punctuation</option>
          </select>
        </label>
      </div>
      <div>
        <button
          className="button"
          onClick={() => setPassword(generatePassword())}
        >
          Generate
        </button>
        <button
          className="button"
          onClick={() =>
            dispatch(addPassword({ name: name, password: password }))
          }
        >
          Save
        </button>
      </div>
      <div>
        <PasswordsList />
        <PasswordStrength password={password} />
      </div>
    </div>
  );
}

export default Password;
