import './LeagueMatches.css'
import MatchCard from '../../common/MatchCard/MatchCard'
import { Link, useParams } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import Loading from '../../common/Loading/Loading'
import Error from '../../common/Error/Error'
import { Pagination } from '@mui/material'

const LeagueMatches = () => {
    const params = useParams()
    const id = params.leagueId!

    const [data, setData] = React.useState<Record<string, any>>([])
    const [leagueName, setLeagueName] = React.useState<string>()
    const [isLoading, setIsLoading] = React.useState(false)
    const [pageIndex, setPageIndex] = React.useState<number>(0)

    React.useEffect(() => {
        setIsLoading(true)

        axios
            .get(`http://api.football-data.org/v2/competitions/${id}/matches`, {
                headers: { 'X-Auth-Token': process.env.REACT_APP_API_TOKEN! },
                withCredentials: false,
            })
            .then((response) => {
                setData(response.data)
                setLeagueName(response.data.competition.name)
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
            })
    }, [])

    const PER_PAGE = 7

    const pages: string | any[] = []
    for (let i = 0; i < Math.ceil(data.matches?.length / PER_PAGE); i++) {
        pages[i] = data.matches.slice(i * PER_PAGE, i * PER_PAGE + PER_PAGE)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageIndex(value - 1)
    }

    return isLoading ? (
        <Loading />
    ) : data.matches ? (
        <div className="matchesContainer">
            <div className="breadcrumbs">
                <Link to={`/`} className="leaguesBreadcrumb">
                    <div>Лиги</div>
                </Link>
                <div>{'>'}</div>
                <div>{leagueName}</div>
            </div>
            <div className="matchesLabel">Матчи</div>
            <div className="matchesTable">
                {pages[pageIndex].map((element: any) => {
                    return (
                        <MatchCard
                            key={element.id}
                            matchData={element}
                            isFirst={
                                element.id ===
                                data.matches[pageIndex * PER_PAGE].id
                            }
                        />
                    )
                })}
            </div>
            <div className="pagination">
                <Pagination
                    count={pages.length}
                    page={pageIndex + 1}
                    onChange={handleChange}
                />
            </div>
        </div>
    ) : (
        <Error />
    )
}

export default LeagueMatches
