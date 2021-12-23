import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";

import LetterBox from "./letterbox";

const LetterGrid = ({gridState, currentActiveRow, word, onLetterChanged, onSubmit}) => {
    const focusedLetterId = gridState[currentActiveRow]?.findIndex(value => value === "");

    const handleLetterChange = (rowId, letterId, newLetter) => {
        onLetterChanged(rowId, letterId, newLetter);
    };

    const handleSubmit = () => {
        onSubmit();
    };

    const getLetterStatus = (rowId, letterId, letter) => {
        if (rowId > currentActiveRow) {
            return "disabled";
        }

        if (rowId === currentActiveRow) {
            return ""
        }

        if (letter === word[letterId]) {
            return "correct";
        }

        if (word.includes(letter)) {
            return "outofplace";
        }

        return "incorrect";
    };

    return gridState.map((row, rowId) =>
        <Row
            key={`row-${rowId}`}
            className="mt-2"
            md="auto"
        >
            {
                row.map((letter, letterId) =>
                    <Col
                        className="px-1"
                        key={`column-${rowId}-${letterId}`}
                    >
                        <LetterBox
                            key={`letter-box-${rowId}-${letterId}`}
                            letter={letter}
                            status={getLetterStatus(rowId, letterId, letter)}
                            isFocused={letterId === focusedLetterId && rowId === currentActiveRow}
                            isDisabled={rowId !== currentActiveRow}
                            onChange={(newLetter) => handleLetterChange(rowId, letterId, newLetter)}
                            onSubmit={handleSubmit}
                        />
                    </Col>
                )
            }
        </Row>
    );
};

export default LetterGrid;
