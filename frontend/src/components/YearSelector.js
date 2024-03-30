import { Link } from "react-router-dom";

import './YearSelector.scss';

export const YearSelector = ({teamName}) => {

    let years = [];
    const startYear = process.env.REACT_APP_DATA_START_YEAR;
    const endYear = process.env.REACT_APP_DATA_END_YEAR;

    for(let i=endYear; i>=startYear; i--) {
        years.push(i);
    }

    return (
        <ol className="years-list">
            {years.map(year => <li><Link to={`/teams/${teamName}/matches/${year}`}>{year}</Link></li>)}
        </ol>
    );
}