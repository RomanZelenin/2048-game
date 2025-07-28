<script setup lang="ts">
import { ref } from "vue";
const gameField = defineModel<number[][]>({ required: true });
const dialogMessage = ref("");
const dialogVisible = ref(false);

function getClassNumber(num: number) {
  switch (num) {
    case 2:
      return "two";
    case 4:
      return "four";
    case 8:
      return "eight";
    case 16:
      return "sixteen";
    case 32:
      return "thirtytwo";
    case 64:
      return "sixtyfour";
    case 128:
      return "onehundredtwentyeight";
    case 256:
      return "twofiftysix";
    case 512:
      return "fivehundredtwelve";
    case 1024:
      return "onethousandtwentyfour";
    case 2048:
      return "twothousandfortyeight";
  }
}

function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function checkGameCompletion() {

  if (gameField.value.some(row => row.some(cell => cell === 2048))) {
    dialogMessage.value = "Поздравляем! Вы набрали 2048! 🎉";
    dialogVisible.value = true;
    return;
  }

  const hasEmptyCell = gameField.value.some(row => row.some(cell => cell === 0));
  if (!hasEmptyCell) {

    for (let i = 0; i < gameField.value.length; i++) {
      for (let j = 0; j < gameField.value.length - 1; j++) {
        if (gameField.value[i][j] === gameField.value[i][j + 1]) {
          return;
        }
      }
    }
    
    for (let i = 0; i < gameField.value.length - 1; i++) {
      for (let j = 0; j < gameField.value.length; j++) {
        if (gameField.value[i][j] === gameField.value[i + 1][j]) {
          return; 
        }
      }
    }
    
    dialogMessage.value = "Конец игры! У вас не осталось ходов. 😢";
    dialogVisible.value = true;
  }
}

document.onkeydown = function (it) {
  switch (it.key) {
    case "ArrowDown": {
      const tGameField: number[][] = [];
      for (let i = 0; i < gameField.value.length; i++) {
        let column: number[] = [];
        for (let j = 0; j < gameField.value.length; j++) {
          column.push(gameField.value[j][i]);
        }
        tGameField.push(column);
      }
      for (let row = 0; row < tGameField.length; row++) {
        let noZeroesRow = tGameField[row].filter((it) => it != 0);
        for (let i = noZeroesRow.length - 2; i >= 0; i--) {
          if (noZeroesRow[i] == noZeroesRow[i + 1]) {
            noZeroesRow[i + 1] *= 2;
            noZeroesRow = noZeroesRow
              .slice(0, i)
              .concat(noZeroesRow.slice(i + 1));
          }
        }
        while (noZeroesRow.length < 4) {
          noZeroesRow.unshift(0);
        }
        tGameField[row] = noZeroesRow;
      }

      for (let i = 0; i < gameField.value.length; i++) {
        for (let j = 0; j < gameField.value.length; j++) {
          gameField.value[j][i] = tGameField[i][j];
        }
      }
      break;
    }
    case "ArrowUp": {
      const tGameField: number[][] = [];
      for (let i = 0; i < gameField.value.length; i++) {
        let column: number[] = [];
        for (let j = 0; j < gameField.value.length; j++) {
          column.push(gameField.value[j][i]);
        }
        tGameField.push(column);
      }

      for (let row = 0; row < tGameField.length; row++) {
        let noZeroesRow = tGameField[row].filter((it) => it != 0);
        for (let i = 0; i < noZeroesRow.length - 1; i++) {
          if (noZeroesRow[i] == noZeroesRow[i + 1]) {
            noZeroesRow[i] *= 2;
            noZeroesRow = noZeroesRow
              .slice(0, i + 1)
              .concat(noZeroesRow.slice(i + 2));
          }
        }
        while (noZeroesRow.length < 4) {
          noZeroesRow.push(0);
        }
        tGameField[row] = noZeroesRow;
      }

      for (let i = 0; i < gameField.value.length; i++) {
        for (let j = 0; j < gameField.value.length; j++) {
          gameField.value[j][i] = tGameField[i][j];
        }
      }

      break;
    }
    case "ArrowLeft":
      for (let row = 0; row < gameField.value.length; row++) {
        let noZeroesRow = gameField.value[row].filter((it) => it != 0);
        for (let i = 0; i < noZeroesRow.length - 1; i++) {
          if (noZeroesRow[i] == noZeroesRow[i + 1]) {
            noZeroesRow[i] *= 2;
            noZeroesRow = noZeroesRow
              .slice(0, i + 1)
              .concat(noZeroesRow.slice(i + 2));
          }
        }
        while (noZeroesRow.length < 4) {
          noZeroesRow.push(0);
        }
        gameField.value[row] = noZeroesRow;
      }
      break;
    case "ArrowRight":
      for (let row = 0; row < gameField.value.length; row++) {
        let noZeroesRow = gameField.value[row].filter((it) => it != 0);
        for (let i = noZeroesRow.length - 2; i >= 0; i--) {
          if (noZeroesRow[i] == noZeroesRow[i + 1]) {
            noZeroesRow[i + 1] *= 2;
            noZeroesRow = noZeroesRow
              .slice(0, i)
              .concat(noZeroesRow.slice(i + 1));
          }
        }
        while (noZeroesRow.length < 4) {
          noZeroesRow.unshift(0);
        }
        gameField.value[row] = noZeroesRow;
      }
      break;
  }

  if (
    it.key.startsWith("Arrow") &&
    gameField.value.some((row) => row.some((cell) => cell == 0))
  ) {
    let [i, j] = [getRandomIntInclusive(0, 3), getRandomIntInclusive(0, 3)];
    while (gameField.value[i][j] != 0) {
      [i, j] = [getRandomIntInclusive(0, 3), getRandomIntInclusive(0, 3)];
    }
    gameField.value[i][j] = 2;
    checkGameCompletion();
  }
};
</script>

