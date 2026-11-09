
let x = 60;
let y = 0;
let coins = 0;
let direction = 0;
let moving = false;
let jumping = false;

const player = document.getElementById("player");
const coin = document.getElementById("coin");
const area = document.getElementById("gameArea");

function startGame() {
  const name = document.getElementById("playerName").value.trim();

  if (!name) {
    alert("Avval o‘yinchi nomini yozing!");
    return;
  }

  document.getElementById("welcome").textContent = name;
  document.getElementById("home").hidden = true;
  document.getElementById("game").hidden = false;
}

function exitGame() {
  document.getElementById("game").hidden = true;
  document.getElementById("home").hidden = false;
}

function move(dir) {
  direction = dir;
  moving = true;
}

function stopMove() {
  moving = false;
}

function jump() {
  if (jumping) return;

  jumping = true;
  y = 110;
  player.style.bottom = "205px";

  setTimeout(() => {
    y = 0;
    player.style.bottom = "95px";
    jumping = false;
  }, 500);
}

function update() {
  if (moving) {
    x += direction * 4;
    x = Math.max(0, Math.min(area.clientWidth - 55, x));
    player.style.left = x + "px";
  }

  const playerRect = player.getBoundingClientRect();
  const coinRect = coin.getBoundingClientRect();

  const hit =
    playerRect.left < coinRect.right &&
    playerRect.right > coinRect.left &&
    playerRect.top < coinRect.bottom &&
    playerRect.bottom > coinRect.top;

  if (hit) {
    coins++;
    document.getElementById("coins").textContent = coins;
    coin.style.left =
      Math.floor(Math.random() * (area.clientWidth - 50)) + "px";
  }

  requestAnimationFrame(update);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") move(-1);
  if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") move(1);
  if (e.code === "Space") {
    e.preventDefault();
    jump();
  }
});

document.addEventListener("keyup", e => {
  if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key.toLowerCase())) {
    stopMove();
  }
});

function showLogin() {
  alert("Hozircha demo kirish oynasi. Haqiqiy Kitest kirishi keyin rasmiy API orqali ulanadi.");
}

update();
  
