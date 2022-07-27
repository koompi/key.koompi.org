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
        <h1>KOOMPI Encryption</h1>
        <p>Encrypt messages that matter.</p>
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

      <center>
        <p className="read-the-docs">
          Build with &#10084;&#65039; KOOMPI Team.
        </p>
      </center>
    </div>
  );
}

export default App;
