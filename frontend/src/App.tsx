import React from 'react';
import './App.css';
import {Layout} from "./layout/Layout";
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';

function App() {
  return (
      // <Provider store={""} >
          <BrowserRouter>
              <Layout/>
          </BrowserRouter>
      // </Provider>
  );
}

export default App;
