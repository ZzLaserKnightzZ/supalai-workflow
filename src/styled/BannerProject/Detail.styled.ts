import styled from "styled-components";

export const DetailContainer = styled.div<{ $isShowing: boolean }>`
  position: fixed;
  top: ${({ $isShowing }) => ($isShowing ? "0" : "100vh")};
  left: 0;
  width: 100dvw;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.2s linear;
  //center box
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CancleBtn = styled.div`
  border-radius: 50%;
  font-size: 40px;
  color: red;
  //center text
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;

export const DetailBox = styled.div`
  display: grid;
  grid-template-rows: 3rem auto; //title + content
  height: 85%;
  width: 85%;
  max-width: 650px;
`;

export const DetailTitle = styled.div`
  display: grid;
  grid-template-columns: auto 3rem;
  background-color: gray;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding: 0 3px;
  text-align: center;
  font-size: 20px;
  color: black;
  & > label {
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
  }
`;

export const DetailContent = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  background-color: white;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;
