import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { color, radius } from "../../styles/tokens";

function GameEndModal({ score, onClose }) {
  return createPortal(
    <Overlay>
      <Box>
        <Title>게임 종료!</Title>
        <ScoreText>
          최종 점수: <Strong>{score}점</Strong>
        </ScoreText>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </Box>
    </Overlay>,
    document.body,
  );
}

export default GameEndModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Box = styled.div`
  background-color: white;
  border-radius: ${radius.m};
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 280px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const ScoreText = styled.p`
  font-size: 18px;
  color: #333;
`;

const Strong = styled.span`
  font-weight: bold;
  color: ${color.success};
`;

const ConfirmButton = styled.button`
  margin-top: 8px;
  padding: 10px 32px;
  background-color: ${color.success};
  color: white;
  border: none;
  border-radius: ${radius.m};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
