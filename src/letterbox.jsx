import React, {useEffect, useRef} from "react";
import { Form } from "react-bootstrap";

import "./letterbox.css";

const LetterBox = ({ letter, status, isFocused, isDisabled, onChange, onSubmit }) => {
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

    const handleKeyDown = (key) => {
        if (key === "Enter") {
            onSubmit();
        }
    };

    return <Form.Control
        ref={controlRef}
        className={status + " text-center"}
        disabled={isDisabled}
        size="lg"
        type="text"
        placeholder=""
        value={letter}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event.key)}
    />;
};

export default LetterBox;
