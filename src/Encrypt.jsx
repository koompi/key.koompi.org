import { useState } from "react";
import CryptoJS from "crypto-js";
import useCopyToClipboard from "./utils/copyTextToClipboard";
import { toast } from "react-toastify";

function Encrypt() {
  const [formData, updateFormData] = useState({
    password: "",
    text: "",
  });

  const [encrypt, setEncrypt] = useState("");
  const [textType, setTextType] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault;
    const { password, text } = formData;

    if (!password || !text) {
      toast.error("All input required!");
      return;
    }

    toast.success("Copy your hash and remember your password!", {
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
    const res = CryptoJS.AES.encrypt(value, formData.password).toString();
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
      <br />
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
      <label>*Encryption</label>
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

      <br />
      <br />

      <div className="form-section">
        <label>*Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <p className="warning">Do not forgot your password!</p>
      </div>

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

      <br />
      <br />
      <br />
      <h2>How it works?</h2>
      {/* <ol>
        <li>Hello world</li>
      </ol> */}
    </div>
  );
}

export default Encrypt;
