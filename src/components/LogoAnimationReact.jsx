import React, { useEffect, useRef, useState } from "react";

// LogoAnimation React コンポーネント
export const LogoAnimationReact = ({
  size = 200,
  color = "white",
  enableDrag = true,
  enableBounce = true,
  enableRotation = true,
}) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  const [rotations, setRotations] = useState(0);
  const logoAnimationRef = useRef(null);

  useEffect(() => {
    // Anime.js を動的に読み込み
    const loadAnimeJS = () => {
      return new Promise((resolve) => {
        if (typeof window.anime !== "undefined") {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/animejs@4.0.0/lib/anime.min.js";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const initAnimation = async () => {
      await loadAnimeJS();

      if (logoRef.current && window.anime) {
        // バウンスアニメーション
        if (enableBounce) {
          window.anime({
            targets: logoRef.current,
            scale: [
              { value: 1.25, duration: 200, easing: "easeInOutQuad" },
              { value: 1, duration: 200, easing: "easeOutElastic(1, .8)" },
            ],
            loop: true,
            delay: 250,
          });
        }

        // ドラッグ機能
        if (enableDrag) {
          setupDrag();
        }
      }
    };

    initAnimation();

    return () => {
      // クリーンアップ
      if (logoRef.current && window.anime) {
        window.anime.remove(logoRef.current);
      }
    };
  }, [enableBounce, enableDrag]);

  const setupDrag = () => {
    let isDragging = false;
    let startX, startY, currentX, currentY;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      logoRef.current.style.cursor = "grabbing";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      currentX = e.clientX - startX;
      currentY = e.clientY - startY;

      logoRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        logoRef.current.style.cursor = "grab";

        // スプリングアニメーションで元の位置に戻る
        if (window.anime) {
          window.anime({
            targets: logoRef.current,
            translateX: 0,
            translateY: 0,
            duration: 1000,
            easing: "easeOutElastic(1, .8)",
          });
        }
      }
    };

    if (logoRef.current) {
      logoRef.current.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        if (logoRef.current) {
          logoRef.current.removeEventListener("mousedown", handleMouseDown);
        }
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  };

  const rotateLogo = () => {
    if (!enableRotation) return;

    const newRotations = rotations + 1;
    setRotations(newRotations);

    if (window.anime && logoRef.current) {
      window.anime({
        targets: logoRef.current,
        rotate: newRotations * 360,
        duration: 1500,
        easing: "easeOutQuart",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          ref={logoRef}
          className="logo js"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 630 630"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            color: color,
            cursor: enableDrag ? "grab" : "default",
          }}
        >
          <path
            fill="currentColor"
            d="M577,0 C606.271092,0 630,23.7289083 630,53 L630,577 C630,606.271092 606.271092,630 577,630 L53,630 C23.7289083,630 0,606.271092 0,577 L0,53 C0,23.7289083 23.7289083,0 53,0 L577,0 Z M479.5,285.89 C426.63,285.89 392.8,319.69 392.8,364.09 C392.8,411.808 420.615238,434.63146 462.622716,452.742599 L478.7,459.64 L483.441157,461.719734 C507.57404,472.359996 521.8,479.858 521.8,498.94 C521.8,515.88 506.13,528.14 481.6,528.14 C452.4,528.14 435.89,512.91 423.2,492.19 L375.09,520.14 C392.47,554.48 427.99,580.68 482.97,580.68 C539.2,580.68 581.07,551.48 581.07,498.18 C581.07,448.74 552.67,426.75 502.37,405.18 L487.57,398.84 L485.322788,397.859899 C461.5199,387.399087 451.17,380.1172 451.17,362.89 C451.17,348.52 462.16,337.52 479.5,337.52 C496.5,337.52 507.45,344.69 517.6,362.89 L563.7,333.29 C544.2,298.99 517.14,285.89 479.5,285.89 Z M343.09,289.27 L283.89,289.27 L283.89,490.57 C283.89,520.16 271.62,527.77 252.17,527.77 C231.83,527.77 223.37,513.82 214.07,497.32 L165.88,526.495 C179.84,556.04 207.29,580.57 254.69,580.57 C307.15,580.57 343.09,552.67 343.09,491.37 L343.09,289.27 Z"
          />
        </svg>
      </div>
      {enableRotation && (
        <div style={{ marginTop: "20px" }}>
          <button
            ref={buttonRef}
            onClick={rotateLogo}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007acc",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            rotations: {rotations}
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoAnimationReact;
