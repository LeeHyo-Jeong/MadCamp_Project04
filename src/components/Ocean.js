import React, { useEffect, useState } from "react";
import "../Ocean.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import arrow_left from "../images/arrow_left.png";
import arrow_right from "../images/arrow_right.png";
import Fish from "./fishes";
import Jellyfish from "./jellyfish";
import Seaweed from "./seaweed";

const Ocean = () => {
  const [diaries, setDiaries] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaries = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}:4000/diary/month/${selectedYear}/${selectedMonth}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDiaries(response.data);
      } catch (error) {
        console.log(error);
        console.error("Error fetching diaries", error);
      }
    };

    fetchDiaries();
    console.log(diaries);
  }, [selectedMonth, selectedYear]);

  const handleNavigation = (id, type) => {
    navigate(`/diary/${type}/${id}`);
  };

  const renderDiariesByType = (type, Component) => {
    return diaries
      .filter((diary) => diary.type === type)
      .map((diary) => (
        <Component
          key={diary._id}
          onDoubleClick={() => handleNavigation(diary._id, type)}
          onContextMenu={(e) => {
            e.preventDefault();
            handleDelete(diary._id);
          }}
        />
      ));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    console.log(confirmed);
    if (confirmed) {
      const accessToken = localStorage.getItem("accessToken");
      try {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}:4000/diary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDiaries(diaries.filter((diary) => diary._id !== id));
        alert("삭제되었습니다.");
      } catch (error) {
        console.log(error);
        console.error("Error deleting diary", error);
      }
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handlePreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else setSelectedMonth(selectedMonth - 1);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else setSelectedMonth(selectedMonth + 1);
  };

  return (
    <div className="dream-sea">
      <header className="header">
        <button className="nav-button">
          <img src={arrow_left} alt="Left" onClick={handlePreviousMonth} />
        </button>
        <h1 className="title">
          {selectedYear}년 {selectedMonth}월의 꿈의 바다
        </h1>
        <button className="nav-button">
          <img src={arrow_right} alt="Right" onClick={handleNextMonth} />
        </button>
      </header>
      <main className="main-content">
        {renderDiariesByType("text", Jellyfish)}
      </main>

      <main className="main-content">{renderDiariesByType("image", Fish)}</main>

      <main className="main-content">
        {renderDiariesByType("audio", Seaweed)}
      </main>

      <footer className="footer">
        <button className="bottom-button" onClick={() => navigate(`/belly`)}>
          새로운 꿈을 꾸셨나요?
        </button>
      </footer>
    </div>
  );
};
//   return (
//     <div className="dream-sea">
//       <header className="header">
//         <button className="nav-button">
//           <img src={arrow_left} alt="Left" />
//         </button>
//         <h1 className="title">000님의 7월의 꿈의 바다</h1>
//         <button className="nav-button">
//           <img src={arrow_right} alt="Right" />
//         </button>
//       </header>

//       <main className="main-content">
//         <Jellyfish />
//         <Jellyfish />
//         <Jellyfish />
//       </main>

//       <main className="main-content">
//         <Fish />
//         <Fish />
//         <Fish />
//       </main>

//       <main className="main-content">
//         <Seaweed />
//         <Seaweed />
//         <Seaweed />
//       </main>

//       <footer className="footer">
//         <button className="bottom-button" onClick={() => navigate(`/belly`)}>
//           새로운 꿈을 꾸셨나요?
//         </button>
//       </footer>
//     </div>
//   );
// };

export default Ocean;
