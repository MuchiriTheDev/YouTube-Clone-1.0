import React, { useEffect, useState } from 'react';
import "./Recommend.css"
import SideVideos from './SideVideos/SideVideos';
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { apiKey, valueConverter } from '../../Data';

const Recommend = ({categoryId}) => {
  const [apidt , setApiData] =  useState([]);
  // GET 

  const fetdata = async() => {
    const relatedUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${apiKey}`
    const relateRes = await fetch(relatedUrl);
    const relatedDT = await relateRes.json()
    setApiData(relatedDT.items)
  }

  useEffect(()=>{
    fetdata()
  },[])
  return (
    <div className='recommend'>
      <h4>Others To watch</h4>
        {apidt.map((tn, ind)=> {
          return <SideVideos ind={ind} id={tn.id} categoryId={tn.snippet.categoryId} views={valueConverter(tn.statistics.viewCount)} name={tn.snippet.channelTitle} thumbnail={tn.snippet.thumbnails.medium.url} title={tn.snippet.title} />
        })}
    </div>
  )
}

export default Recommend