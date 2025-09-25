// LogoAnimation コンポーネント
export class LogoAnimation {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      size: options.size || 200,
      color: options.color || 'white',
      enableDrag: options.enableDrag !== false,
      enableBounce: options.enableBounce !== false,
      enableRotation: options.enableRotation !== false,
      ...options
    };
    
    this.rotations = 0;
    this.init();
  }

  init() {
    this.createHTML();
    this.loadAnimeJS();
  }

  createHTML() {
    this.container.innerHTML = `
      <div class="animation-container">
        <div class="logo-wrapper">
          <svg
            class="logo js"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 630 630"
            style="width: ${this.options.size}px; height: ${this.options.size}px; color: ${this.options.color}; cursor: ${this.options.enableDrag ? 'grab' : 'default'};"
          >
            <path
              fill="currentColor"
              d="M577,0 C606.271092,0 630,23.7289083 630,53 L630,577 C630,606.271092 606.271092,630 577,630 L53,630 C23.7289083,630 0,606.271092 0,577 L0,53 C0,23.7289083 23.7289083,0 53,0 L577,0 Z M479.5,285.89 C426.63,285.89 392.8,319.69 392.8,364.09 C392.8,411.808 420.615238,434.63146 462.622716,452.742599 L478.7,459.64 L483.441157,461.719734 C507.57404,472.359996 521.8,479.858 521.8,498.94 C521.8,515.88 506.13,528.14 481.6,528.14 C452.4,528.14 435.89,512.91 423.2,492.19 L375.09,520.14 C392.47,554.48 427.99,580.68 482.97,580.68 C539.2,580.68 581.07,551.48 581.07,498.18 C581.07,448.74 552.67,426.75 502.37,405.18 L487.57,398.84 L485.322788,397.859899 C461.5199,387.399087 451.17,380.1172 451.17,362.89 C451.17,348.52 462.16,337.52 479.5,337.52 C496.5,337.52 507.45,344.69 517.6,362.89 L563.7,333.29 C544.2,298.99 517.14,285.89 479.5,285.89 Z M343.09,289.27 L283.89,289.27 L283.89,490.57 C283.89,520.16 271.62,527.77 252.17,527.77 C231.83,527.77 223.37,513.82 214.07,497.32 L165.88,526.495 C179.84,556.04 207.29,580.57 254.69,580.57 C307.15,580.57 343.09,552.67 343.09,491.37 L343.09,289.27 Z"
            />
          </svg>
        </div>
        <div class="controls">
          <button class="rotate-btn">rotations: ${this.rotations}</button>
        </div>
      </div>
    `;

    this.logo = this.container.querySelector('.logo.js');
    this.button = this.container.querySelector('.rotate-btn');
    
    this.setupEventListeners();
  }

  async loadAnimeJS() {
    if (typeof window.anime === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/animejs@4.0.0/lib/anime.min.js';
      script.onload = () => this.setupAnimations();
      document.head.appendChild(script);
    } else {
      this.setupAnimations();
    }
  }

  setupAnimations() {
    if (this.options.enableBounce) {
      this.startBounceAnimation();
    }
    
    if (this.options.enableDrag) {
      this.setupDrag();
    }
  }

  startBounceAnimation() {
    if (window.anime) {
      window.anime({
        targets: this.logo,
        scale: [
          { value: 1.25, duration: 200, easing: 'easeInOutQuad' },
          { value: 1, duration: 200, easing: 'easeOutElastic(1, .8)' }
        ],
        loop: true,
        delay: 250
      });
    }
  }

  setupDrag() {
    let isDragging = false;
    let startX, startY, currentX, currentY;

    this.logo.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      this.logo.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      
      this.logo.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        this.logo.style.cursor = 'grab';
        
        // スプリングアニメーションで元の位置に戻る
        if (window.anime) {
          window.anime({
            targets: this.logo,
            translateX: 0,
            translateY: 0,
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
          });
        }
      }
    });
  }

  setupEventListeners() {
    if (this.button && this.options.enableRotation) {
      this.button.addEventListener('click', () => this.rotateLogo());
    }
  }

  rotateLogo() {
    this.rotations++;
    this.button.textContent = `rotations: ${this.rotations}`;
    
    if (window.anime) {
      window.anime({
        targets: this.logo,
        rotate: this.rotations * 360,
        duration: 1500,
        easing: 'easeOutQuart'
      });
    }
  }

  // パブリックメソッド
  startBounce() {
    this.startBounceAnimation();
  }

  stopBounce() {
    if (window.anime) {
      window.anime.remove(this.logo);
    }
  }

  reset() {
    this.rotations = 0;
    this.button.textContent = `rotations: ${this.rotations}`;
    if (window.anime) {
      window.anime({
        targets: this.logo,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        scale: 1,
        duration: 500
      });
    }
  }
}
