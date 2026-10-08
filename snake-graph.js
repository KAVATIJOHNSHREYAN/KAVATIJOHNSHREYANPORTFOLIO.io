/**
 * GitHub Contribution Grid Snake Animation Engine
 * Author: Kavati John Shreyan
 * Description: 60fps HTML5 Canvas Snake slithering across GitHub contribution grid, eating food blocks in an infinite loop.
 */

(function () {
  "use strict";

  function initSnakeGraph() {
    const canvas = document.getElementById("github-snake-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Grid Dimensions: 53 weeks x 7 days
    const cols = 53;
    const rows = 7;
    const cellSize = 12;
    const cellGap = 4;
    const gridWidth = cols * (cellSize + cellGap);
    const gridHeight = rows * (cellSize + cellGap);

    // Padding for day/month labels
    const paddingLeft = 30;
    const paddingTop = 25;

    canvas.width = paddingLeft + gridWidth + 20;
    canvas.height = paddingTop + gridHeight + 20;

    let score = 0;
    const scoreElement = document.getElementById("snake-score");

    // Grid data
    let grid = [];
    let foodBlocks = [];

    function generateGrid() {
      grid = [];
      foodBlocks = [];
      for (let c = 0; c < cols; c++) {
        grid[c] = [];
        for (let r = 0; r < rows; r++) {
          let level = 0;
          const rand = Math.random();
          if (rand > 0.88) level = 3;
          else if (rand > 0.75) level = 2;
          else if (rand > 0.60) level = 1;

          grid[c][r] = {
            col: c,
            row: r,
            level: level,
            maxLevel: level,
            eaten: false
          };

          if (level > 0) {
            foodBlocks.push({ col: c, row: r });
          }
        }
      }
    }

    generateGrid();

    // Snake State
    let snake = [
      { col: 5, row: 3 },
      { col: 4, row: 3 },
      { col: 3, row: 3 },
      { col: 2, row: 3 }
    ];
    let dir = { x: 1, y: 0 };
    let target = null;
    let particles = [];

    function findNearestFood() {
      if (foodBlocks.length === 0) return null;
      const head = snake[0];
      let nearest = null;
      let minDistance = Infinity;

      for (const food of foodBlocks) {
        const cell = grid[food.col][food.row];
        if (cell.eaten || cell.level === 0) continue;

        const dist = Math.abs(food.col - head.col) + Math.abs(food.row - head.row);
        if (dist < minDistance) {
          minDistance = dist;
          nearest = food;
        }
      }
      return nearest;
    }

    function updateSnake() {
      const head = snake[0];

      if (!target || grid[target.col][target.row].eaten || grid[target.col][target.row].level === 0) {
        target = findNearestFood();
      }

      if (!target || foodBlocks.every(f => grid[f.col][f.row].eaten)) {
        generateGrid();
        target = findNearestFood();
      }

      if (target) {
        const dx = target.col - head.col;
        const dy = target.row - head.row;

        const possibleDirs = [];
        if (dx > 0 && dir.x !== -1) possibleDirs.push({ x: 1, y: 0 });
        if (dx < 0 && dir.x !== 1) possibleDirs.push({ x: -1, y: 0 });
        if (dy > 0 && dir.y !== -1) possibleDirs.push({ x: 0, y: 1 });
        if (dy < 0 && dir.y !== 1) possibleDirs.push({ x: 0, y: -1 });

        if (possibleDirs.length > 0) {
          if (Math.abs(dx) >= Math.abs(dy)) {
            dir = possibleDirs.find(d => d.x !== 0) || possibleDirs[0];
          } else {
            dir = possibleDirs.find(d => d.y !== 0) || possibleDirs[0];
          }
        }
      }

      let newCol = head.col + dir.x;
      let newRow = head.row + dir.y;

      if (newCol >= cols) newCol = 0;
      if (newCol < 0) newCol = cols - 1;
      if (newRow >= rows) newRow = 0;
      if (newRow < 0) newRow = rows - 1;

      const newHead = { col: newCol, row: newRow };
      snake.unshift(newHead);

      const targetCell = grid[newCol][newRow];
      if (targetCell.level > 0 && !targetCell.eaten) {
        targetCell.eaten = true;
        score += 1;
        if (scoreElement) scoreElement.textContent = `Contributions Eaten: ${score}`;

        const px = paddingLeft + newCol * (cellSize + cellGap) + cellSize / 2;
        const py = paddingTop + newRow * (cellSize + cellGap) + cellSize / 2;
        for (let p = 0; p < 8; p++) {
          particles.push({
            x: px,
            y: py,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 20,
            color: "#ff3c00"
          });
        }
      } else {
        snake.pop();
      }
    }

    function getLevelColor(level, eaten) {
      if (eaten || level === 0) {
        return document.documentElement.getAttribute("data-theme") === "light" 
          ? "#ebedf0" 
          : "#16222c";
      }
      if (level === 1) return "rgba(255, 60, 0, 0.35)";
      if (level === 2) return "rgba(255, 60, 0, 0.70)";
      if (level === 3) return "#ff3c00";
      return "#ff3c00";
    }

    let frameCount = 0;

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
      ctx.font = "10px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = "#64748b";
      for (let m = 0; m < months.length; m++) {
        const mx = paddingLeft + m * (cols / 12) * (cellSize + cellGap);
        ctx.fillText(months[m], mx, 14);
      }

      const days = ["Mon", "Wed", "Fri"];
      const dayRows = [1, 3, 5];
      for (let d = 0; d < days.length; d++) {
        const dy = paddingTop + dayRows[d] * (cellSize + cellGap) + 9;
        ctx.fillText(days[d], 4, dy);
      }

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cell = grid[c][r];
          const x = paddingLeft + c * (cellSize + cellGap);
          const y = paddingTop + r * (cellSize + cellGap);

          ctx.fillStyle = getLevelColor(cell.level, cell.eaten);
          ctx.beginPath();
          ctx.roundRect(x, y, cellSize, cellSize, 2);
          ctx.fill();
        }
      }

      frameCount++;
      if (frameCount % 6 === 0) {
        updateSnake();
      }

      for (let i = snake.length - 1; i >= 0; i--) {
        const seg = snake[i];
        const x = paddingLeft + seg.col * (cellSize + cellGap);
        const y = paddingTop + seg.row * (cellSize + cellGap);

        if (i === 0) {
          ctx.shadowColor = "#ff3c00";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.roundRect(x, y, cellSize, cellSize, 3);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = "#0d171f";
          ctx.fillRect(x + 3, y + 3, 2, 2);
          ctx.fillRect(x + 7, y + 3, 2, 2);
        } else {
          const alpha = 1 - (i / snake.length) * 0.6;
          ctx.fillStyle = `rgba(255, 60, 0, ${alpha})`;
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, cellSize - 2, cellSize - 2, 2);
          ctx.fill();
        }
      }

      for (let p = particles.length - 1; p >= 0; p--) {
        const pt = particles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.life / 20;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (pt.life <= 0) {
          particles.splice(p, 1);
        }
      }

      requestAnimationFrame(render);
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnakeGraph);
  } else {
    initSnakeGraph();
  }
})();
