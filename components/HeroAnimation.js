"use client";

const HeroAnimation = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 320 240"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          /* Document */
          .pdf-doc {
            fill: #f8fafc;
            stroke: #e2e8f0;
            stroke-width: 2;
          }
          .pdf-corner {
            fill: #e2e8f0;
          }
          .pdf-label {
            fill: #94a3b8;
            font-family: system-ui, sans-serif;
            font-size: 10px;
            font-weight: 600;
          }

          /* Text lines (static content) */
          .text-line {
            fill: #cbd5e1;
            animation: fadeOut 4s ease-in-out infinite;
          }
          .text-line-short {
            fill: #cbd5e1;
            animation: fadeOut 4s ease-in-out infinite;
          }

          /* Form fields (appear after magic) */
          .form-field {
            fill: none;
            stroke: #3b82f6;
            stroke-width: 2;
            opacity: 0;
            animation: fieldAppear 4s ease-in-out infinite;
          }
          .checkbox-box {
            fill: none;
            stroke: #3b82f6;
            stroke-width: 2;
            opacity: 0;
            animation: fieldAppear 4s ease-in-out infinite;
            animation-delay: 0.1s;
          }
          .checkbox-check {
            fill: none;
            stroke: #3b82f6;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            opacity: 0;
            animation: checkAppear 4s ease-in-out infinite;
            animation-delay: 0.2s;
          }

          /* Wand */
          .wand-group {
            animation: wandMove 4s ease-in-out infinite;
            transform-origin: 210px 28px;
          }
          .wand-stick {
            fill: #1e1b4b;
          }
          .wand-stick-highlight {
            fill: #4f46e5;
          }
          .wand-tip {
            fill: #fbbf24;
          }
          .wand-star {
            fill: #fbbf24;
          }
          .wand-glow {
            fill: #fbbf24;
            opacity: 0;
            animation: glowPulse 4s ease-in-out infinite;
          }
          .wand-glow-outer {
            fill: #fef3c7;
            opacity: 0;
            animation: glowPulseOuter 4s ease-in-out infinite;
          }

          /* Sparkles */
          .sparkle {
            fill: #fbbf24;
            opacity: 0;
          }
          .sparkle-white {
            fill: #ffffff;
            opacity: 0;
          }
          .sparkle-1 { animation: sparkle1 4s ease-in-out infinite; }
          .sparkle-2 { animation: sparkle2 4s ease-in-out infinite; }
          .sparkle-3 { animation: sparkle3 4s ease-in-out infinite; }
          .sparkle-4 { animation: sparkle4 4s ease-in-out infinite; }
          .sparkle-5 { animation: sparkle5 4s ease-in-out infinite; }
          .sparkle-6 { animation: sparkle6 4s ease-in-out infinite; }
          .sparkle-7 { animation: sparkle7 4s ease-in-out infinite; }
          .sparkle-8 { animation: sparkle8 4s ease-in-out infinite; }
          .sparkle-9 { animation: sparkle9 4s ease-in-out infinite; }
          .sparkle-10 { animation: sparkle10 4s ease-in-out infinite; }
          .sparkle-11 { animation: sparkle11 4s ease-in-out infinite; }
          .sparkle-12 { animation: sparkle12 4s ease-in-out infinite; }

          /* Star sparkles */
          .star-sparkle {
            fill: #fbbf24;
            opacity: 0;
          }
          .star-sparkle-1 { animation: starSparkle1 4s ease-in-out infinite; }
          .star-sparkle-2 { animation: starSparkle2 4s ease-in-out infinite; }
          .star-sparkle-3 { animation: starSparkle3 4s ease-in-out infinite; }

          /* Animations */
          @keyframes fadeOut {
            0%, 35% { opacity: 1; }
            50%, 90% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes fieldAppear {
            0%, 40% { opacity: 0; }
            55%, 90% { opacity: 1; }
            100% { opacity: 0; }
          }

          @keyframes checkAppear {
            0%, 50% { opacity: 0; stroke-dasharray: 20; stroke-dashoffset: 20; }
            65%, 90% { opacity: 1; stroke-dashoffset: 0; }
            100% { opacity: 0; }
          }

          @keyframes wandMove {
            0% { transform: translate(40px, -30px) rotate(-20deg); opacity: 0; }
            20% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            35% { transform: translate(-15px, 15px) rotate(25deg); }
            50% { transform: translate(0, 0) rotate(0deg); }
            70% { transform: translate(40px, -30px) rotate(-20deg); opacity: 0; }
            100% { transform: translate(40px, -30px) rotate(-20deg); opacity: 0; }
          }

          @keyframes glowPulse {
            0%, 20% { opacity: 0; transform: scale(1); }
            30%, 45% { opacity: 0.8; transform: scale(1.8); }
            55%, 100% { opacity: 0; transform: scale(1); }
          }

          @keyframes glowPulseOuter {
            0%, 18% { opacity: 0; transform: scale(1); }
            28%, 42% { opacity: 0.4; transform: scale(2.5); }
            52%, 100% { opacity: 0; transform: scale(1); }
          }

          @keyframes sparkle1 {
            0%, 25% { opacity: 0; transform: translate(0, 0) scale(0); }
            35% { opacity: 1; transform: translate(-20px, 10px) scale(1); }
            50%, 100% { opacity: 0; transform: translate(-30px, 20px) scale(0); }
          }
          @keyframes sparkle2 {
            0%, 28% { opacity: 0; transform: translate(0, 0) scale(0); }
            38% { opacity: 1; transform: translate(-15px, -15px) scale(1); }
            53%, 100% { opacity: 0; transform: translate(-25px, -25px) scale(0); }
          }
          @keyframes sparkle3 {
            0%, 30% { opacity: 0; transform: translate(0, 0) scale(0); }
            40% { opacity: 1; transform: translate(-25px, 0px) scale(1); }
            55%, 100% { opacity: 0; transform: translate(-40px, 0px) scale(0); }
          }
          @keyframes sparkle4 {
            0%, 32% { opacity: 0; transform: translate(0, 0) scale(0); }
            42% { opacity: 1; transform: translate(-10px, 20px) scale(1); }
            57%, 100% { opacity: 0; transform: translate(-15px, 35px) scale(0); }
          }
          @keyframes sparkle5 {
            0%, 27% { opacity: 0; transform: translate(0, 0) scale(0); }
            37% { opacity: 1; transform: translate(-30px, 5px) scale(1); }
            52%, 100% { opacity: 0; transform: translate(-45px, 8px) scale(0); }
          }

          @keyframes sparkle6 {
            0%, 29% { opacity: 0; transform: translate(0, 0) scale(0); }
            39% { opacity: 1; transform: translate(-35px, -10px) scale(1.2); }
            54%, 100% { opacity: 0; transform: translate(-50px, -15px) scale(0); }
          }
          @keyframes sparkle7 {
            0%, 31% { opacity: 0; transform: translate(0, 0) scale(0); }
            41% { opacity: 1; transform: translate(-5px, 25px) scale(0.8); }
            56%, 100% { opacity: 0; transform: translate(-8px, 40px) scale(0); }
          }
          @keyframes sparkle8 {
            0%, 26% { opacity: 0; transform: translate(0, 0) scale(0); }
            36% { opacity: 1; transform: translate(-40px, 15px) scale(1); }
            51%, 100% { opacity: 0; transform: translate(-55px, 25px) scale(0); }
          }
          @keyframes sparkle9 {
            0%, 33% { opacity: 0; transform: translate(0, 0) scale(0); }
            43% { opacity: 1; transform: translate(-12px, -20px) scale(0.9); }
            58%, 100% { opacity: 0; transform: translate(-18px, -30px) scale(0); }
          }
          @keyframes sparkle10 {
            0%, 24% { opacity: 0; transform: translate(0, 0) scale(0); }
            34% { opacity: 1; transform: translate(-50px, 0) scale(1.1); }
            49%, 100% { opacity: 0; transform: translate(-70px, 0) scale(0); }
          }
          @keyframes sparkle11 {
            0%, 30% { opacity: 0; transform: translate(0, 0) scale(0); }
            40% { opacity: 1; transform: translate(-20px, -25px) scale(0.7); }
            55%, 100% { opacity: 0; transform: translate(-30px, -40px) scale(0); }
          }
          @keyframes sparkle12 {
            0%, 28% { opacity: 0; transform: translate(0, 0) scale(0); }
            38% { opacity: 1; transform: translate(-45px, 20px) scale(1); }
            53%, 100% { opacity: 0; transform: translate(-65px, 30px) scale(0); }
          }

          /* Star sparkle animations - 4-pointed stars that twinkle */
          @keyframes starSparkle1 {
            0%, 22% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
            32% { opacity: 1; transform: translate(-25px, -5px) scale(1) rotate(45deg); }
            47%, 100% { opacity: 0; transform: translate(-35px, -10px) scale(0) rotate(90deg); }
          }
          @keyframes starSparkle2 {
            0%, 26% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
            36% { opacity: 1; transform: translate(-15px, 18px) scale(1.2) rotate(-45deg); }
            51%, 100% { opacity: 0; transform: translate(-22px, 28px) scale(0) rotate(-90deg); }
          }
          @keyframes starSparkle3 {
            0%, 30% { opacity: 0; transform: translate(0, 0) scale(0) rotate(0deg); }
            40% { opacity: 1; transform: translate(-38px, 8px) scale(0.9) rotate(30deg); }
            55%, 100% { opacity: 0; transform: translate(-55px, 12px) scale(0) rotate(60deg); }
          }

          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            .pdf-doc { fill: #1e293b; stroke: #334155; }
            .pdf-corner { fill: #334155; }
            .pdf-label { fill: #64748b; }
            .text-line, .text-line-short { fill: #475569; }
          }
        `}</style>

        {/* Document */}
        <g>
          {/* Main document body */}
          <rect
            className="pdf-doc"
            x="60"
            y="30"
            width="160"
            height="200"
            rx="4"
          />
          {/* Folded corner */}
          <path
            className="pdf-corner"
            d="M195 30 L220 30 L220 55 L195 55 Z"
          />
          <path
            className="pdf-corner"
            d="M195 30 L195 55 L220 55"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          {/* PDF label */}
          <text className="pdf-label" x="75" y="50">PDF</text>
        </g>

        {/* Text lines (will fade out) */}
        <g>
          <rect className="text-line" x="80" y="70" width="100" height="8" rx="2" />
          <rect className="text-line-short" x="80" y="85" width="70" height="8" rx="2" style={{ animationDelay: '0.05s' }} />

          <rect className="text-line" x="80" y="110" width="90" height="8" rx="2" style={{ animationDelay: '0.1s' }} />
          <rect className="text-line-short" x="80" y="125" width="60" height="8" rx="2" style={{ animationDelay: '0.15s' }} />

          <rect className="text-line" x="80" y="150" width="80" height="8" rx="2" style={{ animationDelay: '0.2s' }} />

          <rect className="text-line" x="80" y="175" width="95" height="8" rx="2" style={{ animationDelay: '0.25s' }} />
          <rect className="text-line-short" x="80" y="190" width="50" height="8" rx="2" style={{ animationDelay: '0.3s' }} />
        </g>

        {/* Form fields (will appear) */}
        <g>
          <rect className="form-field" x="78" y="68" width="104" height="28" rx="3" />
          <rect className="form-field" x="78" y="108" width="104" height="28" rx="3" style={{ animationDelay: '0.1s' }} />
          <rect className="form-field" x="78" y="148" width="104" height="14" rx="3" style={{ animationDelay: '0.15s' }} />

          {/* Checkbox */}
          <rect className="checkbox-box" x="78" y="173" width="16" height="16" rx="2" style={{ animationDelay: '0.2s' }} />
          <path className="checkbox-check" d="M81 181 L85 185 L91 177" style={{ animationDelay: '0.3s' }} />
          <rect className="form-field" x="100" y="173" width="82" height="16" rx="3" style={{ animationDelay: '0.25s' }} />
        </g>

        {/* Magic wand */}
        <g className="wand-group">
          {/* Wand stick - dark with highlight (pointing up-left) */}
          <rect
            className="wand-stick"
            x="248"
            y="55"
            width="50"
            height="7"
            rx="2"
            transform="rotate(220 248 58)"
          />
          <rect
            className="wand-stick-highlight"
            x="250"
            y="56"
            width="45"
            height="2"
            rx="1"
            transform="rotate(220 248 58)"
          />

          {/* Outer glow - at star tip */}
          <circle className="wand-glow-outer" cx="210" cy="28" r="22" />
          {/* Inner glow */}
          <circle className="wand-glow" cx="210" cy="28" r="14" />

          {/* Wand tip - 5-pointed star at the tip */}
          <path
            className="wand-star"
            d="M210 14 L213 24 L224 24 L215 31 L219 42 L210 35 L201 42 L205 31 L196 24 L207 24 Z"
          />
          {/* Star center highlight */}
          <circle className="wand-tip" cx="210" cy="28" r="4" />
        </g>

        {/* Sparkles - circles around star at (238, 40) */}
        <g>
          <circle className="sparkle sparkle-1" cx="238" cy="55" r="3" />
          <circle className="sparkle sparkle-2" cx="252" cy="32" r="2.5" />
          <circle className="sparkle sparkle-3" cx="225" cy="35" r="2" />
          <circle className="sparkle sparkle-4" cx="250" cy="50" r="2.5" />
          <circle className="sparkle sparkle-5" cx="222" cy="45" r="2" />
          <circle className="sparkle sparkle-6" cx="255" cy="40" r="2" />
          <circle className="sparkle-white sparkle-7" cx="238" cy="22" r="1.5" />
          <circle className="sparkle sparkle-8" cx="228" cy="55" r="2.5" />
          <circle className="sparkle-white sparkle-9" cx="252" cy="45" r="1.5" />
          <circle className="sparkle sparkle-10" cx="220" cy="30" r="2" />
          <circle className="sparkle-white sparkle-11" cx="248" cy="25" r="1.5" />
          <circle className="sparkle sparkle-12" cx="230" cy="58" r="2" />
        </g>

        {/* Star sparkles - 4-pointed stars */}
        <g>
          {/* 4-pointed star 1 */}
          <path
            className="star-sparkle star-sparkle-1"
            d="M245 48 L247 51 L250 51 L248 53 L249 56 L245 54 L241 56 L242 53 L240 51 L243 51 Z"
          />
          {/* 4-pointed star 2 */}
          <path
            className="star-sparkle star-sparkle-2"
            d="M230 52 L231 54 L233 54 L232 55.5 L232.5 57.5 L230 56 L227.5 57.5 L228 55.5 L227 54 L229 54 Z"
          />
          {/* 4-pointed star 3 */}
          <path
            className="star-sparkle star-sparkle-3"
            d="M222 38 L223.5 41 L226.5 41 L224.5 43 L225.5 46 L222 44 L218.5 46 L219.5 43 L217.5 41 L220.5 41 Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default HeroAnimation;
