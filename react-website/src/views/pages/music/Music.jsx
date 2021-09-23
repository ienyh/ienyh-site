import React, { useEffect } from 'react';
import './music.css';
import Audio from "../../../components/Audio/Audio";

const Music = () => {
  useEffect(() => {
    window.scrollTo(0, window.innerHeight - 60);
  }, []);

  return (
    <>
      <div className="container">
        {/* <div className="card">
          <audio loop controls>
            <source src="https://www.zhouxingxing.fun/music/1.mp3" />
          </audio>
        </div> */}

        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
        <div className="card" style={{ padding: "1rem", margin: "1rem 0"}}>123</div>
      </div>

      <Audio src="https://www.zhouxingxing.fun/music/1.mp3" autoplay></Audio>
    </>
  )
}

export default Music;