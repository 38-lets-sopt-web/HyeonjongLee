import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import theme from "../../styles/theme";
import instance from "../../api/axios";
import UserCard from "../../components/UserCard";

interface User {
  id: number;
  name: string;
  part: string;
}

interface UserDetail {
  loginId: string;
  name: string;
  email: string;
  age: number;
  part: string;
}

const UsersPage = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<UserDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/users");
        setUserList(res.data.data.users);
      } catch (error) {
        console.error("유저 리스트를 불러오는 데 실패했습니다.", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await instance.get(`/users/${searchId}`);
      setSearchResult(res.data.data);
    } catch (error) {
      console.error("유저를 찾을 수 없습니다.", error);
      alert("해당 유저를 찾을 수 없습니다.");
    }
  };

  return (
    <Container>
      <SearchTitle>회원 조회</SearchTitle>
      <SearchBox>
        <Label>회원 ID</Label>
        <SearchInput
          type="number"
          placeholder="회원 ID를 입력해주세요."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <SearchButton disabled={!searchId} onClick={handleSearch}>
          검색
        </SearchButton>
      </SearchBox>
      {searchResult && (
        <>
          <ResultTitle>검색 결과</ResultTitle>
          <ResultCard>
            <ResultRow>
              <ResultLabel>아이디</ResultLabel>
              <ResultValue>{searchResult.loginId}</ResultValue>
            </ResultRow>
            <ResultRow>
              <ResultLabel>이름</ResultLabel>
              <ResultValue>{searchResult.name}</ResultValue>
            </ResultRow>
            <ResultRow>
              <ResultLabel>이메일</ResultLabel>
              <ResultValue>{searchResult.email}</ResultValue>
            </ResultRow>
            <ResultRow>
              <ResultLabel>나이</ResultLabel>
              <ResultValue>{searchResult.age}</ResultValue>
            </ResultRow>
            <ResultRow>
              <ResultLabel>파트</ResultLabel>
              <ResultValue>{searchResult.part}</ResultValue>
            </ResultRow>
          </ResultCard>
        </>
      )}
      <ListTitle>전체 멤버 리스트</ListTitle>
      <CardGrid>
        {userList.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </CardGrid>
    </Container>
  );
};

export default UsersPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: ${theme.colors.background};
  min-height: calc(100vh - 60px);
`;

const SearchTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 480px;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 12px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.border};
  font-size: 13px;
  background-color: ${theme.colors.white};

  &::placeholder {
    color: ${theme.colors.subText};
  }
`;

const SearchButton = styled.button<{ disabled: boolean }>`
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.border : theme.colors.primary};
  color: ${theme.colors.white};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 13px;
`;

const ResultTitle = styled.h3`
  font-size: 14px;
  width: 480px;
  margin-bottom: 0.5rem;
`;

const ResultCard = styled.div`
  width: 480px;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 2rem;
`;

const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ResultLabel = styled.span`
  font-size: 13px;
  font-weight: bold;
`;

const ResultValue = styled.span`
  font-size: 13px;
  color: ${theme.colors.subText};
`;

const ListTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 1rem;
`;

const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`;
