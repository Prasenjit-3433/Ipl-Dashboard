import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TeamPage from "./pages/TeamPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/teams/:teamName" element={<TeamPage />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
