import { Wave } from "./wave";

export class WaveGroup {
  constructor() {
    this.totalWaves = 3;
    this.totalPoints = 6;
    this.color = [
      "rgba(255,159,156, 1)",
      "rgba(178,200,255, 0.8)",
      "rgba(89,201,216, 0.6)",
    ];
    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      this.waves.push(wave);
    }
    //console.log("WaveGroup initialized:", this.waves);
  }

  resize(stageWidth, stageHeight, centerY) {
    if (!this.waves || this.waves.length === 0) {
      //console.error("Waves array is empty or undefined");
      return;
    }

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight, centerY);
    }
    //console.log("WaveGroup resized");
  }

  draw(ctx) {
    //console.log("Drawing wave group:", this.waves);
    if (!this.waves || this.waves.length === 0) {
      console.error("Waves array is empty or undefined");
      return;
    }

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
    //console.log("WaveGroup drawn");
  }
}
