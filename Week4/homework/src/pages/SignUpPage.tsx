import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import theme from "../styles/theme";
import { postSignUp } from "../api/auth";

function SignUpPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [part, setPart] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await postSignUp({
        loginId,
        password,
        name,
        email,
        age: Number(age),
        part: part as "iOS" | "안드로이드" | "웹",
      });
      alert("회원가입에 성공했습니다.");
      navigate("/");
    } catch {
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>SOPT MEMBERS</Title>
      <Field>
        <Label>아이디</Label>
        <Input
          placeholder="사용할 아이디를 입력해주세요."
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
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
      <Field>
        <Label>비밀번호 확인</Label>
        <Input
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Field>
      <Field>
        <Label>이름</Label>
        <Input
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>
      <Field>
        <Label>이메일</Label>
        <Input
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field>
        <Label>나이</Label>
        <Input
          type="number"
          placeholder="나이를 입력해주세요."
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Field>
      <Field>
        <Label>파트</Label>
        <Input
          placeholder="파트명을 입력해주세요"
          value={part}
          onChange={(e) => setPart(e.target.value)}
        />
      </Field>
      <SignUpButton onClick={handleSignUp}>회원가입</SignUpButton>
      <LoginButton onClick={() => navigate("/")}>
        로그인으로 돌아가기
      </LoginButton>
    </Container>
  );
}

export default SignUpPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 20px;
  padding: 40px 0;
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

const SignUpButton = styled.button`
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

const LoginButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 13px;
`;
