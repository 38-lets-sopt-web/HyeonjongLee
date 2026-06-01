import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import theme from "../../styles/theme";
import instance from "../../api/axios";

function InfoPage() {
  const userId = localStorage.getItem("userId");
  const [loginId, setLoginIdState] = useState("");
  const [part, setPart] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instance.get(`/users/${userId}`);
        const user = res.data.data;
        setLoginIdState(user.loginId);
        setPart(user.part);
        setName(user.name);
        setEmail(user.email);
        setAge(String(user.age));
      } catch {
        alert("정보를 불러오는 데 실패했습니다.");
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      await instance.patch(`/users/${userId}`, {
        name,
        email,
        age: Number(age),
      });
      alert("정보가 수정되었습니다.");
    } catch {
      alert("정보 수정에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>내 정보</Title>
      <InfoCard>
        <InfoRow>
          <InfoLabel>아이디</InfoLabel>
          <InfoValue>{loginId}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>파트</InfoLabel>
          <InfoValue>{part}</InfoValue>
        </InfoRow>
      </InfoCard>
      <Field>
        <Label>이름</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field>
        <Label>이메일</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field>
        <Label>나이</Label>
        <Input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Field>
      <UpdateButton onClick={handleUpdate}>정보 수정</UpdateButton>
    </Container>
  );
}

export default InfoPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 20px;
  background-color: ${theme.colors.background};
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const InfoCard = styled.div`
  width: 480px;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoLabel = styled.span`
  font-size: 13px;
  font-weight: bold;
`;

const InfoValue = styled.span`
  font-size: 13px;
  color: ${theme.colors.subText};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
`;

const UpdateButton = styled.button`
  width: 480px;
  padding: 10px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
