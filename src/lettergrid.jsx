import React from "react";
import {Col, Row} from "react-bootstrap";

import LetterBox from "./letterbox";
import {CELL_STATE_OPEN} from "./states";

const LetterGrid = ({gridState, currentActiveRowId, onLetterChanged, onSubmit}) => {
    const focusedLetterId = gridState[currentActiveRowId]?.findIndex(value => value.letter === "");

    const handleLetterChange = (rowId, columnId, newLetter) => {
        onLetterChanged(rowId, columnId, newLetter, CELL_STATE_OPEN);
    };

    const handleSubmit = () => {
        onSubmit();
    };

    return gridState.map((row, rowId) =>
        <Row
            key={`row-${rowId}`}
            className="mt-2"
            md="auto"
        >
            {
                row.map((cell, columnId) =>
                    <Col
                        className="px-1"
                        key={`column-${rowId}-${columnId}`}
                    >
                        <LetterBox
                            key={`letter-box-${rowId}-${columnId}`}
                            id={`letter-box-${rowId}-${columnId}`}
                            letter={cell.letter}
                            state={cell.state}
                            isFocused={columnId === focusedLetterId && rowId === currentActiveRowId}
                            onChange={(newLetter) => handleLetterChange(rowId, columnId, newLetter)}
                            onSubmit={handleSubmit}
                        />
                    </Col>
                )
            }
        </Row>
    );
};

LetterGrid.propTypes = {
    gridState: PropTypes.array.isRequired,
    currentActiveRowId: PropTypes.number.isRequired,
    onLetterChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default LetterGrid;
