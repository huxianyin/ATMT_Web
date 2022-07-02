import React from 'react';
import './css/App.css';

import {  BrowserRouter,Routes,Route } from 'react-router-dom';


function Hello1(){
    return (
        <div>Hello1</div>
    );
}

function Hello2(){
    return (
        <div>Hello2</div>
    );
}

function App2(){
    return (
        <div className='App'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Hello1 />} />
                <Route path="/hello2" element = {<Hello2 />} />
            </Routes>
        </BrowserRouter>
        </div>
    );
}


export default App2;