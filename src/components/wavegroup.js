import { Wave } from "./wave";

export class WaveGroup {
  constructor() {
    this.totalWaves = 3;
    this.totalPoints = 6;
    this.color = [
      "rgba(254,215,251, 0.4)",
      "rgba(173,224,255,0.4)",
      "rgba(215,254,249,0.4)",
    ];
    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      this.waves.push(wave);
    }
    console.log("WaveGroup initialized:", this.waves);
  }

  resize(stageWidth, stageHeight) {
    if (!this.waves || this.waves.length === 0) {
      console.error("Waves array is empty or undefined");
      return;
    }

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
    console.log("WaveGroup resized");
  }

  draw(ctx) {
    console.log("Drawing wave group:", this.waves);
    if (!this.waves || this.waves.length === 0) {
      console.error("Waves array is empty or undefined");
      return;
    }

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
    console.log("WaveGroup drawn");
  }
}
