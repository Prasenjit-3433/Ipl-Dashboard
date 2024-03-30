import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { PieChart } from "react-minimal-pie-chart";

import MatchDetailCard from "../components/MatchDetailCard";
import MatchSmallCard from "../components/MatchSmallCard";

import "./TeamPage.scss";

function TeamPage() {
  const [team, setTeam] = useState({});
  const { teamName } = useParams();

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await fetch(`http://localhost:8080/team/${teamName}`);
      const data = await response.json();

      setTeam(data);
    };

    fetchTeam();
  }, [teamName]);

  if (!team || !team.matches) {
    return <h1>Team Not found!</h1>;
  }

  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
      </div>

      <div className="win-loss-section">
        Wins / Losses
        <PieChart
          data={[
            { title: "Losses", value: team.totalMatches - team.totalWins, color: "#a34d5d" },
            { title: "Wins", value: team.totalWins, color: "#4da375" }
          ]}
        />
        
      </div>

      <div className="match-detail-section">
        <h3>Latest Matches</h3>
        {team.matches && (
          <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
        )}
      </div>

      {team.matches &&
        team.matches
          .slice(1)
          .map((match) => (
            <MatchSmallCard
              key={match.id}
              teamName={team.teamName}
              match={match}
            />
          ))}

      <div className="more-link">
        <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More{">"}</Link>
      </div>
    </div>
  );
}

export default TeamPage;
