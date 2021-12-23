import React from "react";
import PropTypes from "prop-types";
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

Message.propTypes = {
    message: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

export default Message;
