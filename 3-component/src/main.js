import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

/* 
   react 18 버전 부터는 이렇게 작성해야 함
   class를 이용하여 리액트 컴포넌트를 상속하지는 않음 - 구 버전 방식
*/
const container = document.querySelector('#app');
const root = createRoot(container);
root.render(<App />);