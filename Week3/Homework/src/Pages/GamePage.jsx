import styled from "@emotion/styled";
import StatusPanel from "../components/GamePage/StatusPanel";
import GameBoard from "../components/GamePage/GameBoard";
import GameEndModal from "../components/GamePage/GameEndModal";
import { useGame } from "../hooks/useGame";

function GamePage() {
  const {
    level,
    cols,
    score,
    success,
    fail,
    time,
    gameState,
    message,
    showModal,
    finalScore,
    handleStart,
    handleStop,
    holeState,
    handleHoleClick,
    handleLevelChange,
    handleModalClose,
  } = useGame();

  return (
    <>
      <Wrapper>
        <StatusPanel
          score={score}
          success={success}
          fail={fail}
          time={time}
          gameState={gameState}
          message={message}
        />
        <GameBoard
          gameState={gameState}
          onStart={handleStart}
          onStop={handleStop}
          holeState={holeState}
          onHoleClick={handleHoleClick}
          level={level}
          cols={cols}
          onLevelChange={handleLevelChange}
        />
      </Wrapper>
      {showModal && <GameEndModal score={finalScore} onClose={handleModalClose} />}
    </>
  );
}

export default GamePage;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20px;
  align-items: flex-start;
`;
