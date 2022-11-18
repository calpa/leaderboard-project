import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { selectPlayers } from './selectors'
import LeaderboardComponent from '../../components/Leaderboard'

function Leaderboard() {
    const dispatch = useDispatch()

    const players = useSelector(selectPlayers)

    useEffect(() => {
        dispatch({
          type: `leaderboard/startConnecting`
        })
      }, [dispatch])


      return (
        <div>
            <h1>Leaderboard</h1>
            <LeaderboardComponent players={players} />

        </div>
      )
}

export default Leaderboard