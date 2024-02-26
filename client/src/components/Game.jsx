import { useState } from "react";
import CardImage from "./CardImage";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// const types = ["Cat", "Defuse", "Shuffle", "ExplodingKitten"];
// let cardsArray = ["Cat", "Defuse", "Shuffle", "ExplodingKitten", "Cat"];

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const game = useSelector((state) => state.game);

  const startGame = (e) => {
    e.preventDefault();
    setGameStarted(true);
  };

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

      <div
        style={{
          color: "black",
          borderRadius: "20px",
        }}
      >
        <CardImage />
      </div>
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
      {gameStarted && (
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
      )}
      <Link
        to="/leaderboard"
        style={{ all: "unset", color: "darkmagenta", fontSize: "20px" }}
      >
        Wanna see the leader board? Click here.
      </Link>
    </div>
  );
};

export default Game;
