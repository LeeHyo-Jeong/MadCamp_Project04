import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import RecordRTC from "recordrtc";
import exit from "../images/exit.png";
import save from "../images/save.png";
import pause from "../images/pause.png";
import play from "../images/play.png";
import stop from "../images/stop.png";
import microphone from "../images/microphone.png";
import { useLocation, useNavigate } from "react-router-dom";
import "../record.css";

const RecordingDiary = ({ gradient }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const recorderRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    if (recording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordTime((prevTime) => prevTime + 0.1);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [recording, isPaused]);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new RecordRTC(stream, {
      type: "audio",
      mimeType: "audio/mp3",
      recorderType: RecordRTC.StereoAudioRecorder,
      desiredSampRate: 16000,
    });

    recorder.startRecording();
    recorderRef.current = recorder;
    setRecording(true);
    setIsPaused(false);
    setIsRecordingComplete(false);
    setRecordTime(0);
  };

  const handlePauseRecording = () => {
    if (recorderRef.current) {
      if (!isPaused) {
        recorderRef.current.pauseRecording();
      } else {
        recorderRef.current.resumeRecording();
      }
      setIsPaused(!isPaused);
    }
  };

  const handleStopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const audioBlob = recorderRef.current.getBlob();
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
        setRecording(false);
        setIsPaused(false);
        setIsRecordingComplete(true);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("audio", recorderRef.current.getBlob(), "recording.mp3");
    formData.append("date", date);
    formData.append("title", title);
    formData.append("type", "audio");
    formData.append("background", background);

    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}:4000/diary`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("멋진 꿈을 꾸었군요!");
      navigate("/ocean");
    } catch (error) {
      console.error("There was an error while saving the audio diary", error);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = (time % 1).toFixed(1).substring(2);

    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="diary-container" style={{ background: background }}>
      <img
        src={exit}
        alt="Back"
        className="icon-button back-button"
        onClick={() => navigate(`/belly`, { state: { fromOcean: false } })}
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
      </form>
      <div className="diary-record-container">
        <img src={microphone} alt="Record" />
        <div className="record-timer">{formatTime(recordTime)}</div>
        <div className="record-buttons">
          <img
            className="record-button"
            src={play}
            alt="Record"
            onClick={handleStartRecording}
            disabled={recording}
          />
          <img
            className="record-button"
            src={pause}
            alt="Pause"
            onClick={handlePauseRecording}
            disabled={!recording}
          />
          <img
            className="stop-button"
            onClick={handleStopRecording}
            src={stop}
            alt="Stop"
          />
        </div>
        {audioURL && <audio className="audio" controls src={audioURL}></audio>}
      </div>
      <img
        src={save}
        alt="Save"
        className="icon-button save-button"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default RecordingDiary;
