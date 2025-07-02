import React from 'react';
import Nav from './Nav';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './Home';
import CustomerSupport from './CustomerSupport';
import Signup from './Signup';
import Login from './Login';

const Router=()=>{
    return(
        <BrowserRouter>
        <Nav />
        <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/help" element={<CustomerSupport />}/> 
        </Routes>
        </BrowserRouter>
    )
}

export default Router;