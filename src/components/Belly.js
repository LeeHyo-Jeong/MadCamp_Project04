import React, { useState, useEffect } from "react";
import "../Belly.css";

import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
import { useLocation, useNavigate } from "react-router-dom";

import data from "./colordata";
import styles from "../boxes.module.css";

const Belly = () => {

  const [openWrite, setOpenWrite] = useState(false);
  const [openDraw, setOpenDraw] = useState(false);
  const [openRecord, setOpenRecord] = useState(false);
  //입 여는 거
  const [animateOpen, setAnimateOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state.fromOcean) {
      setAnimateOpen(true);
      setTimeout(() => {
        setAnimateOpen(false);
      }, 1100); // Match the duration of the animation
    } else {
      setAnimateOpen(false); // Ensure animateOpen is false for non-Ocean navigations
    }
  }, [location.state]);

  const springApiWrite = useSpringRef();
  const { size: sizeWrite, ...restWrite } = useSpring({
    ref: springApiWrite,
    config: config.stiff,
    from: { size: "60%", background: "lightblue" },
    to: {
      size: openWrite ? '70%' : '60%',
      background: openWrite ? 'white' : 'lightblue',
    },
  });

  const springApiDraw = useSpringRef();
  const { size: sizeDraw, ...restDraw } = useSpring({
    ref: springApiDraw,
    config: config.stiff,
    from: { size: '60%', background: 'lightblue' },
    to: {
      size: openDraw ? '70%' : '60%',
      background: openDraw ? 'white' : 'lightblue',
    },
  });

  const springApiRecord = useSpringRef();
  const { size: sizeRecord, ...restRecord } = useSpring({
    ref: springApiRecord,
    config: config.stiff,
    from: { size: '60%', background: 'lightblue' },
    to: {
      size: openRecord ? '70%' : '60%',
      background: openRecord ? 'white' : 'lightblue',
    },
  });

  const transApiWrite = useSpringRef();
  const transitionWrite = useTransition(openWrite ? data : [], {
    ref: transApiWrite,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  const transApiDraw = useSpringRef();
  const transitionDraw = useTransition(openDraw ? data : [], {
    ref: transApiDraw,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  const transApiRecord = useSpringRef();
  const transitionRecord = useTransition(openRecord ? data : [], {
    ref: transApiRecord,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  useChain(openWrite ? [springApiWrite, transApiWrite] : [transApiWrite, springApiWrite], [
    0,
    openWrite ? 0.1 : 0.6,
  ]);

  useChain(openDraw ? [springApiDraw, transApiDraw] : [transApiDraw, springApiDraw], [
    0,
    openDraw ? 0.1 : 0.6,
  ]);

  useChain(openRecord ? [springApiRecord, transApiRecord] : [transApiRecord, springApiRecord], [
    0,
    openRecord ? 0.1 : 0.6,
  ]);

  const handleItemClicktoWrite = (item) => {
    navigate(`/add/text`, {state: { background: item.css }});
  };

  const handleItemClicktoDraw = (item) => {
    navigate(`/add/draw`, {state: { background: item.css }});
  };

  const handleItemClicktoRecord = (item) => {
    navigate(`/add/audio`, {state: { background: item.css }});
  };

  return (
    <div className="inside-belly">
      {animateOpen && (
        <div className="mouth-animation">
          <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
            <defs>
              <clipPath id="clip">
                <path className="upper-lip-open" d="M0,50 C100,50 300,50 400,50" />
                <path className="lower-lip-open" d="M0,50 C100,50 300,50 400,50" />
              </clipPath>
              <mask id="mask">
                <rect width="100%" height="100%" fill="white" />
                <rect width="100%" height="100%" fill="black" clipPath="url(#clip)" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="transparent" />
            <rect width="100%" height="100%" fill="rgba(0,0,128, 0.8)" mask="url(#mask)" />
            <path className="upper-lip-open" d="M0,50 C100,50 300,50 400,50" />
            <path className="lower-lip-open" d="M0,50 C100,50 300,50 400,50" />
          </svg>
        </div>
      )}

      {!animateOpen && (
        <div className={styles.wrapper}>
        <div className='description'>꿈 적으러 가기</div>

        <animated.div
          style={{ ...restWrite, width: sizeWrite, height: sizeWrite }}
          className={`${styles.container} ${openWrite ? styles['container-centered'] : ''}`}
          onClick={() => setOpenWrite(open => !open)}>
          <div style={{ color: openWrite ? 'black' : 'navy', fontSize: '24px' }}>
            {openWrite ? '오늘의 꿈과 어울리는 색은?' : '글로 쓸래'}
          </div>
          {transitionWrite((style, item) => (
            <animated.div
              className={styles.item}
              style={{ ...style, background: item.css }}
              onClick={() => handleItemClicktoWrite(item)}
            />
          ))}
        </animated.div>

        <animated.div
          style={{ ...restDraw, width: sizeDraw, height: sizeDraw }}
          className={`${styles.container} ${openDraw ? styles['container-centered'] : ''}`}
          onClick={() => setOpenDraw(open => !open)}>
          <div style={{ color: openDraw ? 'black' : 'navy', fontSize: '24px' }}>
            {openDraw ? '오늘의 꿈과 어울리는 색은?' : '그림 그릴래'}
          </div>
          {transitionDraw((style, item) => (
            <animated.div
              className={styles.item}
              style={{ ...style, background: item.css }}
              onClick={() => handleItemClicktoDraw(item)}
            />
          ))}
        </animated.div>
        <animated.div
          style={{ ...restRecord, width: sizeRecord, height: sizeRecord }}
          className={`${styles.container} ${openRecord ? styles['container-centered'] : ''}`}
          onClick={() => setOpenRecord(open => !open)}>
          <div style={{ color: openRecord ? 'black' : 'navy', fontSize: '24px' }}>
            {openRecord ? '오늘의 꿈과 어울리는 색은?' : '녹음 할래'}
          </div>
          {transitionRecord((style, item) => (
            <animated.div
              className={styles.item}
              style={{ ...style, background: item.css }}
              onClick={() => handleItemClicktoRecord(item)}
            />
          ))}
        </animated.div>
      </div>


      )}
    </div>
  );
};

export default Belly;
