import { useState, useEffect, useRef } from "react";

const LEVEL_CONFIG = {
  1: { size: 4, time: 15, cols: 2 },
  2: { size: 9, time: 20, cols: 3 },
  3: { size: 16, time: 30, cols: 4 },
};

export function useGame() {
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState("waiting");
  const [score, setScore] = useState(0);
  const [success, setSuccess] = useState(0);
  const [fail, setFail] = useState(0);
  const [time, setTime] = useState(LEVEL_CONFIG[1].time);
  const [holeState, setHoleState] = useState(Array(LEVEL_CONFIG[1].size).fill(null));
  const [message, setMessage] = useState("시작 버튼을 누르면 시작합니다.");

  const gameStateRef = useRef("waiting");
  const scoreRef = useRef(0);
  const successRef = useRef(0);
  const failRef = useRef(0);
  const timeRef = useRef(LEVEL_CONFIG[1].time);
  const levelRef = useRef(1);

  // 타이머 종료 시 (점수 저장 + alert)
  const endGame = () => {
    gameStateRef.current = "waiting";
    setGameState("waiting");
    setHoleState(Array(LEVEL_CONFIG[levelRef.current].size).fill(null));

    if (scoreRef.current > 0) {
      const records = JSON.parse(localStorage.getItem("mole-records") || "[]");
      records.push({
        score: scoreRef.current,
        level: levelRef.current,
        timestamp: new Date().toLocaleString("ko-KR"),
      });
      records.sort((a, b) => b.score - a.score);
      localStorage.setItem("mole-records", JSON.stringify(records));
    }
    alert(`게임 종료!\n 최종 점수: ${scoreRef.current}점\n 리셋 중 ...`);
  };

  // 중단 버튼 클릭 시 (저장 없이 즉시 초기화)
  const handleStop = () => {
    if (gameStateRef.current !== "playing") return;
    gameStateRef.current = "waiting";
    scoreRef.current = 0;
    successRef.current = 0;
    failRef.current = 0;
    timeRef.current = LEVEL_CONFIG[levelRef.current].time;
    setGameState("waiting");
    setScore(0);
    setSuccess(0);
    setFail(0);
    setTime(LEVEL_CONFIG[levelRef.current].time);
    setHoleState(Array(LEVEL_CONFIG[levelRef.current].size).fill(null));
    setMessage("시작 버튼을 누르면 시작합니다.");
  };

  // 레벨 변경 (게임 중 변경 불가)
  const handleLevelChange = (newLevel) => {
    if (gameStateRef.current === "playing") return;
    levelRef.current = newLevel;
    setLevel(newLevel);
    setTime(LEVEL_CONFIG[newLevel].time);
    timeRef.current = LEVEL_CONFIG[newLevel].time;
    setHoleState(Array(LEVEL_CONFIG[newLevel].size).fill(null));
  };

  // 타이머
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      if (gameStateRef.current !== "playing") return;
      timeRef.current -= 1;
      setTime(timeRef.current);
      if (timeRef.current <= 0) {
        endGame();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // 두더지 / 폭탄 스폰
  useEffect(() => {
    if (gameState !== "playing") return;

    const config = LEVEL_CONFIG[levelRef.current];

    const spawnTimer = setInterval(() => {
      const idx = Math.floor(Math.random() * config.size);
      const type = Math.random() < 0.7 ? "mole" : "bomb";

      setHoleState((prev) => {
        if (prev[idx] !== null) return prev;
        const next = [...prev];
        next[idx] = type;
        return next;
      });

      setTimeout(() => {
        setHoleState((prev) => {
          const next = [...prev];
          if (next[idx] === type) next[idx] = null;
          return next;
        });
      }, 1500);
    }, 1000);

    return () => clearInterval(spawnTimer);
  }, [gameState]);

  // 구멍 클릭
  const handleHoleClick = (index) => {
    if (gameStateRef.current !== "playing") return;
    const type = holeState[index];
    if (!type || type === "hit") return;

    if (type === "mole") {
      scoreRef.current += 1;
      successRef.current += 1;
      setScore(scoreRef.current);
      setSuccess(successRef.current);
      setMessage("두더지를 잡았다!");

      setHoleState((prev) => {
        const next = [...prev];
        next[index] = "hit";
        return next;
      });

      setTimeout(() => {
        setHoleState((prev) => {
          const next = [...prev];
          if (next[index] === "hit") next[index] = null;
          return next;
        });
      }, 700);
    } else if (type === "bomb") {
      scoreRef.current -= 1;
      failRef.current += 1;
      setScore(scoreRef.current);
      setFail(failRef.current);
      setMessage("땡!");

      setHoleState((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });
    }
  };

  // 시작 버튼 클릭
  const handleStart = () => {
    const config = LEVEL_CONFIG[levelRef.current];
    scoreRef.current = 0;
    successRef.current = 0;
    failRef.current = 0;
    gameStateRef.current = "playing";
    timeRef.current = config.time;
    setScore(0);
    setSuccess(0);
    setFail(0);
    setTime(config.time);
    setHoleState(Array(config.size).fill(null));
    setGameState("playing");
    setMessage("게임이 시작되었습니다!");
  };

  return {
    level,
    cols: LEVEL_CONFIG[level].cols,
    gameState,
    score,
    success,
    fail,
    time,
    holeState,
    message,
    handleStart,
    handleStop,
    handleHoleClick,
    handleLevelChange,
  };
}
