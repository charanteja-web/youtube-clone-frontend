import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import { useEffect, useState, useCallback } from 'react'
import moment from 'moment'

const Feed = ({ category }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageToken, setPageToken] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)

    try {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=12&regionCode=US&videoCategoryId=${category}&pageToken=${pageToken || ""}&key=${API_KEY}`

      const res = await fetch(url)
      const json = await res.json()

      setData(prev => [...prev, ...(json.items || [])])
      setPageToken(json.nextPageToken || null)
      setHasMore(!!json.nextPageToken)
    } catch (error) {
      console.error("Error fetching videos:", error)
    }

    setLoading(false)
  }, [category, pageToken, loading, hasMore])

  // Reset when category changes
  useEffect(() => {
    setData([])
    setPageToken(null)
    setHasMore(true)
  }, [category])

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        fetchData()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [fetchData])

  return (
    <div className="feed">
      {data.map(item => (
        <Link
          key={item.id}
          to={`video/${item.snippet.categoryId}/${item.id}`}
          className="card"
        >
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {value_converter(item.statistics.viewCount)} views •{" "}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}

      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading more videos...
        </p>
      )}
    </div>
  )
}

export default Feed
