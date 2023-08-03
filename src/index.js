import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyApp from './concept/MyApp';
import ReactTable from './concept/react_table/ReactTable';
import Bind from './concept/random_tests/Bind';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MyApp />}></Route>
      <Route path="/reacttable" element={<ReactTable/>}/>
      <Route path="/binding" element={<Bind/>}/>
    </Routes>    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
