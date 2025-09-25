// anime.jsをインポート
import { animate } from "animejs";

// DOM要素を取得
const box = document.getElementById("box");
const text = document.getElementById("text");

// アニメーション関数
function startAnimation() {
  // ボックスのアニメーション
  animate({
    targets: box,
    translateX: [0, 200, -200, 0],
    translateY: [0, -100, 100, 0],
    rotate: [0, 360, -360, 0],
    scale: [1, 1.5, 0.8, 1],
    duration: 3000,
    easing: "easeInOutQuad",
    loop: false,
  });

  // テキストのアニメーション
  animate({
    targets: text,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1000,
    delay: 500,
    easing: "easeOutExpo",
  });

  // 背景色のアニメーション
  animate({
    targets: box,
    background: [
      "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
      "linear-gradient(45deg, #4ecdc4, #45b7d1)",
      "linear-gradient(45deg, #45b7d1, #96ceb4)",
      "linear-gradient(45deg, #96ceb4, #feca57)",
      "linear-gradient(45deg, #feca57, #ff6b6b)",
    ],
    duration: 3000,
    easing: "easeInOutQuad",
  });
}

// リセット関数
function resetAnimation() {
  // アニメーションを停止
  animate({
    targets: [box, text],
    translateX: 0,
    translateY: 0,
    rotate: 0,
    scale: 1,
    opacity: 0,
    duration: 500,
    easing: "easeOutExpo",
  });

  // テキストの透明度をリセット
  setTimeout(() => {
    text.style.opacity = "0";
  }, 500);
}

// ページ読み込み時に自動でアニメーションを開始
window.addEventListener("load", () => {
  setTimeout(() => {
    startAnimation();
  }, 1000);
});

// グローバル関数として定義（HTMLから呼び出し可能にするため）
window.startAnimation = startAnimation;
window.resetAnimation = resetAnimation;
