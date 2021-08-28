import React, { useEffect, useState } from 'react';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
    injectStyle();
}

const Toaster = (props) => {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (props.message) setMessage(message);
        if (message) notify()
    }, [props.message, message]);

    const notify = () => {
        toast.dark(message);
    }

    return <ToastContainer />
}

export default Toaster;
