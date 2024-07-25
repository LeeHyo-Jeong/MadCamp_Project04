import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import exit from "../images/exit.png";
import save from "../images/save.png";
import pause from "../images/pause.png";
import play from "../images/play.png";
import stop from "../images/stop.png";
import microphone from "../images/microphone.png";
import Drawing from "./drawing";
import "../addDiary.css";
import "../record.css";
import RecordRTC from "recordrtc";

const EditDiary = ({ gradient }) => {
  const { type, id } = useParams(); // 다이어리 종류와 아이디
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [background, setBackground] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const recorderRef = useRef(null);
  const intervalRef = useRef(null);
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
        const diary = response.data;
        setDate(diary.date);
        setTitle(diary.title);
        setContents(diary.contents || ""); // contents가 없는 경우 빈 문자열로 설정
        setBackground(diary.background);
        if (diary.audio) {
          setAudioURL(`${process.env.REACT_APP_BASE_URL}:4000/${diary.audio}`);
        }
        if (diary.image) {
          setImageURL(`${process.env.REACT_APP_BASE_URL}:4000/${diary.image}`);
        }
      } catch (error) {
        console.log(error);
        console.error();
      }
    };
    fetchDiary();
  }, [type, id]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSaveDrawing = (imageData) => {
    setImageFile(imageData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("date", date);
    formData.append("title", title);
    formData.append("type", type);
    formData.append("background", background);

    switch (type) {
      case "text":
        formData.append("contents", contents);
        break;
      case "audio":
        if (audioFile) formData.append("audio", audioFile);
        break;
      case "image":
        if (imageFile) formData.append("image", imageFile);
        break;
      default:
        break;
    }

    const accessToken = localStorage.getItem("accessToken");

    console.log(process.env.REACT_APP_BASE_URL);
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}:4000/diary/${type}/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("다이어리가 성공적으로 수정되었습니다!");
      navigate(`/diary/${type}/${id}`);
    } catch (error) {
      console.error("Error while editing diary", error);
    }
  };

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
    intervalRef.current = setInterval(() => {
      setRecordTime((prevTime) => prevTime + 0.1);
    }, 100);
  };

  const handlePauseRecording = () => {
    if (recorderRef.current) {
      if (!isPaused) {
        recorderRef.current.pauseRecording();
        clearInterval(intervalRef.current);
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
        setAudioFile(audioBlob);
        setRecording(false);
        setIsPaused(false);
        setIsRecordingComplete(true);
        clearInterval(intervalRef.current);
      });
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
    <div
      className="diary-container"
      style={{ background: background || gradient }}
    >
      <img
        src={exit}
        alt="Back"
        className="icon-button back-button"
        onClick={() => navigate(-1)}
      />
      <form onSubmit={handleSubmit} className="diary-form">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="diary-input"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="diary-input"
        />
        {type === "text" && (
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="diary-textarea"
          />
        )}
        {type === "image" && (
          <div>
            <Drawing onSave={handleSaveDrawing} />
          </div>
        )}
        {type === "audio" && (
          <div className="diary-record">
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
            {audioURL && (
              <audio className="audio" controls src={audioURL}></audio>
            )}
          </div>
        )}
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

export default EditDiary;
