import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Search.css";

const Search = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  const fetchSearchResults = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${query}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setResults(data.items || []);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-page">
      {results.map((item) => (
        <Link
          key={item.id.videoId}
          to={`/video/${item.snippet.categoryId || 0}/${item.id.videoId}`}
          className="search-card"
        >
          <img src={item.snippet.thumbnails.medium.url} />
          <div>
            <h3>{item.snippet.title}</h3>
            <p>{item.snippet.channelTitle}</p>
            <p>{moment(item.snippet.publishedAt).fromNow()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Search;
