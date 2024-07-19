import { WaveGroup } from "./components/wavegroup";

// 캔버스 크기 설정, wave 애니메이션 루프 설정
export const setupWaveAnimation = (canvasRef, waveGroupRef) => {
  // canvasRef와 waveGroupRef를 이용해 캔버스와 파도 그룹 참조
  const canvas = canvasRef.current; // HTML5 Canvas 엘리먼트
  if (!canvas) {
    console.error("canvas is not defined");
    return;
  }

  const ctx = canvas.getContext("2d"); // HTML5 Canvas 요소에서 2D 그래픽을 그리기 위한 컨텍스트 객체
  if (!ctx) {
    console.error("2D context is not deifned");
    return;
  }

  console.log("canvas and context are valid");

  waveGroupRef.current = new WaveGroup();

  console.log("wavegroup created");

  const resize = () => {
    const stageWidth = document.body.clientWidth; // 브라우저 너비
    const stageHeight = document.body.clientHeight; // 브라우저 높이

    canvas.width = stageWidth * 2;
    canvas.height = stageHeight * 2;
    ctx.scale(2, 2); // 1픽셀당 2배의 해상도 사용

    console.log("canvas resized to: ", stageWidth, stageHeight);

    waveGroupRef.current.resize(stageWidth, stageHeight);

    console.log("WaveGroup resized");
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2); // 캔버스 초기화
    waveGroupRef.current.draw(ctx); // 파도를 그린다
    requestAnimationFrame(animate); // 다음 프레임에서 animate 함수 다시 호출
  };

  window.addEventListener("resize", resize); // 브라우저 창 크기 변경 시 resize 함수를 호출하도록 이벤트 리스너 설정
  resize(); // 초기 캔버스 크기 설정
  requestAnimationFrame(animate); // 애니메이션 루프 시작

  return () => window.removeEventListener("resize", resize); // 컴포넌트가 언마운트 될 때 resize 이벤트 리스너 제거
};
