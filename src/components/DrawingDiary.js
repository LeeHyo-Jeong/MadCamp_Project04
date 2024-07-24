import React, { useState } from "react";
import "../addDiary.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Drawing from "./drawing";
import exit from "../images/exit.png";
import save from "../images/save.png";

const DrawingDiary = ({ gradient }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background || gradient;

  const handleSave = (imageData) => {
    setImage(imageData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    console.log("save image");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}:4000/diary`,
        { date, title, image, type: "image", background },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      //navigate("/diaries");
    } catch (error) {
      console.log(error);
      console.error("There was an error while saving the diary", error);
    }
  };

  return (
    <div className="diary-container" style={{ background: background }}>
      <img
        src={exit}
        alt="Back"
        className="icon-button back-button"
        onClick={() => navigate(`/belly`, { state: { fromOcean: false } })}
      />
      <form className="diary-form">
        <input
          type="date"
          placeholder="언제 꾼 꿈인가요?"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="diary-input"
        />
        <input
          type="text"
          placeholder="그날의 꿈에 제목을 지어준다면?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="diary-input"
        />
        <Drawing onSave={handleSave} />
        <img
          src={save}
          alt="Save"
          className="icon-button save-button"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default DrawingDiary;
