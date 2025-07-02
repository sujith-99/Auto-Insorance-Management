import {useEffect, useState} from 'react';
import FAQ from './FAQ';
import axios from 'axios';
import TicketCards from './TicketCards';
const CustomerSupport = () => {
    const [state,setState]=useState(false)
    const [data,setData]=useState([])
    const userId=localStorage.getItem('userId')
    const [ticketDetails,setTicketDetails]=useState({
        name:"",
        policyId:"",
        email:"",
        issueType:"",
        issue:"",
        files:null
    })
    
    const handleChange=(e)=>{
        const {name,value,files}=e.target;
        if(name==="files")
        {
            const files1=Array.from(files);
            setTicketDetails((prev)=>({...prev,[name]:files1}))
            
        }
        else
        {
            setTicketDetails({...ticketDetails,[name]:value})
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('userId',userId);
        formData.append('ticketId',new Date().getTime());
        formData.append('name',ticketDetails.name);
        formData.append('policyId',ticketDetails.policyId);
        formData.append('email',ticketDetails.email);
        formData.append('issueType',ticketDetails.issueType);
        formData.append('issue',ticketDetails.issue);

        for(let i=0;i<ticketDetails.files.length;i++){
            formData.append('files', ticketDetails.files[i]);
        }
    
        axios.post("/api/ticket",formData)
        .then((response)=>{
            alert("Ticket Raised Successfully");
            setState(false);
        })
        .catch((error)=>{
            console.error(error);
            alert("Error in Raising Ticket");
        })
    }

    useEffect(() => {
        axios.get(`/api/ticket?userId=${userId}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]); // Include userId in the dependency array
    

    return (
        
        <div className="vh-100" >  
            <h2><center>Customer Support</center></h2><br/>
            <div className="container text-center mb-4">
                <button className="btn btn-primary" onClick={()=>setState(true)}>Raise a Ticket</button>
            </div>
            {state &&(
                <div className="modal fade show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" style={{display:'block',backgroundColor:'rgba(0,0,0,0.5)',backdropFilter:'blur(5px)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Raise Ticket</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setState(false)}></button>
                            </div>

                            <div className="modal-body">
                                <form className="form-group" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" name="name" className="form-control shadow-sm"  onChange={handleChange}  required  /><br/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Policy Id</label>
                                        <input type="text" name="policyId" className="form-control shadow-sm" onChange={handleChange}  required /><br/>
                                    </div>
                                    
                                    <div className="mb-3"><label className="form-label">Email Id</label>
                                        <input type="email" name="email" className="form-control shadow-sm"  onChange={handleChange} required /><br/>
                                    </div>

                                    <div className="mb-3"><label className="form-label">Issue Category:</label>
                                        <select name="issueType" onChange={handleChange}>
                                            <option>--Select Issue--</option>
                                            <option>Claim Issue</option>
                                            <option>Payment Issue</option>
                                            <option>Policy Renewal</option>
                                            <option>Others</option>
                                        </select><br/>
                                    </div>

                                    <div className="mb-3"> <label className="form-label">Description of Issue</label>
                                        <textarea className="form-control shadow-sm" name='issue' rows='3' onChange={handleChange}  placeholder='Enter the description of issue' required></textarea><br/>
                                    </div>

                                    <div className="mb-3"><label className="form-label">Upload Documents</label>
                                        <input type="file" name="files" onChange={handleChange} multiple className="form-control shadow-sm" required/><br/>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>

                                </form>
                            </div>

                            
                        </div>
                    </div>

                </div>
)}          
{console.log(data)}
            <TicketCards tickets={data} />
            <FAQ />
        </div>       
);}

export default CustomerSupport;