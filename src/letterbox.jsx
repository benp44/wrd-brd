import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

import { CELL_STATE_OPEN, CELL_STATE_OPEN_INCORRECT } from "./states";
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

    const handleKeyPress = (event) => {
        const key = event.key
        if (key === "Enter") {
            onSubmit();
        }
        else if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(key)) {
            handleChange(key);
        }
        else {
            event.preventDefault();
        }
    }

    return <Form.Control
        ref={controlRef}
        className={state + " text-center"}
        disabled={state !== CELL_STATE_OPEN && state !== CELL_STATE_OPEN_INCORRECT}
        size="lg"
        type="text"
        placeholder=""
        value={letter}
        onChange={(event) => handleChange(event.target.value)}
        onKeyPress={(event) => handleKeyPress(event)}
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
