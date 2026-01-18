const FAQs = [
    {
        question: "How do I participate in a contest?",
        answer: "To participate, simply browse our active contests, select one that matches your skills, and click the 'Register' or 'Submit' button on the contest details page."
    },
    {
        question: "Is there a fee to join ContestHub?",
        answer: "Signing up for ContestHub is completely free. However, some premium contests may have a small entry fee which is added to the prize pool."
    },
    {
        question: "How are winners selected?",
        answer: "Winners are selected by the contest creator based on the submission quality and adherence to the guidelines. Some contests also feature community voting."
    },
    {
        question: "Can I host my own contest?",
        answer: "Yes! If you have a Creator account, you can easily host your own contests, set the prize money, and invite participants."
    },
    {
        question: "How do I get paid if I win?",
        answer: "Winnings are credited to your ContestHub wallet immediately after the results are announced. You can withdraw funds to your bank account or PayPal."
    }
];

const FAQ = () => {
    return (
        <div className="py-16 bg-base-200">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                
                <div className="join join-vertical w-full">
                    {FAQs.map((faq, index) => (
                        <div key={index} className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
                            <input type="radio" name="my-accordion-4" defaultChecked={index === 0} /> 
                            <div className="collapse-title text-xl font-medium">
                                {faq.question}
                            </div>
                            <div className="collapse-content">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
