import React, {useState} from "react";
import { Form } from "react-bootstrap";

import "./letterbox.css";

const LetterBox = ({ letter, status, onChange, forwardRef }) => {

    const handleChange = (input) => {
        const newValue = input ? input[0].toUpperCase() : "";
        onChange(newValue);
    };

    return <Form.Control
        ref={forwardRef}
        className={status}
        size="lg"
        type="text"
        placeholder=""
        value={letter}
        onChange={event => handleChange(event.target.value)}
    />;
};

export default LetterBox;
