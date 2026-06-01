import { useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import theme from "../styles/theme";

interface HeaderProps {
  name: string;
}

function Header({ name }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <HeaderWrapper>
      <Left>
        <Logo>SOPT MEMBERS</Logo>
        <Text>안녕하세요, {name}님!</Text>
      </Left>
      <Nav>
        <NavItem
          isActive={location.pathname === "/mypage"}
          onClick={() => navigate("/mypage")}
        >
          내 정보
        </NavItem>
        <NavItem
          isActive={location.pathname.startsWith("/mypage/members")}
          onClick={() => navigate("/mypage/members")}
        >
          회원 조회
        </NavItem>
        <NavItem isActive={false} onClick={handleLogout}>
          로그아웃
        </NavItem>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background-color: #1b2641;
  color: ${theme.colors.white};
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Logo = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Text = styled.span`
  font-size: 12px;
  opacity: 0.7;
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
`;

const NavItem = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  color: ${({ isActive }) =>
    isActive ? theme.colors.white : "rgba(255,255,255,0.6)"};
  font-size: 14px;
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
`;
