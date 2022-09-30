import React, { useState } from "react";
import logo from "./logo.svg";
import Icon from "./components/Icon.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const itemArray = new Array(9).fill("empty");

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [gameFinished, setGameFinished] = useState(false);
  const [totalMoves, setTotalMoves] = useState(1);

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };

  const checkIsWinner = () => {
    //row 1 match
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[1] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinMessage(`${itemArray[0]} wins`);
      setGameFinished(true);
    } //row 2 match
    else if (
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5] &&
      itemArray[3] !== "empty"
    ) {
      setWinMessage(`${itemArray[3]} wins`);
      setGameFinished(true);
    } //row 3 match
    else if (
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8] &&
      itemArray[6] !== "empty"
    ) {
      setWinMessage(`${itemArray[7]} wins`);
      setGameFinished(true);
    } //column 1 match
    else if (
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6] &&
      itemArray[0] !== "empty"
    ) {
      setWinMessage(`${itemArray[3]} wins`);
      setGameFinished(true);
    } //column 2 match
    else if (
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7] &&
      itemArray[1] !== "empty"
    ) {
      setWinMessage(`${itemArray[1]} wins`);
      setGameFinished(true);
    } //column 3 match
    else if (
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8] &&
      itemArray[2] !== "empty"
    ) {
      setWinMessage(`${itemArray[2]} wins`);
      setGameFinished(true);
    } //diag 1 match
    else if (
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8] &&
      itemArray[0] !== "empty"
    ) {
      setWinMessage(`${itemArray[4]} wins`);
      setGameFinished(true);
    } //diag 2 match
    else if (
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6] &&
      itemArray[2] !== "empty"
    ) {
      setWinMessage(`${itemArray[2]} wins`);
      setGameFinished(true);
    }
  };

  const changeItem = (itemNumber) => {
    if (winMessage) {
      toast(winMessage, {
        type: "success",
        hideProgressBar: true,
        closeOnClick: true,
      });
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
      setTotalMoves(totalMoves + 1);
    } else {
      toast("fill another cell", { type: "error" });
    }

    checkIsWinner();

    //check if game is finished. If not, then check if totalmoves = 9.
    if (!gameFinished && totalMoves >= 9) {
      setWinMessage("Draw");
    }
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {/* Conditionally rendering the reload button on basis of whether win message is set or not */}
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-primary text-uppercase text-center">
                {winMessage}
              </h1>
              {/* Button comes from reactstrap and button comes from html */}
              <Button color="success" block onClick={reloadGame}>
                {" "}
                Reload Game{" "}
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-primary">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card key={index} onClick={() => changeItem(index)}>
                <CardBody className="box">
                  <Icon icon={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
