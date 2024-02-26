import "./App.css";
import Game from "./components/Game";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard";

/* I have not created separate css files or used tailwindcss because 
i dont know redis and go i thought if i focused too much on styles it would take me more time than needed 
as because both redis and go is little difficult than node and mongo but however i challeged myself and 
learned both the techs to  make this project possible and i will use the both in my future projects
Thank You for making me do this*/
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
