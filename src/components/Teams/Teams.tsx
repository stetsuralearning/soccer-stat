import './Teams.css'
import TeamCard from './TeamCard/TeamCard'
import React from 'react'
import axios from 'axios'
import Loading from '../common/Loading/Loading'
import Error from '../common/Error/Error'
import { Pagination } from '@mui/material'

const Teams = () => {
    const [data, setData] = React.useState<Record<string, any>>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [pageIndex, setPageIndex] = React.useState<number>(0)

    React.useEffect(() => {
        setIsLoading(true)
        axios
            .get('https://api.football-data.org/v2/teams', {
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

    const PER_PAGE = 16

    const pages: string | any[] = []
    for (let i = 0; i < Math.ceil(data.teams?.length / PER_PAGE); i++) {
        pages[i] = data.teams.slice(i * PER_PAGE, i * PER_PAGE + PER_PAGE)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageIndex(value - 1)
    }

    return isLoading ? (
        <Loading />
    ) : data.teams ? (
        <div className="teamsContainer">
            <div className="teamCardsContainer">
                {pages[pageIndex].map((element: any) => {
                    return (
                        <TeamCard
                            key={element.id}
                            logoUrl={element.crestUrl}
                            name={element.name}
                            id={element.id}
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

export default Teams
