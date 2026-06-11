import styled from "@emotion/styled";
import Mole from "./Mole";
import { color, radius } from "../../styles/tokens";

function GameBoard({ gameState, onStart, onStop, holeState, onHoleClick, level, cols, onLevelChange }) {
  const isPlaying = gameState === "playing";

  return (
    <Wrapper>
      <BoardHeader>
        <LevelGroup>
          {[1, 2, 3].map((lv) => (
            <LevelButton
              key={lv}
              onClick={() => onLevelChange(lv)}
              $active={level === lv}
              disabled={isPlaying}
            >
              Lv.{lv}
            </LevelButton>
          ))}
        </LevelGroup>
        <ButtonGroup>
          <StartButton onClick={onStart} disabled={isPlaying}>
            시작
          </StartButton>
          <StopButton onClick={onStop} disabled={!isPlaying}>
            중단
          </StopButton>
        </ButtonGroup>
      </BoardHeader>
      <MoleWrapper>
        <Grid $cols={cols}>
          {holeState.map((state, index) => (
            <Mole
              key={index}
              state={state}
              onClick={() => onHoleClick(index)}
            />
          ))}
        </Grid>
      </MoleWrapper>
    </Wrapper>
  );
}

export default GameBoard;

const Wrapper = styled.div`
  background-color: ${color.main};
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.m};
  margin: 15px 0 0 20px;
  padding: 20px;
  gap: 30px;
`;

const BoardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LevelGroup = styled.div`
  display: flex;
  gap: 6px;
`;

const LevelButton = styled.button`
  padding: 5px 14px;
  border: 2px solid ${(props) => (props.$active ? color.success : "#aaa")};
  border-radius: ${radius.s};
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? color.success : "white")};
  color: ${(props) => (props.$active ? "white" : "#555")};
  transition: background-color 0.15s, color 0.15s;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const StartButton = styled.button`
  padding: 5px 15px;
  border: none;
  border-radius: ${radius.m};
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${color.success};
  color: white;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const StopButton = styled.button`
  padding: 5px 15px;
  border: none;
  border-radius: ${radius.m};
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${color.fail};
  color: white;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const MoleWrapper = styled.div`
  width: 70%;
  background-color: white;
  border-radius: ${radius.m};
  padding: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$cols}, 1fr);
  gap: 16px;
`;
