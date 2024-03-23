import { Link } from "react-router-dom";

function MatchSmallCard({teamName, match}) {
    if(!match) return null;

    const otherTeam = match.team1 !== teamName ? match.team1 : match.team2;
    return(
        <div className="MatchSmallCard">
            <h3>Vs. <Link to={`/teams/${otherTeam}`}>{otherTeam}</Link></h3>
            <p>{match.matchWinner} won by {match.resultMargin} {match.result}</p>
        </div>
    );
}

export default MatchSmallCard;