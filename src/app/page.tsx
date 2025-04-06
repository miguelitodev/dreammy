"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [count, setCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [isBoosted, setIsBoosted] = useState(false);
  const [boostUsedLevel, setBoostUsedLevel] = useState<number[]>([]);
  const [clickValue, setClickValue] = useState(1);

  const kcalPerSecond = level;

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + kcalPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [kcalPerSecond]);

  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    const savedLevel = localStorage.getItem("level");
    const savedLastVisit = localStorage.getItem("lastVisit");

    if (savedCount) setCount(Number(savedCount));
    if (savedLevel) setLevel(Number(savedLevel));

    if (savedLastVisit) {
      const timeAway = Math.floor((Date.now() - Number(savedLastVisit)) / 1000);
      const offlineGain = timeAway * kcalPerSecond;
      if (offlineGain > 0) {
        setCount((prev) => prev + offlineGain);
        toast.success(`+${offlineGain} kcal enquanto você estava fora!`);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("count", String(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem("level", String(level));
  }, [level]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("lastVisit", String(Date.now()));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const activateBoost = () => {
    if (isBoosted || boostUsedLevel.includes(level)) {
      toast.warning("Esse boost já foi usado nesse nível!");
      return;
    }

    setIsBoosted(true);
    setBoostUsedLevel((prev) => [...prev, level]);
    toast.info("🍬 Fúria do Açúcar ativada!");

    setTimeout(() => {
      setIsBoosted(false);
      toast.warning("⚡ Boost acabou!");
    }, 10000);
  };

  const upgradeLevel = () => {
    const cost = level * 100;
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setLevel((prev) => prev + 1);
      toast.success(`⬆️ Level up! Agora você está no nível ${level + 1}`);
    } else {
      toast.error("Você precisa de mais kcal!");
    }
  };

  const buyMegaClick = () => {
    const cost = 250 + level * 50;
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setClickValue((prev) => prev + 2);
      toast.success("💪 Mega Click comprado! Agora cada clique vale mais!");
    } else {
      toast.error(`Você precisa de ${cost} kcal para comprar Mega Click!`);
    }
  };

  const buyAutoClick = () => {
    const cost = 500 + level * 100;
    if (count >= cost) {
      setCount((prev) => prev - cost);
      setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
      toast.success("🤖 Auto Click ativado! Ganhando 1 kcal/s extra!");
    } else {
      toast.error(`Você precisa de ${cost} kcal para comprar Auto Click!`);
    }
  };

  const megaClickCost = 250 + level * 50;
  const autoClickCost = 500 + level * 100;

  return (
    <div
      className="h-screen flex flex-col justify-center items-center gap-6 p-4 bg-gradient-to-br from-rose-50 to-pink-100"
      style={{
        touchAction: "manipulation",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <Toaster position="top-center" richColors closeButton />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-pink-700 drop-shadow">
          {count} <span className="text-sm">kcal</span>
        </h1>
        <p className="text-lg mt-1 text-pink-800">
          Level {level} — {kcalPerSecond} kcal/s — +{clickValue} por clique
        </p>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.95, rotate: [-5, 5, -5, 5, 0] }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={(e) => {
          e.preventDefault();
          setCount((prev) => prev + (isBoosted ? clickValue * 10 : clickValue));
        }}
        onTouchStart={(e) => e.preventDefault()}
        className="focus:outline-none touch-none"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        <Image
          src="/dream.png"
          alt="sonho de padaria"
          width={250}
          height={250}
          className="select-none pointer-events-none"
        />
      </motion.button>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={activateBoost}
          disabled={isBoosted || boostUsedLevel.includes(level)}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            isBoosted || boostUsedLevel.includes(level)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          🍬 Ativar Fúria do Açúcar (x10 por 10s)
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={upgradeLevel}
          disabled={count < level * 100}
          className={`w-full py-2 rounded font-semibold transition ${
            count >= level * 100
              ? "bg-yellow-400 hover:bg-yellow-500 text-black"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          ⬆️ Evoluir para o Level {level + 1} ({level * 100} kcal)
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={buyMegaClick}
          className="w-full py-2 rounded font-semibold bg-purple-400 hover:bg-purple-500 text-white"
        >
          💥 Comprar Mega Click (+2 por clique) — {megaClickCost} kcal
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={buyAutoClick}
          className="w-full py-2 rounded font-semibold bg-green-400 hover:bg-green-500 text-white"
        >
          🤖 Comprar Auto Click (+1/s) — {autoClickCost} kcal
        </motion.button>
      </div>
    </div>
  );
}
