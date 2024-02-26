import Cat from "../assets/images/CatCard.jpg";
import Defuse from "../assets/images/DefuseCard.jpg";
import Shuffle from "../assets/images/Shuffle.jpg";
import ExplodingKitten from "../assets/images/Catastrophie.jpeg";
import PlaceHolder from "../assets/images/PlaceHolder.webp";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  DefuseCard,
  DrawCard,
  GameOver,
  GameWon,
  ShuffleCard,
} from "../features/GameRedux";
import Exploded from "../assets/images/Sorry.jpg";

const CardImage = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  //pickedcard to pass the type to switch case
  const [pickedCard, setPickedCard] = useState(null);
  const [defuse, setDefuse] = useState("");

  // to change the images dynamically when clicked as src of images can't be changed directly using states
  let imagePath;
  switch (pickedCard) {
    case "Cat":
      imagePath = Cat;

      break;
    case "Defuse":
      imagePath = Defuse;

      break;
    case "Shuffle":
      imagePath = Shuffle;

      break;
    case "ExplodingKitten":
      imagePath = ExplodingKitten;

      break;
    default:
      imagePath = "";
  }

  //button to dispatch to drawcard redux reducer
  const drawCard = () => {
    if (game.deck.length > 0) {
      dispatch(DrawCard());
      setPickedCard(game.deck[0]);
      if (game.deck[0] === "Defuse") {
        setDefuse(true);
      } else if (game.deck[0] === "ExplodingKitten" && !defuse)
        dispatch(GameOver());
      else if (game.deck[0] === "Shuffle" && game.deck.length > 1) {
        dispatch(ShuffleCard());
        alert("Cards Shuffled");
      }
    } else {
      dispatch(GameWon());
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {!game.gameOver ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cardimage"
          onClick={drawCard}
        >
          {imagePath !== "" ? (
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <img
                src={imagePath}
                style={{
                  width: "340px",
                  height: "400px",
                  borderRadius: "20px",
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <img
                src={PlaceHolder}
                alt="Placeholder"
                style={{
                  width: "340px",
                  height: "400px",
                  borderRadius: "20px",
                }}
              />
            </motion.div>
          )}
        </motion.div>
      ) : (
        <img
          src={Exploded}
          alt=""
          style={{
            width: "340px",
            height: "400px",
            borderRadius: "20px",
          }}
        />
      )}
      {defuse && (
        <button
          style={{
            borderRadius: "20px",
            border: "none",
            padding: "20px",
            backgroundColor: "#F9E81C",
            fontSize: "15px",
            marginTop: "20px",
          }}
          onClick={() => {
            dispatch(DefuseCard());
            setDefuse(false);
            alert("Kitten Defused");
          }}
        >
          Defuse
        </button>
      )}

      {game.gameWon && <h1>You Won</h1>}
    </div>
  );
};

export default CardImage;
