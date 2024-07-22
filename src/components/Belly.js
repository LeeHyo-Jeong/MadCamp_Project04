import React, { useState } from 'react'
import '../Belly.css';

import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web'
import { useNavigate } from 'react-router-dom';

import data from './colordata'
import styles from '../boxes.module.css'

const Belly = () => {

  const [open, set] = useState(false);
  const navigate = useNavigate();

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'hotpink',
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

  const handleItemClick = (item) => {
    navigate('/add/1');
    // navigate(`/path-to-new-page/${item.id}`);
    // 위와 같은 식으루
    // 그라데이션마다 id 매겨서 배경 색깔 정해지게 하면 될듯.
  };

  return (
    <div className="inside-belly">
      <div className={styles.wrapper}>
        <div className='description'>오늘의 꿈에 어울리는 색상을 선택하세요</div>
        <animated.div
          style={{ ...rest, width: size, height: size }}
          className={styles.container}
          onClick={() => set(open => !open)}>
          {transition((style, item) => (
            <animated.div
              className={styles.item}
              style={{ ...style, background: item.css }}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default Belly;