import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import theme from "../../styles/theme";
import instance from "../../api/axios";

interface UserDetail {
  loginId: string;
  name: string;
  part: string;
  email: string;
  age: number;
}

const MemberDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/users/${id}`);
        setUser(res.data.data);
      } catch (error) {
        console.error("유저 상세 정보를 불러오는 데 실패했습니다.", error);
      }
    };
    fetchData();
  }, [id]);

  if (!user) return <p>로딩 중...</p>;

  return (
    <Container>
      <BackButton onClick={() => navigate("/mypage/members")}>
        ← 목록으로 돌아가기
      </BackButton>
      <Card>
        <UserName>{user.name} 님</UserName>
        <Info>
          <p>
            <strong>아이디:</strong> {user.loginId}
          </p>
          <p>
            <strong>파트:</strong> {user.part}
          </p>
          <p>
            <strong>이메일:</strong> {user.email}
          </p>
          <p>
            <strong>나이:</strong> {user.age}세
          </p>
        </Info>
      </Card>
    </Container>
  );
};

export default MemberDetailPage;

const Container = styled.div`
  padding: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  font-size: 14px;
`;

const Card = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  background-color: #f9f9f9;
  max-width: 400px;
`;

const UserName = styled.h1`
  margin: 0 0 1.5rem 0;
  font-size: 1.8rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-size: 14px;

  p {
    margin: 0;
  }
`;
