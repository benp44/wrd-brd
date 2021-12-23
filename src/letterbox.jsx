import React, {useEffect, useRef} from "react";
import { Form } from "react-bootstrap";

import "./letterbox.css";

const LetterBox = ({ letter, status, onChange, isFocused, isDisabled }) => {
    const controlRef = useRef(null);
    useEffect(() => {
        if (isFocused) {
            controlRef.current.focus();
        }
    }, [isFocused]);

    const handleChange = (input) => {
        const newValue = input ? input[0].toUpperCase() : "";
        onChange(newValue);
    };

    return <Form.Control
        ref={controlRef}
        className={status + " text-center"}
        disabled={isDisabled}
        size="lg"
        type="text"
        placeholder=""
        value={letter}
        onChange={event => handleChange(event.target.value)}
    />;
};

export default LetterBox;
