window.addEventListener("load", () => {
  const player = document.querySelector(".player");
  const game = document.querySelector(".game");
  const blockL = document.querySelector(".left");
  const blockR = document.querySelector(".right");
  const scorEl = document.querySelector(".score");
  const blocks = document.querySelector(".blocks");
  const helper = document.querySelector(".helper");
  const gameOver = document.querySelector(".game-over");
  const scoreNumElement = document.querySelector(".score-num");
  const retryButton = document.querySelector("button");
  let gameW = parseInt(window.getComputedStyle(game).getPropertyValue("width"));

  let mousedown = false;
  let gameStatus = 1;
  let score = 0;
  let scoreA = false;
  let x;

  game.addEventListener("mousedown", () => {
    mousedown = true;
    game.addEventListener("mousemove", move);
  });
  game.addEventListener("mouseup", () => {
    mousedown = false;
  });

  retryButton.addEventListener("click", retryAgain);

  function retryAgain() {
    player.style.left = "50%";
    score = 0;
    scorEl.textContent = score;
    document.body.classList.remove("color-animation");
    gameStatus = 1;
    gameOver.classList.remove("game-over-active");
    game.classList.remove("game-game-over-active");

    randomInterval = setInterval(() => {
      randomBlock(blockL);
      randomBlock(blockR);
    }, 2000);

    scoreInterval = setInterval(() => {
      if (gameStatus === 1) {
        score++;
        scorEl.textContent = score;
      }
      checkScoreAnimation();
    }, 1500);
  }

  function move(e) {
    if (gameStatus === 1) {
      x = e.clientX - 50;
      console.log(x);
      if (mousedown && x - 25 >= 0 && x - 25 <= gameW - 50) {
        player.style.left = x + "px";
      }
    }
  }

  function randomBlock(block) {
    let random = (Math.floor(Math.random() * 4) * gameW) / 6 + gameW / 3;
    block.style.width = `${random}px`;
  }

  function checkDead() {
    let blocksTop = parseInt(
      window.getComputedStyle(blocks).getPropertyValue("top")
    );
    let blocksHeight = parseInt(
      window.getComputedStyle(blocks).getPropertyValue("height")
    );
    let blockLW = parseInt(
      window.getComputedStyle(blockL).getPropertyValue("width")
    );
    let blockRW = parseInt(
      window.getComputedStyle(blockR).getPropertyValue("width")
    );
    let gameW = parseInt(
      window.getComputedStyle(game).getPropertyValue("width")
    );
    let playerTop = parseInt(
      window.getComputedStyle(player).getPropertyValue("top")
    );
    let playerleft = parseInt(
      window.getComputedStyle(player).getPropertyValue("left")
    );

    if (
      (blocksTop <= playerTop &&
        playerleft - 25 < blockLW &&
        blocksTop + 25 >= playerTop &&
        playerleft - 25 < blockLW) ||
      (blocksTop + blocksHeight >= playerTop &&
        playerleft + 25 > gameW - blockRW &&
        blocksTop + blocksHeight - 25 <= playerTop &&
        playerleft + 25 > gameW - blockRW)
    ) {
      blocks.style.top = `${blocksTop}px`;
      gameStatus = 2;
    }

    if (gameStatus === 2) {
      scoreNumElement.textContent = score;
      gameOver.classList.add("game-over-active");
      game.classList.add("game-game-over-active");
      clearInterval(randomInterval);
      clearInterval(scoreInterval);
    }

    requestAnimationFrame(checkDead);
  }

  let randomInterval = setInterval(() => {
    randomBlock(blockL);
    randomBlock(blockR);
  }, 2000);

  let scoreInterval = setInterval(() => {
    if (gameStatus === 1) {
      score += 50;
      scorEl.textContent = score;
    }
    checkScoreAnimation();
  }, 1500);

  function checkScoreAnimation() {
    if (score != 0 && score % 50 == 0) {
      document.body.classList.add("color-animation");
    } else {
      setTimeout(() => {
        document.body.classList.remove("color-animation");
      }, 1000);
    }
  }

  checkDead();
});
