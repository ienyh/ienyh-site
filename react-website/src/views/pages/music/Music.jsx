import React, { useEffect, useState } from 'react';
import './music.css';
import Audio from "../../../components/audio/Audio";

const tmp = [
  { name: '我太笨', singer: '锤娜丽莎', src: 'https://www.zhouxingxing.fun/music/1.mp3' },
  { name: 'Walk on Water', singer: '邓紫棋', src: 'https://www.zhouxingxing.fun/music/2.mp3' },
  { name: '谢谢对不起', singer: '许靖韵', src: 'https://www.zhouxingxing.fun/music/3.mp3' },
  { name: 'Entertainer', singer: 'ZAYN', src: 'https://www.zhouxingxing.fun/music/4.mp3' },
  { name: 'WITHOUT YOU', singer: 'The Kid LAROI', src: 'https://www.zhouxingxing.fun/music/5.mp3' },
  { name: '年少的欢喜', singer: '张特星', src: 'https://www.zhouxingxing.fun/music/6.mp3' },
  { name: '开始', singer: 'Gaho', src: 'https://www.zhouxingxing.fun/music/7.mp3' },
]

const Music = () => {
  const [current, setCurrent] = useState({});

  useEffect(() => {
    window.scrollTo(0, window.innerHeight - 60);
  }, []);

  return (
    <>
      <div className="container">
        <div className="music-top" style={{ padding: "1rem", margin: "1rem 0" }}>
          <div className="card music-top-left">
            {
              tmp.map(item => {
                return <div className="music-item" key={item.src} onClick={() => setCurrent(item)}>
                  {item.name} - {item.singer}
                </div>
              })
            }
          </div>
          <div className="card music-top-right">
            { current.src }
          </div>
        </div>
      </div>

      <Audio {...current} autoplay></Audio>
    </>
  )
}

export default Music;