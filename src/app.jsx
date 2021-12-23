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
        if (rowId != currentActiveRow) {
            return;
        }
        const newGrid = [...gridState];
        newGrid[rowId][letterId] = newLetter;
        setGridState(newGrid);
    };

    const onSubmit = () => {
        const newOpenRow = currentActiveRow + 1;
        setCurrentActiveRow(newOpenRow);

        if (gridState.map(row => row.reduce((prevLetter, currLetter) => prevLetter + currLetter)).some(guess => guess === word)) {
            setGameState("winner");
        } else if (newOpenRow >= MAX_GUESS_COUNT) {
            setGameState("loser");
        }
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
            <Container>
                <LetterGrid
                    gridState={gridState}
                    currentActiveRow={currentActiveRow}
                    word={word}
                    onLetterChanged={onLetterChanged}
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
                            disabled={gridState[currentActiveRow]?.some(letter => letter === "")}
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
