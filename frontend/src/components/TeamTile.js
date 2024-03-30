import { Link } from 'react-router-dom';

import './TeamTile.scss';

export const TeamTile = ({teamName}) => {
    return (
        <div className="team-tile">
            <h1><Link to={`/teams/${teamName}`}>{teamName}</Link></h1>
        </div>
    );

}