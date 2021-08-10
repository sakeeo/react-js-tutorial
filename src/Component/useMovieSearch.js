import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMovieSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [movies, setMovies] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setMovies([])
  }, [query])

  useEffect(() => {
    if(query.length > 2){
        setLoading(true)
        setError(false)
        let cancel
        axios({
          method: 'GET',
          url: 'http://www.omdbapi.com?apikey=faf7e5bb',
          params: { s: query, page: pageNumber },
          cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
          setMovies(prevMovies => {
            return [...new Set([...prevMovies, ...res.data.Search.map(b => b.Title)])]
          })
          setHasMore(res.data.Search.length > 0)
          setLoading(false)
        }).catch(e => {
          if (axios.isCancel(e)) return
          setError(true)
        })
        return () => cancel()
      }
    }, [query, pageNumber])
  return { loading, error, movies, hasMore }
}
