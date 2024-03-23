function MatchDetailCard ({match}) {
    return(
        <div className="MatchDetailCard">
            <h3>Latest Matches</h3>
            <h4>Match Details</h4>
            <h4>{match.team1} vs. {match.team2}</h4>
        </div>
    );
}

export default MatchDetailCard;