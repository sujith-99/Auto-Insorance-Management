import Card from './Card';
const TicketCards = (props) => {
    return (
        <div>
            {props.tickets.map((ticket) => (
                <div key={ticket.ticketId}>
                    <Card ticket={ticket}/>
                </div>
            ))}
        </div>
    );
}

export default TicketCards;