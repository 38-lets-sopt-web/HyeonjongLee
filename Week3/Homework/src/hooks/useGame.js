import { useState, useEffect, useRef } from "react";

export function useGame() {
  const [gameState, setGameState] = useState("waiting");
  const [score, setScore] = useState(0);
  const [success, setSuccess] = useState(0);
  const [fail, setFail] = useState(0);
  const [time, setTime] = useState(15);
  const [holeState, setHoleState] = useState(Array(4).fill(null));
  const [message, setMessage] = useState("시작 버튼을 누르면 시작합니다.");

  const gameStateRef = useRef("waiting");
  const scoreRef = useRef(0);
  const successRef = useRef(0);
  const failRef = useRef(0);
  const timeRef = useRef(15);

  const endGame = () => {
    gameStateRef.current = "waiting";
    setGameState("waiting");
    setHoleState(Array(4).fill(null));

    // 점수가 0보다 크면 저장
    if (scoreRef.current > 0) {
      const records = JSON.parse(localStorage.getItem("mole-records") || "[]");
      records.push({
        score: scoreRef.current,
        level: 1,
        timestamp: new Date().toLocaleString("ko-KR"),
      });
      records.sort((a, b) => b.score - a.score); // 점수 기준으로 정렬
      localStorage.setItem("mole-records", JSON.stringify(records));
    }
    // 최종 점수 alert
    alert(`게임 종료!\n 최종 점수: ${scoreRef.current}점\n 리셋 중 ...`);
  };

  // 스폰이랑 합칠 시 타이머 오차 발생
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      // 게임이 종료 되었는데 한번 더 실행되는 경우를 막기 위해
      if (gameStateRef.current !== "playing") return;
      timeRef.current -= 1;
      setTime(timeRef.current);
      if (timeRef.current <= 0) {
        endGame();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // 두더지 폭탄 스폰
  useEffect(() => {
    if (gameState !== "playing") return;

    const spawnTimer = setInterval(() => {
      const idx = Math.floor(Math.random() * 4);
      const type = Math.random() < 0.7 ? "mole" : "bomb";

      setHoleState((prev) => {
        if (prev[idx] !== null) return prev; // 이미 차있으면 스킵
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

      // hit 700ms 후 구멍을 null로
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
    scoreRef.current = 0;
    successRef.current = 0;
    failRef.current = 0;
    gameStateRef.current = "playing";
    timeRef.current = 15;
    setScore(0);
    setSuccess(0);
    setFail(0);
    setTime(15);
    setHoleState(Array(4).fill(null));
    setGameState("playing");
    setMessage("시작 버튼을 누르면 시작합니다.");
  };

  // 정지 버튼 클릭
  const handleStop = () => {
    if (gameStateRef.current !== "playing") return;
    endGame();
  };
  return {
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
  };
}
