import styled, { css } from "styled-components";

export const ViewDetailBtn = styled.div`
  position: absolute;
  top: 0;
  right: 5px;
  width: 30px;
  height: 30px;
  font-size: 20px;
  background-color: black;
  color: lime;
  transition: all 0.3s linear;
  z-index: -1;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  //center text
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    background-color: gray;
    cursor: pointer;
  }
`;

export const CopyBtn = styled(ViewDetailBtn)`
  right: 35px;
`;

export const LockBtn = styled(ViewDetailBtn)`
  right: 65px;
`;

export const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  font-size: 1.3rem;
  max-height: calc(300px - 30px);
  background-color: rgba(0, 0, 0, 1) !important;
  word-wrap: break-word;
  overflow-y: auto;
  box-sizing: border-box;
  color: white;
  background-color: gray;
  border-radius: 5px;
`;

export const NodeContainer = styled.div<{
  $state: string;
  $isFullSize: number;
}>`
  //view detail btn
  position: relative;
  transition: all 0.7s linear;
  //border: 1px solid gold;
  width: 220px;
  height: 60px;
  max-height: 300px;
  padding: 3px;
  border-radius: 5px;
  box-sizing: border-box;
  ${({ $state }) => {
    switch ($state) {
      case "1":
        return css`
          color: red;
          background-color: red;
        `;
      case "2":
        return css`
          color: pink;
          background-color: pink;
        `;
      case "3":
        return css`
          color: lime;
          background-color: lime;
        `;
      case "4":
        return css`
          color: gold;
          background-color: gold;
        `;
    }
  }}
  height: ${({ $isFullSize }) => ($isFullSize ? "auto" : "60px")};
  &:hover {
    height: auto;
  }
  &:hover > ${ViewDetailBtn} {
    top: -30px;
  }
  &:hover > ${TextContainer} {
    height: calc(100% - 60px);
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1 !important;
    border-radius: 5px !important;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888 !important;
    border-radius: 5px !important;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555 !important;
  }
`;
