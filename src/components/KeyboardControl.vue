<script setup lang="ts">
import upIcon from "../assets/up-arrow.png";

function ClickRight() {
  const event = new KeyboardEvent("keydown", {
    key: "ArrowRight",
    code: "ArrowRight",
    keyCode: 39,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
}
function ClickLeft() {
  const event = new KeyboardEvent("keydown", {
    key: "ArrowLeft",
    code: "ArrowLeft",
    keyCode: 37,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
}

function ClickUp() {
  const event = new KeyboardEvent("keydown", {
    key: "ArrowUp",
    code: "ArrowUp",
    keyCode: 38,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
}

function ClickDown() {
  const event = new KeyboardEvent("keydown", {
    key: "ArrowDown",
    code: "ArrowDown",
    keyCode: 40,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
}
</script>

<template>
  <div class="game-keys">
    <div class="key" @click="ClickUp()"><img :src="upIcon" /></div>
    <div class="keys-row">
      <div class="key" @click="ClickLeft()">
        <img :src="upIcon" style="transform: rotate(-90deg)" />
      </div>
      <div class="key" @click="ClickDown()">
        <img :src="upIcon" style="transform: rotate(-180deg)" />
      </div>
      <div class="key" @click="ClickRight()">
        <img :src="upIcon" style="transform: rotate(90deg)" />
      </div>
    </div>
  </div>
</template>

<style>
.game-keys {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  color: black;
}
.keys-row {
  display: flex;
  gap: 8px;
}
.key {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: aliceblue;
  border-radius: 6px;
  cursor: pointer;
}

.key img {
  width: 24px;
  height: 24px;
}
</style>
