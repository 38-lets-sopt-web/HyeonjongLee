import styled from "@emotion/styled";
import moleImg from "../../assets/mole.png";
import bombImg from "../../assets/bomb.png";
import { color, radius } from "../../styles/tokens";

function Mole({ state, onClick }) {
  return (
    <Hole onClick={onClick}>
      {(state === "mole" || state === "hit") && (
        <MoleImg src={moleImg} alt="mole" $hit={state === "hit"} />
      )}
      {state === "bomb" && <BombImg src={bombImg} alt="bomb" />}
    </Hole>
  );
}

export default Mole;

const Hole = styled.div`
  width: 100%;
  aspect-ratio: 1.3;
  border-radius: ${radius.c};
  background-color: ${color.main};
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const MoleImg = styled.img`
  width: 100%;
  border-radius: ${radius.c};
  /* 피격효과 */
  filter: ${({ $hit }) => ($hit ? "brightness(0.5)" : "none")};
`;
const BombImg = styled.img`
  width: 100%;
  border-radius: ${radius.c};
`;
