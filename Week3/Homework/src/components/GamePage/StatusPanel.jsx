import styled from "@emotion/styled";
import { color, radius } from "../../styles/tokens";

function StatusPanel({ time, score, success, fail, message }) {
  return (
    <Panel>
      <WideCard>
        <Label>남은 시간</Label>
        <Value>{time}</Value>
      </WideCard>

      <WideCard>
        <Label>총 점수</Label>
        <Value>{score}</Value>
      </WideCard>

      <Card>
        <SuccessLabel>성공</SuccessLabel>
        <Value>{success}</Value>
      </Card>
      <Card>
        <FailLabel>실패</FailLabel>
        <Value>{fail}</Value>
      </Card>

      <WideCard>
        <Label>안내 메시지</Label>
        <MessageValue>{message}</MessageValue>
      </WideCard>
    </Panel>
  );
}

export default StatusPanel;

const Panel = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 120px);
  gap: 10px;
  border-radius: ${radius.m};
  width: 300px;
  padding-top: 15px;
  align-self: flex-start;
`;

const WideCard = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background-color: ${color.main};
  border-radius: ${radius.m};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background-color: ${color.main};
  border-radius: ${radius.m};
  flex: 1;
`;

const Label = styled.span`
  font-size: 10px;
  margin-bottom: 5px;
`;

const SuccessLabel = styled(Label)`
  color: ${color.success};
`;

const FailLabel = styled(Label)`
  color: ${color.fail};
`;

const Value = styled.span`
  font-size: 28px;
  font-weight: bold;
`;

const MessageValue = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
