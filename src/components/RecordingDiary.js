import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import lamejs from "lamejs";
import exit from "../images/exit.png";
import save from "../images/save.png";
import pause from "../images/pause.png";
import play from "../images/play.png";
import stop from "../images/stop.png";
import microphone from "../images/microphone.png";
import { useLocation, useNavigate } from "react-router-dom";
import "../record.css";
import MPEGMode from "lamejs/src/js/MPEGMode";
import Lame from "lamejs/src/js/Lame";
import BitStream from "lamejs/src/js/BitStream";

window.MPEGMode = MPEGMode;
window.Lame = Lame;
window.BitStream = BitStream;

const RecordingDiary = ({ gradient }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
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
    // 오디오 권한 요청
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioData = new Uint8Array(arrayBuffer);

      const mp3Blob = convertToMp3(audioData);
      const mp3URL = URL.createObjectURL(mp3Blob);
      console.log("MP3 URL", mp3URL);
      setAudioURL(mp3URL);
      audioChunksRef.current = [];
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);
    setIsPaused(false);
    setIsRecordingComplete(false);
    setRecordTime(0);
  };

  const handlePauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
    } else if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
    }
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setIsPaused(true);
      setIsRecordingComplete(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mp3Blob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
    const formData = new FormData();
    formData.append("audio", mp3Blob, "recording.mp3");
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
      console.log(error);
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

  const convertToMp3 = (audioData) => {
    const sampleRate = 44100;
    const channels = 1;
    const mp3Encoder = new lamejs.Mp3Encoder(channels, sampleRate, 128);
    const mp3Data = [];
    // Ensure the byte length of audioData.buffer is a multiple of 2
    let buffer = audioData.buffer;
    if (buffer.byteLength % 2 !== 0) {
      const tmp = new Uint8Array(buffer.byteLength + 1);
      tmp.set(new Uint8Array(buffer));
      buffer = tmp.buffer;
    }

    const samples = new Int16Array(buffer);

    const sampleBlockSize = 1152;
    for (let i = 0; i < samples.length; i += sampleBlockSize) {
      const sampleChunk = samples.subarray(i, i + sampleBlockSize);
      const mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }

    const mp3buf = mp3Encoder.flush();
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
    const mp3Blob = new Blob(mp3Data, { type: "audio/mp3" });
    console.log("MP3 Blob: ", mp3Blob); // 추가된 로깅

    return mp3Blob;
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
