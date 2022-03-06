import React from 'react'
import './Leagues.css'
import LeagueCard from './LeagueCard/LeagueCard'
import axios from 'axios'
import Loading from '../common/Loading/Loading'
import Error from '../common/Error/Error'
import { Pagination } from '@mui/material'

const Leagues = () => {
    const [data, setData] = React.useState<Record<string, any>>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [pageIndex, setPageIndex] = React.useState<number>(0)

    React.useEffect(() => {
        setIsLoading(true)
        axios
            .get('http://api.football-data.org/v2/competitions/', {
                headers: { 'X-Auth-Token': process.env.REACT_APP_API_TOKEN! },
                withCredentials: false,
            })
            .then((response) => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
            })
    }, [])

    const PER_PAGE = 20

    const pages: string | any[] = []
    for (let i = 0; i < Math.ceil(data.competitions?.length / PER_PAGE); i++) {
        pages[i] = data.competitions.slice(
            i * PER_PAGE,
            i * PER_PAGE + PER_PAGE
        )
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageIndex(value - 1)
    }

    return isLoading ? (
        <Loading />
    ) : data.competitions ? (
        <div className="leaguesContainer">
            <div className="leagueCardsContainer">
                {pages[pageIndex].map((element: any) => {
                    return (
                        <LeagueCard
                            id={element.id}
                            key={element.id}
                            leagueCountry={element.area.name}
                            leagueName={element.name}
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

export default Leagues
