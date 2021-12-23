import React, {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import { wordList } from "./word-list";
import LetterGrid from "./lettergrid";
import Message from "./message";
import {
    CELL_STATE_CORRECT,
    CELL_STATE_DISABLED,
    CELL_STATE_INCORRECT,
    CELL_STATE_OPEN,
    CELL_STATE_OUT_OF_PLACE,
    GAME_STATE_LOST,
    GAME_STATE_ONGOING,
    GAME_STATE_WON
} from "./states";

const WORD_LENGTH = 5;
const MAX_GUESS_COUNT = 5;

const getInitialGrid = () => {
    return Array(MAX_GUESS_COUNT).fill().map((_, rowId) => {
        return Array(WORD_LENGTH).fill().map(() => ({
            letter: "",
            state: rowId === 0 ? CELL_STATE_OPEN : CELL_STATE_DISABLED,
        }));
    });
};

const selectRandomWord = () => {
    const correctLengthWords = wordList.filter(entry => entry.length === WORD_LENGTH);
    const word = correctLengthWords[Math.floor(Math.random() * correctLengthWords.length)];
    return word.toUpperCase();
};

const App = () => {
    const [word] = useState(selectRandomWord());
    const [gameState, setGameState] = useState(GAME_STATE_ONGOING);
    const [gridState, setGridState] = useState(getInitialGrid());
    const [currentActiveRowId, setCurrentActiveRowId] = useState(0);
    const [hintMessage, setHintMessage] = useState("");

    const getCurrentWord = () => gridState[currentActiveRowId]?.reduce((prev, currentCell) => prev + currentCell.letter, "");
    const isCurrentRowComplete = () => gridState[currentActiveRowId]?.every(cell => cell.letter !== "");
    const isCurrentWordValid = () => wordList.includes(getCurrentWord());

    const updateGrid = (rowId, columnId, newLetter, state) => {
        const newGrid = [...gridState];
        if (newGrid[rowId]) {
            newGrid[rowId][columnId] = {
                letter: newLetter,
                state: state,
            };

            setGridState(newGrid);
        }
    };

    const onSubmit = () => {
        setHintMessage("");

        if (!isCurrentRowComplete()) {
            setHintMessage("You must complete the row");
            return;
        }
        if (!isCurrentWordValid()) {
            setHintMessage("The word was not known");
            return;
        }
        
        const nextRowId = currentActiveRowId + 1;

        // Evaluate the current row
        gridState[currentActiveRowId].forEach((cell, columnId) => {
            if (cell.letter === word[columnId]) {
                updateGrid(currentActiveRowId, columnId, cell.letter, CELL_STATE_CORRECT);
            } else if (word.includes(cell.letter)) {
                updateGrid(currentActiveRowId, columnId, cell.letter, CELL_STATE_OUT_OF_PLACE);
            } else {
                updateGrid(currentActiveRowId, columnId, cell.letter, CELL_STATE_INCORRECT);
            }
        });

        // Check for win
        if (word === getCurrentWord()) {
            setGameState(GAME_STATE_WON);
            return;
        }
        
        // Check for loss
        if (nextRowId === MAX_GUESS_COUNT) {
            setGameState(GAME_STATE_LOST);
            return;
        }

        // Open the next row
        gridState[currentActiveRowId].forEach((cell, columnId) => {
            if (cell.letter === word[columnId]) {
                updateGrid(nextRowId, columnId, cell.letter, CELL_STATE_CORRECT);
            } else {
                updateGrid(nextRowId, columnId, "", CELL_STATE_OPEN);
            }
        });

        setCurrentActiveRowId(nextRowId);
    };

    return (
        <>
            <Message
                show={gameState === GAME_STATE_WON}
                message="You're a winner, baby"
                onClose={() => window.location.reload(false)}
            />
            <Message
                show={gameState === GAME_STATE_LOST}
                message={`Sorry, you lost. Big-time. You were looking for ${word}.`}
                onClose={() => window.location.reload(false)}
            />
            <Container
                className="container"
            >
                <LetterGrid
                    gridState={gridState}
                    currentActiveRowId={currentActiveRowId}
                    onLetterChanged={updateGrid}
                    onSubmit={onSubmit}
                />
                <Row
                    className="mt-3"
                >
                    <Col
                        className="px-1"
                        xl={3}
                    >
                        <Button 
                            size="md"
                            variant="primary"
                            onClick={onSubmit}
                        >
                            Check
                        </Button>
                    </Col>
                    <Col
                        className="px-1"
                    >
                        {hintMessage}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;
