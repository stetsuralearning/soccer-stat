import './MatchCard.css'
import React from 'react'

interface MatchCardProps {
    matchData: any
    isFirst: boolean
}

const MatchCard = ({ matchData, isFirst }: MatchCardProps) => {
    const isFullTime =
        matchData.score.fullTime.homeTeam !== null &&
        matchData.score.fullTime.awayTeam !== null
    const isExtraTime =
        matchData.score.extraTime.homeTeam !== null &&
        matchData.score.extraTime.awayTeam !== null
    const isPenalties =
        matchData.score.penalties.homeTeam !== null &&
        matchData.score.penalties.awayTeam !== null

    const fullTimeScore = `${matchData.score.fullTime.homeTeam} : ${matchData.score.fullTime.awayTeam}`
    const extraTimeScore = `(${matchData.score.extraTime.homeTeam} : ${matchData.score.extraTime.awayTeam})`
    const penaltiesScore = `(${matchData.score.penalties.homeTeam} : ${matchData.score.penalties.awayTeam})`

    const extraScore = `${extraTimeScore} ${penaltiesScore}`

    const matchDay = matchData.utcDate.slice(8, 10)
    const matchMonth = matchData.utcDate.slice(5, 7)
    const matchYear = matchData.utcDate.slice(0, 4)
    const matchDate = `${matchDay}.${matchMonth}.${matchYear}`

    const matchHours = matchData.utcDate.slice(11, 13)
    const matchMinutes = matchData.utcDate.slice(14, 16)
    const matchTime = `${matchHours}.${matchMinutes}`

    const matchContainerClassName = isFirst
        ? 'matchContainer'
        : 'notFirstMatch matchContainer'

    return matchData ? (
        <div className={matchContainerClassName}>
            <div className="matchDate">{matchDate}</div>
            <div className="matchTime">{matchTime}</div>
            <div className="matchStatus">{matchData.status}</div>
            <div className="homeTeamName">{matchData.homeTeam.name}</div>
            <div className="delimiter">-</div>
            <div className="awayTeamName">{matchData.awayTeam.name}</div>
            <div className="score">
                {isFullTime && <div>{fullTimeScore}</div>}
                {isExtraTime && isPenalties && (
                    <div className="extraTimeScore">{extraScore}</div>
                )}
            </div>
        </div>
    ) : (
        <div>Match data is empty</div>
    )
}

export default MatchCard
