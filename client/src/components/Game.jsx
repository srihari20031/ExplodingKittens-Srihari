import { useState } from "react";
import CardImage from "./CardImage";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PressStart from "../assets/images/Press start.jpg";
import { ShuffleCard } from "../features/GameRedux";

// const types = ["Cat", "Defuse", "Shuffle", "ExplodingKitten"];
// let cardsArray = ["Cat", "Defuse", "Shuffle", "ExplodingKitten", "Cat"];

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const game = useSelector((state) => state.game);
  // use dispatch is used to dispatch the reducers from the redux folder
  const dispatch = useDispatch();

  const startGame = (e) => {
    e.preventDefault();
    setGameStarted(true);
  };

  // const shuffleCard = () => {
  //   dispatch(ShuffleCard(cardsArray));
  // };

  

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "40px",
        height: "80vh",
      }}
    >
      <h1>Exploding Kitten😸</h1>
      {gameStarted ? (
        <div
          style={{
            color: "black",
            borderRadius: "20px",
          }}
        >
          <CardImage />
        </div>
      ) : (
        <div>
          <img src={PressStart} alt="" style={{ borderRadius: "20px" }} />
        </div>
      )}

      {!gameStarted && (
        <button
          style={{
            borderRadius: "20px",
            border: "none",
            padding: "20px",
            backgroundColor: "#F9E81C",
            fontSize: "15px",
          }}
          onClick={startGame}
        >
          Start game
        </button>
      )}
      {gameStarted && (!game.gameOver ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3>Click to draw a card</h3>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Game Over!!!</h1>
        </div>)
      )}
      <Link
        to="/leaderboard"
        style={{ all: "unset", color: "navy", fontSize: "25px" }}
      >
        Wanna see the leader board?{" "}
        <span style={{ fontWeight: "500" }}> Click here.</span>
      </Link>
    </div>
  );
};

export default Game;
