import { useEffect, useState } from "react";
import axios from "axios";

const LeaderBoard = () => {
  const [userName, setUserName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/leaderboard", userName)
        .then((err, result) => {
          if (err) return err;
          return console.log(result);
        });
      await fetchLeaderBoard();
    } catch (err) {
      return err;
    }
  };

  const fetchLeaderBoard = async () => {
    axios.get("http://localhost:5000/api/leaderboard").then((err, result) => {
      if (err) return err;
      return setLeaderboard(result.data.leaderboard);
    });
  };

  useEffect(() => {
    fetchLeaderBoard();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
        height: "80vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{
            outline: "none",
            border: "none",
            padding: "20px",
            backgroundColor: "#F3F3F1",
            borderRadius: "20px",
            width: "250px",
          }}
        />
        <button
          style={{
            borderRadius: "20px",
            border: "none",
            padding: "20px",
            backgroundColor: "#F9E81C",
            fontSize: "15px",
          }}
        >
          Update
        </button>
      </form>
      <div>
        <h1>LeaderBoard</h1>
        {leaderboard.map((value, index) => {
          <div key={index}>
            <h1>Username</h1>
            <p>{value.username}</p>
            <h1>Points</h1>
            <p>{value.score}</p>
          </div>;
        })}
      </div>
    </div>
  );
};

export default LeaderBoard;
