import styled from "@emotion/styled";
import Mole from "./Mole";
import { color, radius } from "../../styles/tokens";

function GameBoard({ gameState, onStart, onStop, holeState, onHoleClick }) {
  const isPlaying = gameState === "playing";

  return (
    <Wrapper>
      <BoardHeader>
        <ButtonGroup>
          {/* 게임 중일 때는 시작 버튼 비활성화 */}
          <StartButton onClick={onStart} disabled={isPlaying}>
            시작
          </StartButton>
          {/* 게임 중이 아닐 때는 활성화 */}
          <StopButton onClick={onStop} disabled={!isPlaying}>
            정지
          </StopButton>
        </ButtonGroup>
      </BoardHeader>
      <MoleWrapper>
        <Grid>
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
  justify-content: flex-end;
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
`;

const MoleWrapper = styled.div`
  width: 70%;

  background-color: white;
  border-radius: ${radius.m};
  padding: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
