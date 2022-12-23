import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { store } from "./redux/store";

const GlobalStyle = createGlobalStyle`
  *, body, html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    color: var(--black);
}
 
body{
    overflow-x: hidden;
    background-color: var(--body-bg);
    transition: 500ms;
    .skeleton {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .skeleton_header {
      margin-top: 2em;
      border-radius: 3px;
      background-color: #ededed;
      height: 40px;
      background: linear-gradient(
          100deg,
          rgba(255, 255, 255, 0) 40%,
          rgba(255, 255, 255, 0.5) 50%,
          rgba(255, 255, 255, 0) 60%
        )
        #ededed;
      background-size: 200% 100%;
      background-position-x: 180%;
      animation: 1s loading ease-in-out infinite;
    }
    .skeleton_body {
      height: 80px;
      border-radius: 3px;
      background-color: #ededed;
      background: linear-gradient(
          100deg,
          rgba(255, 255, 255, 0) 40%,
          rgba(255, 255, 255, 0.5) 50%,
          rgba(255, 255, 255, 0) 60%
        )
        #ededed;
      background-size: 200% 100%;
      background-position-x: 180%;
      animation: 1s loading ease-in-out infinite;
    }
  }
  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
}
a{
  text-decoration: none;
}
button, input{
  border: none;
  outline: none;
}

html{
  ::-webkit-scrollbar {
    width: 4px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    margin-top: 10px;
    background: var(--bg-gray-300);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-gray);
    border-radius: 10px;
  }
}

   :root {
    --body-bg: hsla(0, 0%, 98%, 1);
    --color-red: hsl(354, 70%, 88%);
    --white: hsla(0, 0%, 100%, 1);
    --black: hsla(0, 0%, 0%, 1);
    --green: hsla(112, 100%, 73%, 1);
    --bg-blue: hsla(214, 82%, 11%, 1);
    --bg-placeholder: hsla(208, 7%, 46%, 1);
    --bg-gray-300: hsla(225, 17%, 95%, 1);
    --bg-gray: hsla(208, 7%, 46%, 1);
  }
  .dark-mode:root{
    --body-bg:hsla(0, 0%, 2%, 1);
    --color-red: hsl(354, 70%, 88%);
    --white: hsla(0, 0%, 0%, 1);//Preto
    --black: hsla(0, 0%, 100%, 1); //Branco
    --green: hsla(112, 100%, 73%, 1);
    --bg-blue: hsla(214, 82%, 11%, 1);
    --bg-placeholder: hsla(208, 7%, 46%, 1);
    --bg-gray-300: hsla(208, 8%, 22%, 1); // Gray
    --bg-gray: hsla(208, 8%, 22%, 1);
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
