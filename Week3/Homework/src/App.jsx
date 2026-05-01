import MainPage from "./Pages/MainPage";
import styled from "@emotion/styled";

function App() {
  return (
    <Container>
      <MainPage />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
