// game.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";

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
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  shipX: number = 250;
  shipY: number = 700;
  alienX: number = 30;
  alienY: number = 30;
  alienWidth: number = 32;
  alienHeight: number = 32;
  alienDX: number = 1;
  alienDY: number = 0.1;
  bulletX!: number;
  bulletY!: number;
  bulletFired: boolean = false;
  aliens: {x: number, y: number, dx: number, dy: number, points: number, image: HTMLImageElement}[] = [];
  score: number = 0; // добавьте эту строку
  lives: number = 3; // добавьте эту строку
  alienBullets: {x: number, y: number}[] = [];
  mysteryShipX: number = -100;
  mysteryShipY: number = 0;
  mysteryShipDX: number = 2;
  waveCount: number = 0;
  mysteryShipAppearing: boolean = true;
  alienImage1: HTMLImageElement = new Image();
  alienImage2: HTMLImageElement = new Image();
  alienImage3: HTMLImageElement = new Image();
  shipImage: HTMLImageElement = new Image();
  mysteryShipImage: HTMLImageElement = new Image();



  ngOnInit() {
    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight-150;
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context');
    }
    this.ctx = context;
    setInterval(() => this.draw(), 10);
    setInterval(() => this.alienShoot(), 2000);
    setTimeout(() => this.appearMysteryShip(), 30000); // мистический корабль появится через 30 секунд
    this.alienImage1.src = 'assets/img/alien1.png';
    this.alienImage2.src = 'assets/img/alien2.png';
    this.alienImage3.src = 'assets/img/alien3.png';
    this.shipImage.src = 'assets/img/ship.png';
    this.mysteryShipImage.src = 'assets/img/roadster.png';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        let points;
        let image;
        if (j == 0) {
          points = 40;
          image = this.alienImage3;

        } else if (j < 3 && j >= 1) {
          points = 20;
          image = this.alienImage2;

        } else {
          points = 10;
          image = this.alienImage1;
        }
        this.aliens.push({
          x: 30 + i * 60,
          y: 30 + j * 60,
          dx: 0.1,
          dy: 0.01,
          points: points,
          image: image
      });
    }
    }
  }

  appearMysteryShip() {
    this.mysteryShipX = 0;
    this.mysteryShipAppearing = true;
    setInterval(() => this.appearMysteryShip(), 30000);

  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawShip();
    this.drawAlien();
    if (this.bulletFired) {
      this.drawBullet();
    }
    this.drawAlienBullet();
    if (this.mysteryShipAppearing) {
      this.drawMysteryShip();
    }
    this.checkWin();
    this.checkLoss();
  }

  drawShip() {

    this.ctx.drawImage(this.shipImage, this.shipX, this.shipY, 64, 64);

  }

  drawMysteryShip() {
    this.ctx.drawImage(this.mysteryShipImage, this.mysteryShipX, this.mysteryShipY, 72, 72);
    this.mysteryShipX += this.mysteryShipDX;
    if (this.mysteryShipX > this.canvas.width) {
      this.mysteryShipAppearing = false;
    }
  }

  drawAlien() {
    this.aliens.forEach((alien, ) => {
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
  drawBullet() {
    this.ctx.fillStyle = '#FFFF00';
    this.ctx.fillRect(this.bulletX, this.bulletY, 5, 10);
    this.bulletY -= 10;
    if (this.bulletY < 0) {
      this.bulletFired = false;
    }
    this.aliens.forEach((alien, index) => {
      if (this.bulletX < alien.x + this.alienWidth &&
        this.bulletX + 5 > alien.x &&
        this.bulletY < alien.y + this.alienHeight &&
        this.bulletY + 10 > alien.y) {
        // Bullet hit the alien
        this.aliens.splice(index, 1);
        this.bulletFired = false;
        this.score += alien.points; // увеличиваем счет
        this.aliens.forEach(alien => { // увеличиваем скорость пришельцев
          alien.dx *= 1.1;
          alien.dy *= 1.05;
        });
      }
    });
    if (this.bulletX < this.mysteryShipX + 50 &&
      this.bulletX + 5 > this.mysteryShipX &&
      this.bulletY < this.mysteryShipY + 20 &&
      this.bulletY + 10 > this.mysteryShipY) {
      // Bullet hit the mystery ship
      this.mysteryShipAppearing = false;
      this.score += 100; // увеличиваем счет
    }
  }
  alienShoot() {
    if (this.aliens.length > 0) {
      const randomAlien = this.aliens[Math.floor(Math.random() * this.aliens.length)];
      this.alienBullets.push({x: randomAlien.x + this.alienWidth / 2, y: randomAlien.y + this.alienHeight});
    }
  }
  drawAlienBullet() {
    this.alienBullets.forEach((bullet, index) => {
      this.ctx.fillStyle = '#0000FF';
      this.ctx.fillRect(bullet.x, bullet.y, 5, 10);
      bullet.y += 5;
      if (bullet.y > this.canvas.height) {
        this.alienBullets.splice(index, 1);
      }
      if (bullet.x < this.shipX + 50 &&
        bullet.x + 5 > this.shipX &&
        bullet.y < this.shipY + 20 &&
        bullet.y + 10 > this.shipY) {
        // Bullet hit the ship
        this.alienBullets.splice(index, 1);
        this.lives -= 1; // уменьшаем количество жизней
      }
    });
  }

  checkWin() {
    if (this.aliens.length === 0) {
      alert('Новая волна!');
      this.createAlienWave();
    }
  }

  checkLoss() {
    if (this.lives <= 0) { // проверяем количество жизней
      alert('Вы проиграли!');
      this.restartGame();
    } else {
      for (let i = 0; i < this.aliens.length; i++) {
        if (this.aliens[i].y >= this.shipY) {
          alert('Вы проиграли!');
          this.restartGame();
          break;
        }
      }
    }
  }

  createAlienWave() {
    this.waveCount++;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        let points;
        let image;
        if (j < 2) {
          points = 10;
          image= this.alienImage1;
        } else if (j === 2) {
          points = 20;
          image = this.alienImage2;
        } else {
          points = 40;
          image = this.alienImage3;
        }
        this.aliens.push({
          x: 30 + i * 60,
          y: 30 + j * 60,
          dx: 0.1 * 1.05 * this.waveCount,
          dy: 0.01 * 1.01 * this.waveCount,
          points: points,
          image: image
        });
      }
    }
  }

  restartGame() {
    this.shipX = 250;
    this.shipY = 850;
    this.alienX = 30;
    this.alienY = 30;
    this.alienDX = 1;
    this.alienDY = 0.1;
    this.bulletFired = false;
    this.aliens = [];
    this.score = 0;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        let points;
        let image;
        if (j < 2) {
          points = 10;
          image= this.alienImage1;
        } else if (j === 2) {
          points = 20;
          image = this.alienImage2;
        } else {
          points = 40;
          image = this.alienImage3;
        }
        this.aliens.push({
          x: 30 + i * 60,
          y: 30 + j * 60,
          dx: 0.1,
          dy: 0.01,
          points: points,
          image: image
        });
      }
    }
    this.lives = 3;
    this.alienBullets = [];

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' && this.shipX > 0) {
      this.shipX -= 15;
    } else if (event.key === 'ArrowRight' && this.shipX < this.canvas.width - 50) {
      this.shipX += 15;
    } else if (event.key === ' ') {
      if (!this.bulletFired) {
        this.bulletX = this.shipX + 22.5;
        this.bulletY = this.shipY - 10;
        this.bulletFired = true;
      }
    }
  }
}
