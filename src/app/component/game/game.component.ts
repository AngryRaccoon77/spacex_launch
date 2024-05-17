import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [
    HeaderComponent
  ],
  standalone: true
})
export class GameComponent implements OnInit {
  private SHIP_SPEED!: number;
  private BULLET_SPEED!: number;
  private ALIEN_BULLET_SPEED!: number;
  private MYSTERY_SHIP_INTERVAL = 30000;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  shipX: number = 250;
  shipY: number = 700;
  bulletX!: number;
  bulletY!: number;
  bulletFired: boolean = false;
  aliens: { x: number, y: number, dx: number, dy: number, points: number, image: HTMLImageElement }[] = [];
  alienBullets: { x: number, y: number }[] = [];
  mysteryShipX: number = -100;
  mysteryShipY: number = 0;
  score: number = 0;
  lives: number = 3;
  waveCount: number = 0;
  mysteryShipAppearing: boolean = false;

  alienImage1: HTMLImageElement = new Image();
  alienImage2: HTMLImageElement = new Image();
  alienImage3: HTMLImageElement = new Image();
  shipImage: HTMLImageElement = new Image();
  mysteryShipImage: HTMLImageElement = new Image();

  // Dynamic sizes
  shipWidth: number = 8;
  shipHeight: number = 64;
  alienWidth: number = 8;
  alienHeight: number = 32;
  mysteryShipWidth: number = 72;
  mysteryShipHeight: number = 72;

  ngOnInit() {
    this.initializeCanvas();
    this.initializeImages();
    this.calculateSizes();
    this.initializeSpeeds();
    this.initializeAliens();
    this.startGameLoops();
  }

  private initializeCanvas() {
    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 150;
    this.shipY = this.canvas.height - this.shipHeight;
    this.ctx = this.canvas.getContext('2d')!;
  }

  private initializeImages() {
    this.alienImage1.src = 'assets/img/alien1.png';
    this.alienImage2.src = 'assets/img/alien2.png';
    this.alienImage3.src = 'assets/img/alien3.png';
    this.shipImage.src = 'assets/img/ship.png';
    this.mysteryShipImage.src = 'assets/img/roadster.png';

    // Wait for images to load before calculating sizes
    this.alienImage1.onload = () => this.calculateSizes();
    this.alienImage2.onload = () => this.calculateSizes();
    this.alienImage3.onload = () => this.calculateSizes();
    this.shipImage.onload = () => this.calculateSizes();
    this.mysteryShipImage.onload = () => this.calculateSizes();
  }

