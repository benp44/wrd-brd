import React, {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import { wordList } from "./word-list";
import LetterGrid from "./lettergrid";
import Message from "./message";

const WORD_LENGTH = 5;
const MAX_GUESS_COUNT = 5;

const selectRandomWord = () => {
    const correctLengthWords = wordList.filter(entry => entry.length === WORD_LENGTH);
    const word = correctLengthWords[Math.floor(Math.random() * correctLengthWords.length)];
    return word.toUpperCase();
}

const App = () => {
    const [word] = useState(selectRandomWord());
    const [gameState, setGameState] = useState("ongoing");
    const [currentActiveRow, setCurrentActiveRow] = useState(0);
    const [gridState, setGridState] = useState(Array(MAX_GUESS_COUNT).fill().map(_ => Array(WORD_LENGTH).fill().map(_ => "")));

    const onLetterChanged = (rowId, letterId, newLetter) => {
        const newGrid = [...gridState];
        if (newGrid[rowId]) {
            newGrid[rowId][letterId] = newLetter;
            setGridState(newGrid);
        }
    };

    const isCurrentRowFilled = () => {
        return gridState[currentActiveRow]?.every(letter => letter !== "");
    }

    const isCorrectWordEntered = () => {
        return gridState.map(row => row.reduce((prevLetter, currLetter) => prevLetter + currLetter)).some(guess => guess === word);
    };

    const onSubmit = () => {
        if (!isCurrentRowFilled()) {
            return;
        }

        const newActiveRow = currentActiveRow + 1;

        if (isCorrectWordEntered()) {
            setGameState("winner");
        } else if (newActiveRow >= MAX_GUESS_COUNT) {
            setGameState("loser");
        }

        // Transfer correct letters to the new row
        gridState[currentActiveRow].forEach((letter, letterId) => {
            if (letter === word[letterId]) {
                onLetterChanged(newActiveRow, letterId, letter);
            }
        });

        setCurrentActiveRow(newActiveRow);
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
                message={`Sorry, you lose. Big-time. You were looking for ${word}.`}
                onClose={() => window.location.reload(false)}
            />
            <Container>
                <LetterGrid
                    gridState={gridState}
                    currentActiveRow={currentActiveRow}
                    word={word}
                    onLetterChanged={onLetterChanged}
                    onSubmit={onSubmit}
                />
                <Row
                    className="mt-3"
                >
                    <Col
                        className="px-1"
                    >
                        <Button 
                            size="md"
                            variant="primary"
                            onClick={onSubmit}
                            disabled={!isCurrentRowFilled()}
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
