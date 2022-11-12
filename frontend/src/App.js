import React, { useState, useEffect } from "react";
import loader from "@assemblyscript/loader";
import MyCanvas from "./components/MyCanvas";

export const loadWASM = async () => {
  console.debug("Loading wasm: ", "../public/optimized.wasm");
  return loader
    .instantiate(fetch("/public/optimized.wasm"))
    .then((result) => {
      //storing the response inside a wasm variable for now
      global.wasm = result;
      return true;
    })
    .catch((error) => {
      console.error("Error loading wasm: ", error);
      return false;
    });
};

const App = () => {
  const [wasmLoaded, setWasmLoaded] = useState(false);
  useEffect(() => {
    loadWASM().then((result) => setWasmLoaded(result));
  }, []);
  useEffect(() => {
    if (wasmLoaded) {
      console.debug(wasm.exports.add(4, 4));
    }
  }, [wasmLoaded]);

  return (
    <div>
      <h1>Hello React</h1>
      <MyCanvas wrapperHeight={400} wrapperWidth={400} />
    </div>
  );
};

export default App;
