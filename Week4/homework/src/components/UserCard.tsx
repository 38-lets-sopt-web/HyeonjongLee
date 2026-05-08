import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import theme from "../styles/theme";

interface UserCardProps {
  user: {
    id: number;
    name: string;
    part: string;
  };
}

const UserCard = ({ user }: UserCardProps) => {
  const { id, name, part } = user;
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/mypage/members/${id}`)}>
      <Name>{name}</Name>
      <Part>{part}</Part>
    </Card>
  );
};

export default UserCard;

const Card = styled.div`
  display: block;
  padding: 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  color: #333;
  width: 150px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

const Name = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 14px;
`;

const Part = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${theme.colors.subText};
`;
