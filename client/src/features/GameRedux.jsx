import { createSlice } from "@reduxjs/toolkit";
import { Shuffle } from "./Shuffle";

const types = ["Cat", "Defuse", "Shuffle", "ExplodingKitten"];
//the deck with five cards
let cardsArray = ["Cat", "Defuse", "Shuffle", "ExplodingKitten", "Cat"];
//this is the intial state of the game
const initialState = {
  deck: Shuffle(cardsArray), //shuffles the array and assign
  cardInhand: "",
  gameWon: false,
  gameOver: false,
  points: 0,
  leaderboard: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    DrawCard: (state) => {
      const temp = [...state.deck]; //create a temporary array to draw from
      const card = temp[0];
      console.log(state.cardInhand);
      return {
        ...state,
        deck: temp.slice(1),
        cardInhand: card,
      };
    },
    DefuseCard: (state) => {
      const temp = [...state.deck];
      return {
        ...state,
        deck: temp.filter((item) => item !== "ExplodingKitten"),
      };
    },
    ShuffleCard: (state) => {
      return {
        ...state,
        deck: [...Array(5)].map(
          () => types[Math.floor(Math.random() * types.length)]
        ),
      };
    },
    AddPoints: (state) => {
      state.leaderboard.push({
        username: state.username,
        points: state.leaderboard.length + 1,
      });
      state.leaderboard.sort((a, b) => b.points - a.points);
    },
    GameWon: (state) => {
      state.gameWon = true;
    },
    GameOver: (state) => {
      state.gameOver = true;
    },

    GameRestart: (state) => {
      state.deck = [...Array(5)].map(
        () => types[Math.floor(Math.random() * types.length)]
      );
      state.gameOver = false;
      state.gameWon = false;
    },
  },
});
export const {
  DrawCard,
  DefuseCard,
  ShuffleCard,
  GameWon,
  GameOver,
  GameRestart,
  AddPoints,
} = gameSlice.actions;

export default gameSlice.reducer;

// Shuffle([...Array(5)].map(() => randomCard()))

// export default function gameReducer(state = initialState, action) {
//   switch (action.type) {
//     case "Setusername":
//       return {
//         ...state,
//         username: action.payload,
//       };
//     case "StartGame":
//       return {
//         ...state,
//         deck: Shuffle(state.deck),
//       };
//     case "DrawCard":
//       return {
//         ...state,
//         cardInhand: state.deck[0],
//         deck: state.deck.slice(1),
//       };
//     default:
//       state;
//   }
// }

// export const StartGame = () => {
//   return {
//     type: "StartGame",

//   };
// };

// export const DrawCard = () => {
//   return {
//     type: "DrawCard",
//   };
// };
// export const Setusername = () => {
//   return {
//     type: "Setusername",
//   };
// };
