import './TeamCard.css'
import { Link } from 'react-router-dom'
import React from 'react'

interface TeamCardProps {
    name: string
    logoUrl: string
    id: string
}

const TeamCard = ({ name, logoUrl, id }: TeamCardProps) => {
    return (
        <Link to={`/teams/${id}/matches`} className="teamCard">
            <div>{name}</div>
            <img src={logoUrl} className="logo"></img>
        </Link>
    )
}

export default TeamCard
