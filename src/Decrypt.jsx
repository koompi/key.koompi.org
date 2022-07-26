import { useState } from "react";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { exportFile } from "./utils/exportFile";

function Decrypt() {
  const [data, updateData] = useState({
    password: "",
    hash: "",
  });

  const [originalText, setOriginalText] = useState("");

  const handleChange = (e) => {
    e.preventDefault;

    const { name, value } = e.target;
    updateData({
      ...data,
      [name]: value,
    });
  };

  const handleDecrypt = () => {
    var bytes = CryptoJS.AES.decrypt(data.hash, data.password);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    setOriginalText(originalText && JSON.parse(originalText).text);

    if (!originalText) {
      toast.error("Check your password or Hash!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Hash and Password matched!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        name="hash"
        placeholder="Your encrypt Hash"
        onChange={handleChange}
      />

      <textarea
        name="text"
        rows={5}
        placeholder="Your decrypt text"
        value={originalText}
        disabled
      />
      {/* <input name="file" type="file" onChange={handleChange} /> */}

      {originalText && (
        <div
          onClick={() => exportFile({ text: originalText })}
          className="export-file"
        >
          Export your File
        </div>
      )}

      <button onClick={handleDecrypt} className="my-app">
        Decrypt
      </button>
    </div>
  );
}

export default Decrypt;
