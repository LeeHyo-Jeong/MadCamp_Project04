import React, { useState } from "react";
import "../addDiary.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import exit from "../images/exit.png";
import save from "../images/save.png";

const WriteDiary = ({ gradient }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const type = "text";
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background || gradient;

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    console.log("Date: ", date);
    console.log("Title: ", title);
    console.log("Contents: ", contents);

    const accessToken = localStorage.getItem("accessToken");

    console.log(accessToken);
    console.log(process.env.REACT_APP_BASE_URL);

    // db에 저장
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}:4000/diary`,
        { date, title, contents, type, background },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("멋진 꿈을 꿨군요!");

      // 일기 보여주는 곳으로 이동
      navigate("/");
    } catch (error) {
      console.error("There was an error while saving the diary", error);
    }

    // 홈 페이지 또는 일기 보는 페이지로 이동
  };

  return (
    <div className="diary-container" style={{ background: background }}>
      <img
        src={exit}
        alt="Back"
        className="icon-button back-button"
        onClick={() => navigate(-1)}
      />
      <form onSubmit={handleSubmit} className="diary-form">
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
        <textarea
          placeholder="꿈의 내용을 적어보아요 :)"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          className="diary-textarea"
        />
      </form>
      <img
        src={save}
        alt="Save"
        className="icon-button save-button"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default WriteDiary;
