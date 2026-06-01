import { useState } from "react";
import styled from "@emotion/styled";
import GamePage from "./GamePage";
import RankingPage from "./RankingPage";
import { color, radius } from "../styles/tokens";

// 라우팅 X
function MainPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "게임", content: <GamePage /> },
    { name: "랭킹", content: <RankingPage /> },
  ];

  return (
    <Wrapper>
      <Header>
        {/* 타이틀 */}
        <Title>두더지 게임</Title>
        {/* 게임, 랭킹 탭바 */}
        <TabMenu>
          {menuArr.map((tab, index) => (
            <TabItem
              key={index}
              $focused={index === currentTab}
              onClick={() => setCurrentTab(index)}
            >
              {tab.name}
            </TabItem>
          ))}
        </TabMenu>
      </Header>
      {/* 화면 */}
      {menuArr[currentTab].content}
    </Wrapper>
  );
}

export default MainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px 50px 0 50px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 30px;
  background-color: ${color.main};
  border-radius: ${radius.m};
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const TabMenu = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
`;

const TabItem = styled.li`
  padding: 5px 15px;
  border-radius: ${radius.m};
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
  background-color: ${({ $focused }) => ($focused ? "skyblue" : "white")};
  color: ${({ $focused }) => ($focused ? "white" : "skyblue")};
`;
