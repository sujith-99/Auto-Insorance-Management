import { useEffect } from 'react';
import Tickets from './Tickets';
import axios from 'axios';
import {useState} from 'react';
const Home=()=>{

    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get("/api/tickets")
        .then((response)=>{
            setData(response.data);
        })
        .catch((error)=>{
            console.error(error);
        })},[data])

    return(
        <div>
            <Tickets tickets={data}/>     
        </div>
    )
}

export default Home;