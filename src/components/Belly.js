import React, { useState } from "react";
import "../Belly.css";

import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
import { useNavigate } from "react-router-dom";

import data from "./colordata";
import styles from "../boxes.module.css";

const Belly = () => {
  const [open, set] = useState(false);
  const navigate = useNavigate();

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: "60%", background: "lightblue" },
    to: {
      size: open ? "70%" : "60%",
      background: open ? "white" : "lightblue",
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  // item의 속성에 따라서 배경 색이 변함
  const handleItemClick = (item, type) => {
    navigate(`/add/${type}`, { state: { background: item.css } });
  };

  // const handleItemClicktoWrite = (item) => {
  //   navigate(`/add/text/${item.name}`); //item의 속성에 따라서 배경색 변하게 수정 !!
  // };

  // const handleItemClicktoDraw = (item) => {
  //   navigate(`/add/draw/${item.name}`);
  // };

  // const handleItemClicktoRecord = (item) => {
  //   navigate(`/add/audio/${item.name}`);
  // };

  return (
    <div className="inside-belly">
      <div className={styles.wrapper}>
        <div className="description">꿈 적으러 가기</div>
        <animated.div
          style={{ ...rest, width: size, height: size }}
          className={`${styles.container} ${
            open ? styles["container-centered"] : ""
          }`}
          onClick={() => set((open) => !open)}
        >
          <div style={{ color: open ? "black" : "navy", fontSize: "24px" }}>
            {open ? "오늘의 꿈과 어울리는 색은?" : "글로 쓸래"}
          </div>
          {transition((style, item) => (
            <animated.div
              className={styles.item}
              style={{ ...style, background: item.css }}
              onClick={() => handleItemClick(item, "text")}
            />
          ))}
        </animated.div>

        <animated.div
          style={{ ...rest, width: size, height: size }}
          className={`${styles.container} ${
            open ? styles["container-centered"] : ""
          }`}
          onClick={() => set((open) => !open)}
        >
          <div style={{ color: open ? "black" : "navy", fontSize: "24px" }}>
            {open ? "오늘의 꿈과 어울리는 색은?" : "그림 그릴래"}
          </div>
          {transition((style, item) => (
            <animated.div
              className={styles.item}
              style={{ ...style, background: item.css }}
              onClick={() => handleItemClick(item, "draw")}
            />
          ))}
        </animated.div>
        <animated.div
          style={{ ...rest, width: size, height: size }}
          className={`${styles.container} ${
            open ? styles["container-centered"] : ""
          }`}
          onClick={() => set((open) => !open)}
        >
          <div style={{ color: open ? "black" : "navy", fontSize: "24px" }}>
            {open ? "오늘의 꿈과 어울리는 색은?" : "녹음 할래"}
          </div>
          {transition((style, item) => (
            <animated.div
              className={styles.item}
              style={{ ...style, background: item.css }}
              onClick={() => handleItemClick(item, "audio")}
            />
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default Belly;
