import { useEffect, useState } from "react";
import MatchDetailCard from "../components/MatchDetailCard";
import { useParams } from "react-router-dom";

export const MatchPage = () => {
    const [matches, setMatches] = useState([]);
    const {teamName, year} = useParams();

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
            const data = await response.json();

            setMatches(data);
        }

        fetchMatches();
    }, [teamName, year]);

    return(
        <div className="match-page">
            <h1>Match Page</h1>

            {
                matches && matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match}/>)
            }
        </div>
    );
}