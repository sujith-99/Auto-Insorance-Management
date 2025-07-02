const FAQ=()=>{
    const a=[
      {q:"How can I file a claim?",a:"You can file a claim by logging into your account, selecting your policy, and submitting a claim request with required details."},
      {q:"What documents are required for a claim?",a:"Required documents include your policy number, accident details, police report (if applicable), and any supporting photos or bills."},
      {q:"How long does it take to process a claim?",a:"Claims are usually processed within 7-14 business days, depending on the complexity and documentation provided."},
      {q:"How can I contact customer support?",a:"You can contact customer support via our toll-free number, email, or live chat available on our website."}
    ]
    return (
        <div className="container mt-5">
          <h2 className="text-center text-primary mb-4">Frequently Asked Questions (FAQs)</h2>
            <div className="accordion" id="faqAccordion">
              {a.map((item,index)=>(
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id="headingOne">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapse${index}`}
                      aria-controls="collapseOne"
                    >
                      {item.q}
                    </button>
                  </h2>
                  <div 
                    id={`collapse${index}`} 
                    className="accordion-collapse collapse" 
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      {item.a}
                    </div>
                  </div>
                </div>))}
          </div>
      </div>
      );
}

export default FAQ;