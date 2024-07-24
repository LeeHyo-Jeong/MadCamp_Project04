import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Diary.css";
import "../addDiary.css";
import exit from "../images/exit.png";

const Diary = ({ gradient }) => {
  const { type, id } = useParams();
  const [diary, setDiary] = useState(null);
  const navigate = useNavigate();

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
      } catch (error) {
        console.log(error);
        console.error();
      }
    };
    fetchDiary();
  }, [type, id]);

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
        onClick={() => navigate(`/belly`, { state: { fromOcean: false } })}
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
          <audio controls>
            <source
              src={`${process.env.REACT_APP_BASE_URL}/${diary.audio}`}
              type="audio/mp3"
            />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default Diary;
