import './TeamMatches.css'
import { Link, useParams } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import Loading from '../../common/Loading/Loading'
import MatchCard from '../../common/MatchCard/MatchCard'
import Error from '../../common/Error/Error'
import { Pagination } from '@mui/material'

const TeamMatches = () => {
    const params = useParams()
    const id = params.teamId!

    const [data, setData] = React.useState<Record<string, any>>([])
    const [teamName, setTeamName] = React.useState<string>()
    const [isLoading, setIsLoading] = React.useState(false)
    const [pageIndex, setPageIndex] = React.useState<number>(0)

    React.useEffect(() => {
        setIsLoading(true)

        axios
            .get(`http://api.football-data.org/v2/teams/${id}/matches`, {
                headers: { 'X-Auth-Token': process.env.REACT_APP_API_TOKEN! },
                withCredentials: false,
            })
            .then((response) => {
                setData(response.data)
            })
            .catch(() => {
                setIsLoading(false)
            })

        axios
            .get(`http://api.football-data.org/v2/teams/${id}`, {
                headers: { 'X-Auth-Token': process.env.REACT_APP_API_TOKEN! },
                withCredentials: false,
            })
            .then((response) => {
                setTeamName(response.data.name)
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
                <Link to={`/teams`} className="teamsBreadcrumb">
                    <div>??????????????</div>
                </Link>
                <div>{'>'}</div>
                <div>{teamName}</div>
            </div>
            <div className="matchesLabel">??????????</div>
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

export default TeamMatches
