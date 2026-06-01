import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import theme from "../styles/theme";
import { postSignIn } from "../api/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await postSignIn(username, password);
      localStorage.setItem("userId", String(response.data.userId));
      navigate("/mypage");
    } catch {
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>SOPT MEMBERS</Title>
      <Field>
        <Label>아이디</Label>
        <Input
          placeholder="아이디를 입력해주세요."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Field>
      <Field>
        <Label>비밀번호</Label>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <SignUpButton onClick={() => navigate("/signup")}>회원가입</SignUpButton>
    </Container>
  );
}

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
  background-color: ${theme.colors.background};
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 480px;
`;

const Label = styled.label`
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  font-size: 13px;
  background-color: ${theme.colors.white};
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.colors.subText};
  }
`;

const LoginButton = styled.button`
  width: 480px;
  padding: 10px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.primary};
    opacity: 0.8;
  }
`;

const SignUpButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 13px;
`;
