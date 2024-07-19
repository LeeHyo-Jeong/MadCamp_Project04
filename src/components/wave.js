import { Point } from "./point";

export class Wave {
  constructor(index, totalPoints, color) {
    this.index = index; // 파도 인덱스
    this.totalPoints = totalPoints; // 점의 개수
    this.color = color; // 파도 색상
    this.points = [];
  }

  // 캔버스 크기에 맞게 파도 크기 조정
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth; // 캔버스 너비
    this.stageHeight = stageHeight; // 캔버스 높이
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 6;
    this.pointGap = this.stageWidth / (this.totalPoints - 1); // 각 점 사이 간격
    this.init();
  }

  // 점들 초기화
  init() {
    //console.log("Initializing points array");
    this.points = [];
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.index + i, this.pointGap * i, this.centerY);
      //console.log("Point initialized:", point);
      this.points.push(point);
    }
    //console.log("Points initialized:", this.points);
  }

  // 파도 그리기
  draw(ctx) {
    //console.log("Drawing wave:", this.points);
    if (!this.points || this.points.length === 0) {
      //console.error("Points array is empty or undefined", this.points);
      return;
    }

    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0]?.x;
    let prevY = this.points[0]?.y;

    if (prevX === undefined || prevY === undefined) {
      //console.error("First point is undefined", this.points[0]);
      return;
    }

    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        this.points[i]?.update();
      }

      if (!this.points[i]) {
        //console.error(`Point at index ${i} is undefined`, this.points);
        continue;
      }

      const point = this.points[i];
      const cx = (prevX + point.x) / 2;
      const cy = (prevY + point.y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = point.x;
      prevY = point.y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(0, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.points[0].y);
    ctx.fill();
    ctx.closePath();
    //console.log("Wave drawn");
  }
}
