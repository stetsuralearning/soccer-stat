import React from 'react'
import logo from './logo.svg'
import './App.css'
import Leagues from './components/Leagues/Leagues'
import Teams from './components/Teams/Teams'
import LeagueMatches from './components/Leagues/LeagueMatches/LeagueMatches'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import TeamMatches from './components/Teams/TeamMatches/TeamMatches'

export default function App() {
    const [activeTab, setActiveTab] = React.useState<'leagues' | 'teams'>(
        'leagues'
    )

    const leaguesTabClassName =
        activeTab === 'leagues' ? 'activeTab tab' : 'tab'

    const teamsTabClassName = activeTab === 'teams' ? 'activeTab tab' : 'tab'

    return (
        <BrowserRouter>
            <div className="container">
                <div className="headerContainer">
                    <img src={logo} className="logo" alt="logo" />
                    <Link to={`/`} className={leaguesTabClassName}>
                        <button
                            onClick={() => setActiveTab('leagues')}
                            className="button"
                        >
                            Лиги
                        </button>
                    </Link>
                    <Link to={`/teams`} className={teamsTabClassName}>
                        <button
                            onClick={() => setActiveTab('teams')}
                            className="button"
                        >
                            Команды
                        </button>
                    </Link>
                </div>

                <Routes>
                    <Route
                        path="/leagues/:leagueId/matches"
                        element={<LeagueMatches />}
                    />
                    <Route
                        path="/teams/:teamId/matches"
                        element={<TeamMatches />}
                    />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/" element={<Leagues />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
