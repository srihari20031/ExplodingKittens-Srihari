import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LeaderBoard = () => {
  const [userName, setUserName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/leaderboard", { userName })
        .then((result, err) => {
          if (err) console.log(err);
          return console.log(userName)
        });
      await fetchLeaderBoard();
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchLeaderBoard = async () => {
    axios
      .get("http://localhost:5000/api/leaderboard")
      .then((response) => {
        setLeaderboard(response.data.leaderboard);
      })
      .catch((error) => {
        console.log("An error occurred:", error);
        // Handle the error
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
      <div style={{ width: "500px", margin: "0 auto" }}>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <table style={{ width: "100%", border: "1px solid black" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th
                  style={{ padding: "10px", borderBottom: "1px solid black" }}
                >
                  Username
                </th>
                <th
                  style={{ padding: "10px", borderBottom: "1px solid black" }}
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={index}>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid black" }}
                  >
                    {user.username}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid black" }}
                  >
                    {user.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link to="/" style={{ all: "unset", color: "navy", fontSize: "25px" }}>
        Wanna Play again?
        <span style={{ fontWeight: "500" }}> Click here.</span>
      </Link>
    </div>
  );
};

export default LeaderBoard;
