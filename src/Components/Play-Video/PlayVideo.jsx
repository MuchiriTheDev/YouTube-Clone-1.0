import React, { useEffect, useState } from 'react';
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import jack from "../../assets/jack.png";
import userProfile from "../../assets/user_profile.jpg";
import { apiKey, valueConverter } from '../../Data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apidata, setApidata] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [count, setCount] = useState(true);
  const [words, setWords] = useState(200);

  const fetchVideoData = async () => {
    const videourl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`;
    const response = await fetch(videourl);
    const results = await response.json();
    setApidata(results.items[0]);
  };

  const fetchOtherData = async () => {
    if (apidata) {
      const channelUrl =` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${apiKey}`;
      const channelResponse = await fetch(channelUrl);
      const channelOutput = await channelResponse.json();
      setChannelData(channelOutput.items[0]);

      const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${apiKey}`
      const commentResponse = await fetch(commentUrl);
      const commentOutput = await commentResponse.json();
      setCommentData(commentOutput.items);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apidata]);

  const showMore = () => {
    setCount(!count);
    setWords(count ? 1000 : 250);
  };

  return (
    <div className='play-video'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apidata ? apidata.snippet.title : "Title here"}</h3>
      <div className="play-video-info">
        <p>{apidata ? valueConverter(apidata.statistics.viewCount) : "0"} Views &bull; {apidata ? moment(apidata.snippet.publishedAt).fromNow() : "0"}</p>
        <div>
          <span>
            <img src={like} alt="" />
            {apidata ? valueConverter(apidata.statistics.likeCount) : "0"}
          </span>
          <span>
            <img src={dislike} alt="" />
            {apidata ? valueConverter(apidata.statistics.dislikeCount) : "0"}
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : userProfile} alt="" />
        <div>
          <p>{apidata ? apidata.snippet.channelTitle : "Channel Name"}</p>
          <span>{channelData ? valueConverter(channelData.statistics.subscriberCount) : "0"} subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apidata ? apidata.snippet.description.slice(0, words) : ""}</p>
        <button onClick={showMore}>{count ? "..." : "Show Less"}</button>
        <hr />
        <h4>{apidata ? valueConverter(apidata.statistics.commentCount) : "0"} comments</h4>
        {commentData && commentData.map((user, ind) => (
          <div key={ind} className="comment">
            <img src={user.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div>
              <h3>{user.snippet.topLevelComment.snippet.authorDisplayName}<span>3 days ago</span></h3>
              <p>{user.snippet.topLevelComment.snippet.textDisplay}
                </p>
              <div className='comment-action'>
                <img src={like} alt="" />
                <span>{valueConverter(user.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="" />
                <span>{valueConverter(user.snippet.topLevelComment.snippet.dislikeCount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;