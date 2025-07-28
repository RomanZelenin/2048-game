<script setup lang="ts">
import { computed, ref } from "vue";
import restartIcon from "./assets/restart.png";
import GameField from "./components/GameField.vue";

const gameField = ref<number[][]>([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]);

function startNewGame() {
  gameField.value = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  addRandomTile();
  addRandomTile();
}

function addRandomTile() {
  const available = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (gameField.value[i][j] === 0) {
        available.push([i, j]);
      }
    }
  }
  if (available.length) {
    const [i, j] = available[Math.floor(Math.random() * available.length)];
    gameField.value[i][j] = Math.random() < 0.9 ? 2 : 4;
  }
}

const score = computed(() => {
  return gameField.value.flat().reduce((acc, val) => acc + val, 0);
});

const best = computed((oldVal?: number) => {
  const currentScore = score.value;
  if (oldVal === undefined) {
    return currentScore;
  }
  if (currentScore > oldVal) {
    return currentScore;
  }
  return oldVal;
});

startNewGame();
</script>

<template>
  <div id="header">
    <button id="new-game" @click="startNewGame">Новая игра</button>
    <div id="score">
      Очки
      <span>{{ score }}</span>
    </div>
    <div id="best">
      Рекорд
      <span>{{ best }}</span>
    </div>
    <a id="restart" href="#" @click="startNewGame"
      ><img :src="restartIcon"
    /></a>
  </div>
  <GameField v-model="gameField" />
  <div id="footer">
    <p>Разработал Зеленин Р.А., 2025</p>
  </div>
</template>

<style scoped>
#header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
  display: flex;
  justify-content: center;
  gap: 16px;
}
#score,
#best {
  --light-background-color: #eae7da;
  --dark-backgorund-color: #c6b39c;
  background-color: light-dark(
    var(--light-background-color),
    var(--dark-backgorund-color)
  );

  --light-color: #968977;
  --dark-color: #747473;

  flex-direction: column;
  font-size: 12px;
  font-weight: bold;
  display: inline-flex;
  padding: 4px 24px;
  text-transform: uppercase;
  border-radius: 12px;
  color: light-dark(var(--light-color), var(--dark-color));
}

#score span,
#best span {
  font-size: 20px;
}

#best {
  background-color: light-dark(transparent, #c6b39c);
  border: 2px solid light-dark(#eae7da, transparent);
}
#new-game {
  --light-background-color: #8f7a66;
  --dark-background-color: #6f5a46;

  background-color: light-dark(
    var(--light-background-color),
    var(--dark-background-color)
  );
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media screen and (width >= 768px) {
    position: absolute;
    right: 16px;
    top: 16px;
  }

  @media screen and (width < 768px) {
    display: none;
  }
}

#restart {
  position: absolute;
  right: 16px;
  display: none;
  width: 30px;
  height: 30px;
  @media screen and (width < 768px) {
    display: inline-flex;
    align-self: center;
  }
}

#new-game:hover {
  filter: brightness(1.1);
  transform: scale(1.05);
}

#new-game:active {
  transform: scale(0.95);
}
#footer {
  position: absolute;
  right: 16px;
  bottom: 0px;
}
</style>
