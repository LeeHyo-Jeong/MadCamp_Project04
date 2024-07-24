import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login.css";
import axios from "axios";
import AddDiary from "./WriteDiary";

const Login = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isRegistring, setIsRegistring] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 현재는 더미 데이터 사용해서 접속
    if (userId === "admin" && password === "admin") {
      onLoginSuccess(); // 성공 시 콜백 호출
      setTimeout(() => {
        navigate("/ocean"); // 일정 시간 후 Ocean 페이지로 이동
      }, 1500); // 5초
      return;
    }

    // 로그인 로직 추가
    // db에 저장, 토큰 발급 등
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}:4000/auth/login`,
        {
          userId,
          password,
        }
      );
      // 서버로부터 발급 받은 토큰 저장
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      alert("로그인에 성공했습니다");
      onLoginSuccess(); // 성공 시 콜백 호출
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/ocean"); // 일정 시간 후 Ocean 페이지로 이동
      }, 1500); // 5초
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleRegister = async () => {
    // 회원가입 로직 추가
    // accessToken 발급

    // 현재는 더미 데이터 사용해서 접속
    if (userId === "admin" && password == "admin") {
      // 회원가입 후 진입할 페이지
      // navigate("");
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}:4000/auth/register`,
        {
          userId,
          password,
          nickname,
        }
      );
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      alert("환영합니다!");
      setUserId("");
      setPassword("");
      setIsRegistring(false);
    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }
  };

  const startRegistration = () => {
    if (userId && password) {
      setIsRegistring(true);
    } else {
      alert("아이디와 비밀번호를 입력하세요!");
    }
  };

  return (
    <div className="login-container">
      {!isRegistring ? (
        <>
          <input
            type="text"
            placeholder="아이디"
            className="login-input"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button className="login-button" onClick={handleLogin}>
              로그인
            </button>
            <button className="register-button" onClick={startRegistration}>
              회원가입
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="닉네임"
            className="login-input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button className="finish-button" onClick={handleRegister}>
            완료
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
