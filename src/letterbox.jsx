import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

import { CELL_STATE_OPEN, CELL_STATE_OPEN_INCORRECT } from "./states";
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
        id={id}
        className={state + " text-center"}
        disabled={state !== CELL_STATE_OPEN && state !== CELL_STATE_OPEN_INCORRECT}
        size="lg"
        type="text"
        placeholder=""
        autoComplete="off"
        value={letter}
        onChange={(event) => handleChange(event.target.value)}
        onKeyPress={(event) => handleKeyPress(event)}
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
