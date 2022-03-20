<script setup lang="ts">
import { ref, onMounted } from "vue";
import GameControl from "../utils/GameControl";

const foodRef = ref<HTMLElement>();
const snakeRef = ref<HTMLElement>();

// 分数
const scores = ref(0);
// 难度等级
const level = ref(10);
// 游戏是否结束
const isGameOver = ref(true);
// 结束时提示错误
const showError = ref(false);

let gameControl: GameControl;

onMounted(() => {
  const foodElem = foodRef.value as HTMLElement;
  const snakeElem = snakeRef.value as HTMLElement;

  gameControl = new GameControl(foodElem, snakeElem);
  gameControl.addEatFoodListener(() => {
    scores.value += 1;
  });
  gameControl.addGameOverListener(() => {
    isGameOver.value = true;
    showError.value = true;
  });
  gameControl.level = level.value;
});

const handleStart = () => {
  isGameOver.value = false;
  showError.value = false;
  scores.value = 0;
  gameControl.start();
};
</script>

<template>
  <div class="main-view">
    <div class="main-view__panel">
      <div v-show="showError" class="main-view__error">游戏结束！</div>

      <div id="snake" ref="snakeRef">
        <div class="snake__item"></div>
      </div>
      <div id="food" ref="foodRef"></div>
    </div>
    <div class="main-view__action" @click="handleStart" v-show="isGameOver">
      开始游戏
    </div>
    <div class="main-view__footer">
      <div class="main-view__footer__scope">
        <span class="main-view__footer__label">分数：</span>
        <span class="main-view__footer__value">{{ scores }}</span>
      </div>

      <div class="main-view__footer__level">
        <span class="main-view__footer__label">难度等级：</span>
        <span class="main-view__footer__value">{{ level }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$bg-color: #b7d4a8;
.main-view {
  width: 360px;
  height: 420px;
  box-sizing: border-box;
  border: 10px solid #000;
  border-radius: 16px;
  background-color: $bg-color;

  display: flex;
  flex-direction: column;
  align-items: center;

  &__error {
    color: #f44;
  }

  &__panel {
    box-sizing: border-box;
    width: 304px;
    height: 304px;
    border: 2px solid #000;
    margin-top: 18px;
    position: relative;

    & > #snake {
      .snake__item {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #000;
        z-index: 101;
        border: 1px solid $bg-color;
      }

      .snake__item:first-child {
        border-color: #fff;
      }
    }

    & > #food {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #33a1d0;
      z-index: 100;
    }
  }

  &__action {
    margin-top: 6px;
    border: 2px dashed #000;
    padding: 4px 6px;
    cursor: pointer;
  }

  &__footer {
    flex: 1;
    width: 304px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 18px;

    &__label {
      font-size: 13px;
    }

    &__value {
      font-size: 15px;
      font-weight: bold;
      color: #f44;
    }
  }
}
</style>
