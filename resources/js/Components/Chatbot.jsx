import React, { useState } from "react";

const Chatbot = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        isVisible && (
           
  
                <iframe
                    src="/chatbot-blade"
                    className=" fixed w-96  border-none rounded-lg bottom-5 right-4 h-[1100px] max-h-[1100px]  z-0  bg-none rounded-lg"
                    title="Chatbot"
                ></iframe>
     
        )
    );
};

export default Chatbot;
