import styled, { css } from "styled-components";

export const EdgeBox = styled.div<{
  $status: string;
}>`
  border-radius: 15px;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  transition: all 0.3s linear;
  overflow: hidden;
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
      case "stuck":
        return css`
          //color: red;
          background-color: red;
        `;
      case "on shedule":
        return css`
          //color: pink;
          background-color: aqua;
        `;
      case "completed":
        return css`
          //color: lime;
          background-color: lime;
        `;
      case "pending":
        return css`
          //color: gold;
          background-color: orange;
        `;
      default:
        return css`
          //color: white;
          background-color: gray;
        `;
    }
  }}

  &:hover {
    width: 200px;
  }
`;
