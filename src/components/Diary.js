import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Diary.css";
import "../addDiary.css";
import exit from "../images/exit.png";
import edit from "../images/edit.png";
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
          const audioURL = `${process.env.REACT_APP_BASE_URL}:4000/${response.data.audio}`;
          audioRef.current = new Audio(audioURL);
          setDiary((prevDiary) => ({
            ...prevDiary,
            audioURL,
          }));
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
        onClick={() => navigate(`/ocean`)}
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
                : `${process.env.REACT_APP_BASE_URL}:4000/${diary.image}`
            }
            alt="Diary"
          />
        )}
        {type === "audio" && diary.audio && (
          <div className="audio-container">
            <img src={mic} alt="Mic" className="play-button" />
            <div className="audio-text">그 날의 기록을 들어보아요 :)</div>
            {diary.audioURL && (
              <audio className="audio" controls src={diary.audioURL}>
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        )}
      </div>
      <img
        src={edit}
        alt="Edit"
        className="icon-button save-button"
        onClick={() => navigate(`/edit-diary/${type}/${id}`)}
      />
    </div>
  );
};

export default Diary;
