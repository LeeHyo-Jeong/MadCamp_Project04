import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직 추가
    // db에 저장, 토큰 발급 등

    // 현재는 더미 데이터 사용해서 접속
    if (userId == "admin" && password == "admin") {
      // 로그인 후 진입할 페이지
      // navigate("");
    } else {
      alert("아이디와 비밀번호를 입력하세요");
    }
  };

  const handleRegister = () => {
    // 회원가입 로직 추가
    // accessToken 발급

    // 현재는 더미 데이터 사용해서 접속
    if (userId == "admin" && password == "admin") {
      // 회원가입 후 진입할 페이지
      // navigate("");
    } else {
      alert("아이디와 비밀번호를 입력하세요");
    }
  };

  return (
    <div className="login-container">
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
        <button className="register-button" onClick={handleRegister}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
