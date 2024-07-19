export class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fieldY = y;
    this.speed = 0.005;
    this.cur = index;
    this.max = Math.random() * 100 + 150;

    this.amplitude = 40; // 진폭을 낮추기 위해 추가한 변수
  }

  // 각 점의 위치를 sin 곡선을 따라 변경
  update() {
    this.cur += this.speed;
    this.y = this.fieldY + Math.sin(this.cur) * this.amplitude;
  }
}
