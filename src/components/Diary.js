import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Diary.css";
import "../addDiary.css";
import exit from "../images/exit.png";
import play from "../images/play.png";
import headphone from "../images/headphone.png";
import mic from "../images/mic.jpg";

const Diary = ({ gradient }) => {
  const { type, id } = useParams();
  const [diary, setDiary] = useState(null);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchDiary = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}:4000/diary/${type}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDiary(response.data);
        if (response.data.audio) {
          const audio = new Audio(
            `${process.env.REACT_APP_BASE_URL}/${response.data.audio}`
          );
          audioRef.current = audio;
        }
      } catch (error) {
        console.log(error);
        console.error();
      }
    };
    fetchDiary();
  }, [type, id]);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Audio play error: ", error);
      });
    }
  };

  if (!diary) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="diary-container"
      style={{ background: diary.background || gradient }}
    >
      <img
        src={exit}
        alt="Back"
        className="icon-button back-button"
        onClick={() => navigate(-1)}
      />
      <div className="diary-title-container">
        <h1>{diary.title}</h1>
      </div>
      <div className="diary-date-container">
        <p>{diary.date}</p>
      </div>
      <div className="diary-content-container">
        {type === "text" && <p>{diary.contents}</p>}
        {type === "image" && diary.image && (
          <img
            src={
              diary.image.startsWith("data:image/")
                ? diary.image
                : `${process.env.REACT_APP_BASE_URL}/${diary.image}`
            }
            alt="Diary"
          />
        )}
        {type === "audio" && diary.audio && (
          <div className="audio-container">
            <img
              src={mic}
              alt="Mic"
              className="play-button"
              onClick={handlePlayAudio}
            />
            <div className="audio-text">그 날의 기록을 들어보아요 :)</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diary;
