import React, { useEffect, useState } from 'react';
import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png"
import thumbnail2 from "../../assets/thumbnail2.png"
import thumbnail3 from "../../assets/thumbnail3.png"
import thumbnail4 from "../../assets/thumbnail4.png"
import thumbnail5 from "../../assets/thumbnail5.png"
import thumbnail6 from "../../assets/thumbnail6.png"
import thumbnail7 from "../../assets/thumbnail7.png"
import thumbnail8 from "../../assets/thumbnail8.png"
import Card from './Card/Card';
import { apiKey, valueConverter } from '../../Data';
import moment from 'moment';

const Feed = ({category}) => {
    const [data , setData] = useState([])

    const fetchData = async () => {
        const videosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${apiKey}`;
        await fetch(videosUrl).then(resp => resp.json()).then(data => setData(data.items))
    }
    useEffect(()=>{
        fetchData()
    }, [category])
  return (
    <div className='feed'>
        {data.map((users, ind) => {
            return <Card key={users.id} videoId={users.id} categoryId={users.snippet.categoryId} title={users.snippet.title} time={moment(users.snippet.publishedAt).fromNow()} image={users.snippet.thumbnails.medium.url} views={valueConverter(users.statistics.viewCount)} name={users.snippet.channelTitle}/>
        })}
    </div>
  )
}

export default Feed