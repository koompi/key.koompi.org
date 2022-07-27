import { useState } from "react";
import "./App.css";
import Encrypt from "./Encrypt";
import Decrypt from "./Decrypt";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [tabs, setTabs] = useState("encrypt");

  const handleChangeTabs = (value) => {
    setTabs(value);
  };

  return (
    <div className="App">
      <ToastContainer />
      <center>
        <div>
          <a href="https://koompi.com" target="_blank">
            <img src="/Koompi-white.png" className="logo" alt="Vite logo" />
          </a>
        </div>
        <h1>Lockey</h1>
        <h2>Encrypt messages, files, or text that matter.</h2>
        <p>by KOOMPI</p>
      </center>
      <div className="card">
        <div className="tabs">
          <div
            className={tabs === "encrypt" && "active"}
            onClick={() => {
              handleChangeTabs("encrypt");
            }}
          >
            Encrypt
          </div>
          <div
            className={tabs === "decrypt" && "active"}
            onClick={() => {
              handleChangeTabs("decrypt");
            }}
          >
            Decrypt
          </div>
        </div>
      </div>
      {tabs === "encrypt" && <Encrypt />}
      {tabs === "decrypt" && <Decrypt />}
      
      <h1>About</h1>
      <p>
        <b>Lockey</b> a text and file encrypt and decrytion tool. The purpose is of this little tool is for encrypting important file or text with passord that ones could easily be remembered. 
      </p>

      <p>
      Then, to decrypt it back, users just need to paste the <b>encrypted hash</b> with the <b>passord</b> they used to encrypt it.
      </p>
      <center>
        <p className="read-the-docs">
          Build with &#10084;&#65039; KOOMPI Team.
        </p>
      </center>
    </div>
  );
}

export default App;
