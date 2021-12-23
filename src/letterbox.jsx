import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

import "./letterbox.css";

const LetterBox = ({ letter, state, isFocused, onChange, onSubmit }) => {
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
        } else if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(key)) {
            handleChange(key);
        }
    };

    return <Form.Control
        ref={controlRef}
        className={state + " text-center"}
        disabled={state !== "open"} 
        size="lg"
        type="text"
        placeholder=""
        value={letter}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event.key)}
    />;
};

LetterBox.propTypes = {
    letter: PropTypes.string,
    state: PropTypes.string,
    isFocused: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default LetterBox;
