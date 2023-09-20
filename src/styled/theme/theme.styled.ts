import styled, { createGlobalStyle, css } from "styled-components";

export const StyledTest = styled.div`
  font-size: large;
`;

export const GlobalStyled = createGlobalStyle<{ $whiteColor?: boolean }>`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    ${({ $whiteColor }) =>
      $whiteColor
        ? css`
            color: red;
            border: 2px solid pink;
          `
        : css`
            color: lime;
            border: 2px solid green;
          `};

    & > a{
        text-decoration: underline;
       
        ${({ $whiteColor }) =>
          $whiteColor
            ? css`
                background-color: orange;
              `
            : css`
                background-color: blue;
              `}
    }
[hello-word="hi"]{
  font-size: 200px;
}
    ${StyledTest}{
        ${({ $whiteColor }) =>
          $whiteColor
            ? css`
                color: magenta;
                border: 2px solid navy;
              `
            : css`
                color: lime;
                border: 20px solid green;
              `};
    }
}
`;