<template>
  <div id="game-field">
    <div class="row" v-for="row of gameField">
      <div class="cell" v-for="cell of row" :class="getClassNumber(cell)">
        {{ cell > 0 ? cell : "" }}
      </div>
    </div>
  </div>
  <dialog :open="dialogVisible" @click="dialogVisible = false">
    <div class="dialog-content">
      <p>{{ dialogMessage }}</p>
      <button @click="dialogVisible = false">Закрыть</button>
    </div>
  </dialog>
</template>

<style scoped>
#game-field {
  --light-background-color: #988a79;
  --dark-backgorund-color: #8b7e6e;
  box-sizing: border-box;
  width: 500px;
  height: 500px;
  background-color: light-dark(
    var(--light-background-color),
    var(--dark-backgorund-color)
  );
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
}
.row {
  flex: 1;
  display: flex;
  gap: 8px;
}
.cell {
  --light-background-color: #bbad99;
  --dark-backgorund-color: #a59988;

  flex: 1;
  background-color: light-dark(
    var(--light-background-color),
    var(--dark-backgorund-color)
  );
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 44px;
  font-weight: 700;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  animation-name: zoomInOut;
  animation-duration: 0.5s;
}

@keyframes zoomInOut {
  0%,
  50% {
    scale: 104%;
    transform: rotate(2deg);
  }
  25%,
  75% {
    transform: rotate(-2deg);
  }
  to {
    scale: 100%;
  }
}

.two {
  --light-background-color: #ede4db;
  --dark-backgorund-color: #d8d0c7;
  background-color: light-dark(
    var(--light-background-color),
    var(--dark-backgorund-color)
  );
  color: #736553;
}
.four {
  --light-background-color: #e8d9b9;
  --dark-backgorund-color: #ddceae;
  background-color: light-dark(
    var(--light-background-color),
    var(--dark-backgorund-color)
  );
  color: #736553;
}
.eight {
  background-color: #e9b379;
  color: white;
}
.sixteen {
  background-color: #ea9661;
  color: white;
}
.thirtytwo {
  background-color: #e77f5d;
  color: white;
}
.sixtyfour {
  background-color: #e66941;
  color: white;
}
.onehundredtwentyeight {
  background-color: #f3d96b;
  color: white;
}
.twofiftysix {
  background-color: #f2d04a;
  color: white;
}
.fivehundredtwelve {
  background-color: #ecc53f;
  color: white;
}
.onethousandtwentyfour {
  background-color: #e2ba2b;
  color: white;
}
.twothousandfortyeight {
  background-color: #e6b12a;
  color: white;
}

dialog {
  position: absolute;
  top:40%;

  padding: 2rem;
  border-radius: 12px;
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  background: light-dark(#fff, #2d2d2d);
}

.dialog-content {
  text-align: center;
}

dialog p {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

dialog button {
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  border: none;
  background: #e66941;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

dialog button:hover {
  background: #ea9661;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}
</style>
