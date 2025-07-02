const Card=({ticket})=>{
    return(
        <div className="m-2 card mb-4 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Ticket Id: <span className="text-muted">{ticket.ticketId}</span></h5>
                <p className="card-text"><strong>Issue: </strong>{ticket.issue}</p>
                <div className="mt-3">
                    <p><b>Solution: </b>{ticket.message}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <strong>Status: </strong><span className={ticket.status==='open'?'text-danger':'text-success'}>{ticket.status}</span>
                    </div>
                    <div>
                        <strong>Created Date: </strong>{ticket.createdAt.split('T')[0]}
                    </div>
                    <div>
                        <strong>Resolved Date: </strong>{ticket.resolvedDate!==null ? ticket.resolvedDate.split('T')[0] : 'Yet to be resolved'}
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default Card