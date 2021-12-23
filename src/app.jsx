import React, {useRef, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import LetterBox from "./letterbox"
import { wordList } from "./word-list";
import Message from "./message";


const WORD_LENGTH = 5;
const MAX_GUESS_COUNT = 5;

const selectWord = () => {
    const correctLengthWords = wordList.filter(entry => entry.length === WORD_LENGTH);
    const word = correctLengthWords[Math.floor(Math.random() * correctLengthWords.length)];
    return word.toUpperCase();
}

const App = () => {
    const [word] = useState(selectWord());
    const [gameState, setGameState] = useState("ongoing");
    const [currentOpenRow, setCurrentOpenRow] = useState(0);
    const [gridState, setGridState] = useState(Array(MAX_GUESS_COUNT).fill().map(_ => Array(WORD_LENGTH).fill().map(_ => "")));
    const letterBoxRefs = useRef({});

    console.debug("XXX:", word);

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
        const newOpenRow = currentOpenRow + 1;
        setCurrentOpenRow(newOpenRow);
        setFocus(newOpenRow, 0);

        if (gridState.map(row => row.reduce((prevLetter, currLetter) => prevLetter + currLetter)).some(guess => guess === word)) {
            setGameState("winner");
        } else if (newOpenRow >= MAX_GUESS_COUNT) {
            setGameState("loser");
        }
    };

    const isButtonDisabled = () => {
        if (currentOpenRow >= MAX_GUESS_COUNT) {
            return true;
        }
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

    const buildInputGrid = () => {
        return gridState.map((row, rowId) =>
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
    };

    return (
        <>
            <Message
                show={gameState === "winner"}
                message="You're a winner, baby"
                onClose={() => window.location.reload(false)}
            />
            <Message
                show={gameState === "loser"}
                message="Sorry, you lose. Big-time."
                onClose={() => window.location.reload(false)}
            />
            <Container
                fluid="sm"
            >
                {buildInputGrid()}
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
        </>
    )
}

export default App
