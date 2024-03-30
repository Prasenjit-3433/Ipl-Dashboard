import { useEffect, useState } from "react"

import { TeamTile } from "../components/TeamTile";
import './HomePage.scss';

export const HomePage = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchAllTeams = async () => {
            const response = await fetch(`http://localhost:8080/team`);
            const data = await response.json();
            setTeams(data);
        };

        fetchAllTeams();
    }, []);

    return (
        <div className="home-page">
            <div className="header-section">
                <h1 className="app-name">IPL DashBoard</h1>
            </div>

            <div className="team-grid">
                {teams && teams.map(team => <TeamTile key={team.id} teamName={team.teamName} />)}
            </div>
        </div>
    );
}