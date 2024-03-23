import {useEffect, useState} from 'react';

import MatchDetailCard from '../components/MatchDetailCard';
import MatchSmallCard from '../components/MatchSmallCard';

function TeamPage() {
    const [team, setTeam] = useState({});

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch("http://localhost:8080/team/Mumbai Indians");
            const data = await response.json();
            
            setTeam(data);
        };

        fetchMatches();
    }, []);

    return(
        <div className="TeamPage">
            <h1>{team.teamName}</h1>
            {team.matches &&<MatchDetailCard match={team.matches[0]}/>}
            
            {team.matches && team.matches.slice(1).map((match) => (<MatchSmallCard key={match.id} match={match}/>))}
        </div>
    );
}

export default TeamPage;