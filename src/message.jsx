import React from "react"
import {Button, Modal} from "react-bootstrap";

function Message({message, show, onClose}) {
    return (
        <Modal
            show={show}
            size="lg"
            centered
        >
            <Modal.Body>
                <p>
                    {message}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={onClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Message;
