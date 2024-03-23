import { Link } from "react-router-dom";

function MatchDetailCard ({teamName, match}) {
    if(!match) return null;

    const otherTeam = match.team1 !== teamName ? match.team1 : match.team2;

    return(
        <div className="MatchDetailCard">
            <h3>Latest Matches</h3>
            <h1>Vs. <Link to={`/teams/${otherTeam}`}>{otherTeam}</Link></h1>
            <h2>{match.date}</h2>
            <h3>at {match.city}</h3>
            <h3>{match.matchWinner} won by {match.resultMargin} {match.result}</h3>

        </div>
    );
}

export default MatchDetailCard;