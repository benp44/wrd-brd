import React, {useRef, useState} from "react"
import {Button, Col, Container, Row} from "react-bootstrap";

import LetterBox from "./letterbox"
import { wordList } from "./word-list";

import "bootstrap/dist/css/bootstrap.min.css";

const WORD_LENGTH = 5;
const MAX_GUESS_COUNT = 5;
    
const selectWord = () => {
    const correctLengthWords = wordList.filter(entry => entry.length === WORD_LENGTH);
    return correctLengthWords[Math.floor(Math.random() * correctLengthWords.length)];
}

const App = () => {

    const [word] = useState(selectWord());
    const [currentOpenRow, setCurrentOpenRow] = useState(0);
    const [gridState, setGridState] = useState(Array(MAX_GUESS_COUNT).fill().map(_ => Array(WORD_LENGTH).fill().map(_ => "")));
    const letterBoxRefs = useRef({});

    console.log("XXX:", word);

    const setFocus = (rowId, letterId) => {
        const nextComponent = letterBoxRefs.current[`${rowId}-${letterId}`];
        if (nextComponent) {
            nextComponent.focus();
        }
    };

    const onChange = (rowId, letterId, newLetter) => {
        if (rowId != currentOpenRow) {
            return;
        }
        const newGrid = [...gridState];
        newGrid[rowId][letterId] = newLetter;
        setGridState(newGrid);

        if (newLetter !== "") {
            setFocus(rowId, letterId + 1);
        }
    };

    const onSubmit = () => {
        const currentGuess = gridState[currentOpenRow].reduce((prev, curr) => prev + curr);
        if (currentGuess === word) {
            const score = (MAX_GUESS_COUNT - currentOpenRow) * 10;
            alert(`You scored ${score}!`);
            return;
        }
        const newOpenRow = currentOpenRow + 1;
        setCurrentOpenRow(newOpenRow);
        setFocus(newOpenRow, 0);
    };

    const isButtonDisabled = () => {
        return gridState[currentOpenRow].some(letter => letter === "");
    };

    const getLetterStatus = (rowId, letterId, letter) => {
        if (rowId > currentOpenRow) {
            return "disabled";
        }

        if (rowId === currentOpenRow) {
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

    const inputGrid = gridState.map((row, rowId) =>
        <Row 
            key={`row-${rowId}`}
            className="mt-3"
            md="auto"
        >
            {
                row.map((letter, letterId) =>
                    <Col
                        key={`column-${rowId}-${letterId}`}
                    >
                        <LetterBox
                            key={`box-${rowId}-${letterId}`}
                            forwardRef={element => letterBoxRefs.current[`${rowId}-${letterId}`] = element}
                            letter={letter}
                            status={getLetterStatus(rowId, letterId, letter)}
                            onChange={(newLetter) => onChange(rowId, letterId, newLetter)}
                        />
                    </Col>
                )
            }
        </Row>
    );

    return (
        <Container
            fluid="sm"
        >
            {inputGrid}
            <Row
                className="mt-3"
                md="auto"
            >
                <Col>
                    <Button 
                        variant="primary"
                        onClick={onSubmit}
                        disabled={isButtonDisabled()}
                    >
                        Check
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default App
