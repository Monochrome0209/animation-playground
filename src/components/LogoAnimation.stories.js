import { LogoAnimationReact } from "./LogoAnimationReact.jsx";

export default {
  title: "Components/LogoAnimation",
  component: LogoAnimationReact,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "gradient",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#333333",
        },
        {
          name: "gradient",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
      ],
    },
  },
  argTypes: {
    size: {
      control: { type: "range", min: 100, max: 400, step: 10 },
      description: "ロゴのサイズ（px）",
    },
    color: {
      control: { type: "color" },
      description: "ロゴの色",
    },
    enableDrag: {
      control: { type: "boolean" },
      description: "ドラッグ機能を有効にする",
    },
    enableBounce: {
      control: { type: "boolean" },
      description: "バウンスアニメーションを有効にする",
    },
    enableRotation: {
      control: { type: "boolean" },
      description: "回転機能を有効にする",
    },
  },
};

// デフォルトストーリー
export const Default = {
  args: {
    size: 200,
    color: "white",
    enableDrag: true,
    enableBounce: true,
    enableRotation: true,
  },
};

// 大きなロゴ
export const Large = {
  args: {
    size: 300,
    color: "#ff6b6b",
    enableDrag: true,
    enableBounce: true,
    enableRotation: true,
  },
};

// 小さなロゴ
export const Small = {
  args: {
    size: 120,
    color: "#4ecdc4",
    enableDrag: true,
    enableBounce: true,
    enableRotation: true,
  },
};

// ドラッグ無効
export const NoDrag = {
  args: {
    size: 200,
    color: "white",
    enableDrag: false,
    enableBounce: true,
    enableRotation: true,
  },
};

// バウンス無効
export const NoBounce = {
  args: {
    size: 200,
    color: "white",
    enableDrag: true,
    enableBounce: false,
    enableRotation: true,
  },
};

// 回転無効
export const NoRotation = {
  args: {
    size: 200,
    color: "white",
    enableDrag: true,
    enableBounce: true,
    enableRotation: false,
  },
};

// カスタムカラー
export const CustomColor = {
  args: {
    size: 200,
    color: "#ffd93d",
    enableDrag: true,
    enableBounce: true,
    enableRotation: true,
  },
};

// ミニマル（アニメーション無し）
export const Minimal = {
  args: {
    size: 200,
    color: "#6c5ce7",
    enableDrag: false,
    enableBounce: false,
    enableRotation: false,
  },
};
