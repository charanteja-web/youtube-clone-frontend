import './Playvideo.css'
import video1 from '../../assets/chinni_gundelo.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import profile from '../../assets/profile.png'
import { useEffect, useState } from 'react'
import { API_KEY,value_converter} from '../../data'
import moment from 'moment';
import { useParams } from 'react-router-dom'
const Playvideo=()=>{

    const{videoId}=useParams();

   const [apiData, setApiData] = useState(null);
   const [channelData,setChannelData]=useState(null);
   const [commentData,setCommentData]=useState([]);

const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(videoDetails_url);
    const data = await res.json();
    setApiData(data.items?.[0] || null);
};

const fetchOtherData=async(channelId)=>{
    const channelData_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`
    const res=await fetch(channelData_url);
    const data=await res.json();
    setChannelData(data.items?.[0]||null);

    const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
    const res1=await fetch(comment_url);
    const data1=await res1.json();
    setCommentData(data1.items||[]);

};

useEffect(() => {
     fetchVideoData();
}, [videoId]);

useEffect(() => {
  if (apiData?.snippet?.channelId) {
    fetchOtherData(apiData.snippet.channelId);
  }
}, [apiData]);


    return(
        <div className='play-video'>
            {/*<video src={video1} controls autoPlay />*/}
            <iframe
  key={videoId}
  src={`https://www.youtube.com/embed/${videoId}`}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

            <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
            <div className='play-video-info'>
                <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"} views&bull;{apiData?moment(apiData?.snippet?.publishedAt).fromNow():""}</p>
                <div>
                    <span><img src={like}/>{apiData?value_converter(apiData.statistics.likeCount):""}</span>
                    <span><img src={dislike}/>2</span>
                    <span><img src={share}/>Share</span>
                    <span><img src={save}/>Save</span>
                </div>
            </div>
            <hr/>
            <div className='publisher'>
                <img src={channelData?.snippet?.thumbnails?.default?.url} alt=""/>
                <div>
                    <p>{apiData?apiData.snippet.channelTitle:"Title here"}</p>
                    <span>{channelData?value_converter(channelData.statistics.subscriberCount):""} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className='video-description'>
                <p>{apiData?apiData.snippet.description.slice(0,250):""}</p>
                <hr/>
                <h4>{apiData?value_converter(apiData.statistics.commentCount):1000}Comments</h4>
                {commentData.map((item,index)=>{
                    return(
                        <div key={index} className='comment'>
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=""/>
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className='comment-action'>
                            <img src={like}/>
                            <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                            <img src={dislike}/>

                        </div>
                    </div>
                </div>
                    )
                })}
                
            </div>
        </div>
    )
}

export default Playvideo