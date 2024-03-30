import { useEffect, useState } from "react";
import MatchDetailCard from "../components/MatchDetailCard";
import { useParams } from "react-router-dom";

import "./MatchPage.scss";
import { YearSelector } from "../components/YearSelector";

export const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const { teamName, year } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        `http://localhost:8080/team/${teamName}/matches?year=${year}`
      );
      const data = await response.json();

      setMatches(data);
    };

    fetchMatches();
  }, [teamName, year]);

  return (
    <div className="match-page">
      <div className="year-selector">
        <h3>Select Year</h3>
        <YearSelector teamName={teamName} />
      </div>

      <div>
        <h1 className="match-page-heading">{teamName}'s Matches in {year}</h1>

        {matches &&
          matches.map((match) => (
            <MatchDetailCard key={match.id} teamName={teamName} match={match} />
          ))}
      </div>
    </div>
  );
};
