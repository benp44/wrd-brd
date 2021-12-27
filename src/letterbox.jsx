import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

import "./letterbox.css";

const LetterBox = ({ id, letter, state, isFocused, onChange, onSubmit }) => {
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
        id={id}
        className={state + " text-center"}
        disabled={state !== "open"} 
        size="lg"
        type="text"
        placeholder=""
        value={letter}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event.key)}
        ref={controlRef}
    />;
};

LetterBox.propTypes = {
    id: PropTypes.string.isRequired,
    letter: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default LetterBox;
