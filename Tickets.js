import {useState} from "react";
import axios from "axios";

const Tickets=({tickets})=>{
    console.log("Tickets")
    console.log(tickets)
    const [state,setState]=useState(false);
    const [viewTicket,setViewTicket]=useState(null)
    const [resMessage,setResMessage]=useState({message:""});
    
   const handleViewClick=(ticket)=>{
        setViewTicket(ticket);
        setState(true);
    }

    const handleClose=()=>{
        if(viewTicket.status!=='closed'){
        const tick={};
        tick['ticketId']=viewTicket.ticketId;
        tick['status']='closed';
        tick['resolvedDate']=Date.now();
        tick['message']=resMessage.message;
        console.log(tick)
        axios.put('/api/close/:ticket.ticketId',tick)
        .then((response)=>{
            alert("Ticket Closed Successfully");
            setState(false)

        })
        .catch((error)=>{
            console.error(error);
            alert("Error in Closing Ticket");
        })}
        else{
            alert("Ticket Already Closed")
            setState(false)
        }
    }

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setResMessage({[name]:value});
    }

    const handleFile=(e)=>{
        console.log(e.filename)
        window.open(`http://localhost:3000/uploads/${e.filename}`,'_blank');
    }

    return(
        <div>
            <h1 className="text-center">Tickets Info</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Ticket Id</th>
                        <th>Issue</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Resolved Date</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Assuming tickets is an array of ticket objects */}
                    {tickets.map((ticket) =>(
                        <tr key={ticket.ticketId}>
                            <td>{ticket.ticketId}</td>
                            <td>{ticket.issue}</td>
                            <td>{ticket.status}</td>
                            <td>{ticket.createdAt.split('T')[0]}</td>
                            <td>{ticket.resolvedDate===null?'Yet to be resolved':ticket.resolvedDate.split('T')[0]}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={()=>handleViewClick(ticket)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {state &&
            (<div className="modal fade show" id="viewTicketModal" tabIndex="-1" aria-labelledby="viewTicketModalLabel" style={{display:'block',backgroundColor:'rgba(0,0,0,0.5)',backdropFilter:'blur(5px)'}}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="viewTicketModalLabel">View Ticket</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setState(false)}></button>
                        </div>
                        <div className="modal-body">
                            {/* Add your ticket details here */}
                            <p><b>Ticket ID:</b> {viewTicket.ticketId}</p>
                            <p><b>Issue Type:</b> {viewTicket.issueType}</p>
                            <p><b>Issue:</b> {viewTicket.issue}</p>
                            <p><b>Status:</b> {viewTicket.status}</p>
                            <p><b>Created At:</b> {viewTicket.createdAt.split('T')[0]}</p>
                            <p><b>Resolved Date:</b> {viewTicket.resolvedDate===null?'No yet resolved':viewTicket.resolvedDate.split('T')[0]}</p>
                            <p><b>Files: </b>
                            {viewTicket.file.map((f,index )=>(
                                
                                <div key={f.filename}>
                                    <span onClick={()=>handleFile(f)} style={{cursor:"pointer",hover:""}}>{f.filename}</span>
                                    {console.log(f.path)}
                                </div>
                            ))}</p>
                            <div>
                                <div>
                                    <label className="me-2"><b>Enter the Resolving instructions: </b></label>
                                </div>
                                <br/>
                                <div>
                                    <textarea placeholder="Enter the instructions" name="message" onChange={handleChange} rows="4" cols="60" required></textarea>
                            </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleClose}>Update Status</button>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Tickets;