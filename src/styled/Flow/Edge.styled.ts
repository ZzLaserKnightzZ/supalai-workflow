import styled, { css } from "styled-components";

export const EdgeBox = styled.div<{
  $status: string;
}>`
  border-radius: 15px;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  transition: all 0.3s linear;
  //padding: 10px;
  font-size: 12px;
  //center icon
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  //self center
  position: absolute;

  ${({ $status }) => {
    switch ($status) {
      case "1":
        return css`
          background-color: lime;
        `;
      case "2":
        return css`
          background-color: yellow;
        `;
      case "3":
        return css`
          background-color: red;
        `;
      default:
        return css`
          background-color: white;
        `;
    }
  }}

  &:hover {
    width: 200px;
  }
`;
