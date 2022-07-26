import { useState } from "react";
import { PRIVATE_KEY } from "../secret.json";
import CryptoJS from "crypto-js";
import useCopyToClipboard from "./utils/copyTextToClipboard";
import { toast } from "react-toastify";

function Encrypt() {
  const [formData, updateFormData] = useState({
    password: "",
    text: "",
  });

  const [formRequired, setFormRerequired] = useState(false);

  const [encrypt, setEncrypt] = useState("");
  const [textType, setTextType] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault;
    const { password, text } = formData;

    if (!password || !text) {
      setFormRerequired(true);
      return;
    }

    toast.success("Created with successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    handleEncrypt(JSON.stringify(formData));
  };

  const handleChange = (e) => {
    e.preventDefault;
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEncrypt = (value) => {
    const res = CryptoJS.AES.encrypt(
      value,
      formData.password,
      PRIVATE_KEY
    ).toString();
    setEncrypt(res);
  };

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      updateFormData({ ...formData, text });
    };
    reader.readAsText(e.target.files[0]);
  };

  const [value, copy] = useCopyToClipboard();

  return (
    <div>
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <div className="tabsText">
        <div
          className={textType && "active"}
          onClick={() => setTextType(!textType)}
        >
          Text
        </div>
        <div
          className={!textType && "active"}
          onClick={() => setTextType(!textType)}
        >
          File
        </div>
      </div>
      {textType && (
        <textarea
          name="text"
          rows={5}
          placeholder="Your encryption text "
          onChange={handleChange}
        />
      )}
      {!textType && (
        <input name="file" type="file" onChange={(e) => showFile(e)} />
      )}

      {(!formData.password || !formData.text) && formRequired && (
        <p className="danger">All input required!</p>
      )}

      <button
        onClick={onSubmit}
        style={{ marginBottom: "30px" }}
        className="my-app"
      >
        Encrypt
      </button>

      {encrypt && (
        <div>
          <div className="encrypt">
            <p>{encrypt}</p>
          </div>
          <div onClick={() => copy(encrypt)} className="copyText">
            {value ? "Copied" : "Copy the Hash"}
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default Encrypt;
