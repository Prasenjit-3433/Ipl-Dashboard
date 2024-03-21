import MatchDetailCard from '../components/MatchDetailCard';
import MatchSmallCard from '../components/MatchSmallCard';

function TeamPage() {
    return(
        <div className="TeamPage">
            <h1>Team Name</h1>
            <MatchDetailCard/>

            <MatchSmallCard/>
            <MatchSmallCard/>
            <MatchSmallCard/>
        </div>
    );
}

export default TeamPage;