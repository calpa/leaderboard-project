import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { selectPlayers } from './selectors'
import LeaderboardComponent from '../../components/Leaderboard'
import Pagination from '../../components/Pagination'

import Player from '../../features/leaderboard/player'

function Leaderboard() {
    const [pageSize, setPageSize] = useState(10)
    const dispatch = useDispatch()

    const players : Player[] = useSelector(selectPlayers)

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return players.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, players]);

    useEffect(() => {
        dispatch({
          type: `leaderboard/startConnecting`
        })
      }, [dispatch])


      return (
        <div>
            <h1>Leaderboard</h1>
            <div>
              Items Per Page:
              <input onChange={(event) => setPageSize(event.currentTarget.value)} value={pageSize} min="1" />
            </div>
            <LeaderboardComponent players={currentTableData} />
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={players.length}
              pageSize={pageSize}
              onPageChange={page => setCurrentPage(page)}
            />
        </div>
      )
}

export default Leaderboard