  private calculateSizes() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    this.shipWidth = canvasWidth * 0.03;
    this.shipHeight = this.shipImage.height / this.shipImage.width * this.shipWidth;
    this.alienWidth = canvasWidth * 0.02;
    this.alienHeight = this.alienImage1.height / this.alienImage1.width * this.alienWidth;
    this.mysteryShipWidth = canvasWidth * 0.05;
    this.mysteryShipHeight = this.mysteryShipImage.height / this.mysteryShipImage.width * this.mysteryShipWidth;
  }

  private initializeSpeeds() {
    this.SHIP_SPEED = this.canvas.width * 0.02;
    this.BULLET_SPEED = this.canvas.height * 0.015;
    this.ALIEN_BULLET_SPEED = this.canvas.height * 0.01;
  }

  private initializeAliens() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        const { points, image } = this.getAlienAttributes(j);
        this.aliens.push({
          x: this.canvas.width * 0.004 + i * this.canvas.width * 0.035,
          y: this.canvas.height * 0.05 + j * this.canvas.height * 0.05,
          dx: this.canvas.width * 0.00005,
          dy: this.canvas.height * 0.00001,
          points: points,
          image: image
        });
      }
    }
  }

  private getAlienAttributes(row: number) {
    let points, image;
    if (row === 0) {
      points = 40;
      image = this.alienImage3;
    } else if (row < 3) {
      points = 20;
      image = this.alienImage2;
    } else {
      points = 10;
      image = this.alienImage1;
    }
    return { points, image };
  }

  private startGameLoops() {
    setInterval(() => this.draw(), 10);
    setInterval(() => this.alienShoot(), 2000);
    setTimeout(() => this.appearMysteryShip(), this.MYSTERY_SHIP_INTERVAL);
  }

  private appearMysteryShip() {
    this.mysteryShipX = 0;
    this.mysteryShipAppearing = true;
    setTimeout(() => this.appearMysteryShip(), this.MYSTERY_SHIP_INTERVAL);
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawEntities();
    this.checkCollisions();
    this.checkWin();
    this.checkLoss();
  }

  private drawEntities() {
    this.drawShip();
    this.drawAliens();
    if (this.bulletFired) {
      this.drawBullet();
    }
    this.drawAlienBullets();
    if (this.mysteryShipAppearing) {
      this.drawMysteryShip();
    }
  }

  private drawShip() {
    this.ctx.drawImage(this.shipImage, this.shipX, this.shipY, this.shipWidth, this.shipHeight);
  }

  private drawMysteryShip() {
    this.ctx.drawImage(this.mysteryShipImage, this.mysteryShipX, this.mysteryShipY, this.mysteryShipWidth, this.mysteryShipHeight);
    this.mysteryShipX += this.canvas.width * 0.0015;
    if (this.mysteryShipX > this.canvas.width) {
      this.mysteryShipAppearing = false;
    }
  }

  private drawAliens() {
    this.aliens.forEach(alien => {
      this.ctx.drawImage(alien.image, alien.x, alien.y, this.alienWidth, this.alienHeight);
      alien.x += alien.dx;
      alien.y += alien.dy;
      if (alien.x + this.alienWidth > this.canvas.width || alien.x < 0) {
        alien.dx = -alien.dx;
      }
      if (alien.y + this.alienHeight > this.canvas.height || alien.y < 0) {
        alien.dy = -alien.dy;
      }
    });
  }

  private drawBullet() {
    this.ctx.fillStyle = '#FFFF00';
    this.ctx.fillRect(this.bulletX, this.bulletY, this.canvas.width * 0.002, this.canvas.height * 0.025);
    this.bulletY -= this.BULLET_SPEED;
    if (this.bulletY < 0) {
      this.bulletFired = false;
    }
  }

  private drawAlienBullets() {
    this.alienBullets.forEach((bullet, index) => {
      this.ctx.fillStyle = '#0000FF';
      this.ctx.fillRect(bullet.x, bullet.y, this.canvas.width * 0.002, this.canvas.height * 0.025);
      bullet.y += this.ALIEN_BULLET_SPEED;
      if (bullet.y > this.canvas.height) {
        this.alienBullets.splice(index, 1);
      }
    });
  }

  private checkCollisions() {
    this.checkBulletCollisions();
    this.checkAlienBulletCollisions();
  }

  private checkBulletCollisions() {
    this.aliens.forEach((alien, index) => {
      if (this.bulletFired && this.isCollision(this.bulletX, this.bulletY, 5, 10, alien.x, alien.y, this.alienWidth, this.alienHeight)) {
        this.aliens.splice(index, 1);
        this.bulletFired = false;
        this.score += alien.points;
        this.increaseAlienSpeed();
      }
    });
    if (this.bulletFired && this.isCollision(this.bulletX, this.bulletY, 5, 10, this.mysteryShipX, this.mysteryShipY, this.mysteryShipWidth, this.mysteryShipHeight)) {
      this.mysteryShipAppearing = false;
      this.mysteryShipAppearing = false;
      const mysteryShipScores = [50, 100, 150, 200, 300];
      const randomScore = mysteryShipScores[Math.floor(Math.random() * mysteryShipScores.length)];
      this.score += randomScore;
    }
  }

  private isCollision(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  private increaseAlienSpeed() {
    this.aliens.forEach(alien => {
      alien.dx *= 1.07;
      alien.dy *= 1.02;
    });
  }

  private checkAlienBulletCollisions() {
    this.alienBullets.forEach((bullet, index) => {
      if (this.isCollision(bullet.x, bullet.y, 5, 10, this.shipX, this.shipY, this.shipWidth, this.shipHeight)) {
        this.alienBullets.splice(index, 1);
        this.lives -= 1;
      }
    });
  }

  private alienShoot() {
    if (this.aliens.length > 0) {
      const randomAlien = this.aliens[Math.floor(Math.random() * this.aliens.length)];
      this.alienBullets.push({ x: randomAlien.x + this.alienWidth / 2, y: randomAlien.y + this.alienHeight });
    }
  }

  private checkWin() {
    if (this.aliens.length === 0) {
      alert('Новая волна!');
      this.createAlienWave();
    }
  }

  private checkLoss() {
    if (this.lives <= 0 || this.aliens.some(alien => alien.y >= this.shipY)) {
      alert('Вы проиграли!');
      this.restartGame();
    }
  }

  private createAlienWave() {
    this.waveCount++;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        const { points, image } = this.getAlienAttributes(j);
        this.aliens.push({
          x: this.canvas.width * 0.004 + i * this.canvas.width * 0.035,
          y: this.canvas.height * 0.05 + j * this.canvas.height * 0.05,
          dx: this.canvas.width * 0.00005 * 1.0005 * this.waveCount,
          dy: this.canvas.height * 0.00001 * 1.000001 * this.waveCount,
          points: points,
          image: image
        });
      }
    }
  }

  private restartGame() {
    this.shipX = 250;
    this.shipY = this.canvas.height - this.shipHeight - 20;
    this.bulletFired = false;
    this.aliens = [];
    this.score = 0;
    this.lives = 3;
    this.alienBullets = [];
    this.initializeAliens();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 150;
    this.calculateSizes();
    this.initializeSpeeds();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.moveShipLeft();
        break;
      case 'ArrowRight':
        this.moveShipRight();
        break;
      case ' ':
        this.fireBullet();
        break;
    }
  }

  private moveShipLeft() {
    if (this.shipX > 0) {
      this.shipX -= this.SHIP_SPEED;
    }
  }

  private moveShipRight() {
    if (this.shipX < this.canvas.width - this.shipWidth) {
      this.shipX += this.SHIP_SPEED;
    }
  }

  private fireBullet() {
    if (!this.bulletFired) {
      this.bulletX = this.shipX + this.shipWidth / 2 - 2.5;
      this.bulletY = this.shipY - 10;
      this.bulletFired = true;
    }
  }
}
