import './Recommended.css'
import { useEffect, useState } from 'react'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchdata = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=10&key=${API_KEY}`;
    const res = await fetch(relatedVideo_url);
    const data = await res.json();
    setApiData(data.items || []);
  };

  useEffect(() => {
    if (categoryId !== undefined) {
      fetchdata();
    }
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item) => (
        <Link
          key={item.id}
          to={`/video/${categoryId}/${item.id}`}
          className="side-video-list"
        >
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
