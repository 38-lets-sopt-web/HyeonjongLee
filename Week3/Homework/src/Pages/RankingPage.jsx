import styled from "@emotion/styled";
import { useState } from "react";
import { color, radius } from "../styles/tokens";

function RankingPage() {
  const [record, setRecord] = useState(() =>
    JSON.parse(localStorage.getItem("mole-records") || "[]"),
  );

  const handleReset = () => {
    localStorage.removeItem("mole-records");
    setRecord([]);
  };

  return (
    <Wrapper>
      <TableWrapper>
        <Header>
          <RankingTitle>랭킹 보드</RankingTitle>
          <Reset onClick={handleReset}>기록 초기화</Reset>
        </Header>
        <Table>
          <thead>
            <tr>
              <Th>순위</Th>
              <Th>레벨</Th>
              <Th>점수</Th>
              <Th>기록 시각</Th>
            </tr>
          </thead>
          <tbody>
            {record.length === 0 ? (
              <tr>
                <EmptyTd colSpan={4}>기록이 없습니다.</EmptyTd>
              </tr>
            ) : (
              record.map((record, index) => (
                <tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>Level {record.level}</Td>
                  <Td>{record.score}점</Td>
                  <Td>{record.timestamp}</Td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrapper>
  );
}

export default RankingPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${color.main};
  padding-bottom: 20px;
`;

const RankingTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Reset = styled.button`
  border-radius: ${radius.m};
  border: none;
  padding: 6px 16px;
  background-color: ${color.fail};
  color: white;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  background-color: #c4f2ff;
  border-radius: ${radius.m};
  padding: 20px 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px 16px;
  text-align: center;
  font-size: 13px;
  color: black;
`;

const Td = styled.td`
  padding: 10px 16px;
  text-align: center;
  font-size: 14px;
  border-bottom: 0.5px solid gray;
`;
const EmptyTd = styled.td`
  padding: 24px;
  text-align: center;
  color: black;
`;
