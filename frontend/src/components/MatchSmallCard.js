import { Link } from "react-router-dom";

import './MatchSmallCard.scss';

function MatchSmallCard({teamName, match}) {
    if(!match) return null;

    const isMatchWon = teamName === match.matchWinner;

    const otherTeam = match.team1 !== teamName ? match.team1 : match.team2;
    return(
        <div className={isMatchWon ? "MatchSmallCard won-card" : "MatchSmallCard lost-card"} >
            <span className="versus">Vs.</span>
            <h1><Link to={`/teams/${otherTeam}`}>{otherTeam}</Link></h1>
            <p className="match-result">{match.matchWinner} won by {match.resultMargin} {match.result}</p>
        </div>
    );
}

export default MatchSmallCard;