import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MatchDetailCard from "../components/MatchDetailCard";
import MatchSmallCard from "../components/MatchSmallCard";

function TeamPage() {
  const [team, setTeam] = useState({});
  const { teamName } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`http://localhost:8080/team/${teamName}`);
      const data = await response.json();

      setTeam(data);
    };

    fetchMatches();
  }, [teamName]);
  
  if(!team || !team.matches) {
    return(
        <h1>Team Not found!</h1>
    );
  }

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      {team.matches && <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />}

      {team.matches &&
        team.matches
          .slice(1)
          .map((match) => <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />)}
    </div>
  );
}

export default TeamPage;
