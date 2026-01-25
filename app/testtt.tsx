"use client"

import React, { useMemo, useRef, useState } from "react";

type Side = "heads" | "tails";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function CoinFlip3D() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<Side>("heads");
  const coinRef = useRef<HTMLDivElement | null>(null);

  // You can tune these for feel
  const FLIP_MS = 1800;

  async function flip() {
    if (isFlipping) return;
    setIsFlipping(true);

    // ✅ In production: get this from your server
    // const data = await fetch("/api/coinflip", { method: "POST" }).then(r => r.json());
    // const serverResult: Side = data.result;
    const serverResult: Side = Math.random() < 0.5 ? "heads" : "tails";

    setResult(serverResult);

    const coin = coinRef.current;
    if (!coin) return;

    // Reset animation
    coin.classList.remove("coin-anim-heads", "coin-anim-tails", "coin-wobble");
    // Force reflow so re-adding class restarts animation
    void coin.offsetWidth;

    // Add flip animation class that lands on the result
    coin.classList.add(serverResult === "heads" ? "coin-anim-heads" : "coin-anim-tails");

    // Add wobble near the end (small realism touch)
    setTimeout(() => {
      coin.classList.add("coin-wobble");
    }, FLIP_MS - 380);

    setTimeout(() => {
      setIsFlipping(false);
    }, FLIP_MS);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">Coin Flip</div>
        <button
          onClick={flip}
          disabled={isFlipping}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {isFlipping ? "Flipping..." : "Flip"}
        </button>
      </div>

      <div className="text-sm mb-4">
        Result: <span className="font-semibold">{result.toUpperCase()}</span>
      </div>

      <div className="flex items-center justify-center">
        <div className="scene">
          <div ref={coinRef} className="coin">
            <div className="face heads">
              <div className="label">H</div>
            </div>
            <div className="face tails">
              <div className="label">T</div>
            </div>
            <div className="edge" />
          </div>
        </div>
      </div>

      <style>{`
        .scene {
          width: 180px;
          height: 180px;
          perspective: 900px;
          display: grid;
          place-items: center;
        }

        .coin {
          position: relative;
          width: 140px;
          height: 140px;
          transform-style: preserve-3d;
          transform: rotateX(0deg) rotateY(0deg);
        }

        .face {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          backface-visibility: hidden;
          display: grid;
          place-items: center;
          border: 4px solid rgba(0,0,0,0.25);
          box-shadow: 0 12px 28px rgba(0,0,0,0.18);
          background: radial-gradient(circle at 30% 30%, #fff7cc, #d2a63c 60%, #9a6d12 100%);
        }

        .heads {
          transform: translateZ(10px);
        }

        .tails {
          transform: rotateY(180deg) translateZ(10px);
          background: radial-gradient(circle at 30% 30%, #e9f2ff, #8bb4ff 60%, #2f5bbd 100%);
        }

        /* coin edge thickness illusion */
        .edge {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          transform: rotateX(90deg);
          background: linear-gradient(90deg, #8a6114, #f3d37a, #8a6114);
          height: 20px;
          top: 60px;
          filter: blur(0.1px);
          opacity: 0.9;
        }

        .label {
          font-size: 52px;
          font-weight: 900;
          color: rgba(0,0,0,0.75);
          text-shadow: 0 2px 0 rgba(255,255,255,0.5);
          user-select: none;
        }

        /* Flip animations
           We spin around X (toss) + Y (face swap). 
           Final Y determines heads vs tails:
           heads => Y ends at 0deg (mod 360)
           tails => Y ends at 180deg (mod 360)
        */

        .coin-anim-heads {
          animation: flipHeads ${FLIP_MS}ms cubic-bezier(0.15, 0.85, 0.2, 1) forwards;
        }

        .coin-anim-tails {
          animation: flipTails ${FLIP_MS}ms cubic-bezier(0.15, 0.85, 0.2, 1) forwards;
        }

        @keyframes flipHeads {
          0%   { transform: rotateX(0deg) rotateY(0deg) translateY(0px); }
          25%  { transform: rotateX(540deg) rotateY(360deg) translateY(-22px); }
          60%  { transform: rotateX(1260deg) rotateY(720deg) translateY(-10px); }
          100% { transform: rotateX(1440deg) rotateY(720deg) translateY(0px); } /* Y ends at 0 mod 360 */
        }

        @keyframes flipTails {
          0%   { transform: rotateX(0deg) rotateY(0deg) translateY(0px); }
          25%  { transform: rotateX(540deg) rotateY(450deg) translateY(-22px); }
          60%  { transform: rotateX(1260deg) rotateY(900deg) translateY(-10px); }
          100% { transform: rotateX(1440deg) rotateY(900deg) translateY(0px); } /* Y ends at 180 mod 360 */
        }

        /* wobble near end */
        .coin-wobble {
          animation: wobble 360ms ease-out;
        }
        @keyframes wobble {
          0%   { transform: rotateX(1440deg) rotateY(var(--endY, 0deg)); }
          30%  { transform: rotateX(1440deg) rotateY(calc(var(--endY, 0deg) + 6deg)); }
          60%  { transform: rotateX(1440deg) rotateY(calc(var(--endY, 0deg) - 4deg)); }
          100% { transform: rotateX(1440deg) rotateY(var(--endY, 0deg)); }
        }
      `}</style>
    </div>
    // JUST A TEST FOT GITHUB
    // JUST A TEST FOT GITHUB
    // JUST A TEST FOT GITHUB
  );
}
