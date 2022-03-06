import './LeagueCard.css'
import { Link } from 'react-router-dom'
import React from 'react'

interface LeagueCardProps {
    leagueName: string
    leagueCountry: string
    id: string
}

const LeagueCard = ({ leagueName, leagueCountry, id }: LeagueCardProps) => {
    return (
        <Link to={`/leagues/${id}/matches`} className="leagueCard">
            <b>{leagueName}</b>
            <div>{leagueCountry}</div>
        </Link>
    )
}

export default LeagueCard
