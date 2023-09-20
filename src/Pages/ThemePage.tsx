import * as React from "react";
import { GlobalStyled, StyledTest } from "../styled/theme/theme.styled";
import styled from "styled-components";

const Btn = styled.button`
  background-color: aqua;
  width: 100px;
  height: 100px;
  z-index: -1;
  position: absolute;
  bottom: -70px;
  transition:  bottom 1s,z-index 0.3s, transform 0.5s;
  transition-delay: 0.5s, 0s, 0.5s;
`;

const Card = styled.div`
  width: 200px;
  height: 200px;
  background-color: gray;
 
  position: relative;
  &:hover::before {
    width: 50px;
    height: 50px;
  }

  &::before {
    content: "";
    width: 100px;
    height: 100px;
    background-color: red;
    z-index: 1;
    top: 0;
    position: absolute;
    transition: all 0.5s;
  }

  &:hover > ${Btn} {
    z-index: 1;
    bottom: -140px;
    transform: translateY(-50px);
    transition-delay: 0s, 0.5s, 0.5s;
  }
`;

const Acomponent = () => <a href="hello">sdfsdfsdf</a>;

export const Theme = () => {
  const [state, setState] = React.useState(true);
  return (
    <>
      <GlobalStyled $whiteColor={state} />
      ddsddssdddddd
      <button onClick={() => setState(!state)}>Toggle</button>
      <br />
      <a href="https://www.google.com" hello-word="hi">
        Google
      </a>
      <br />
      <Acomponent h-il="" />
      <br />
      <StyledTest>kljklkhkh</StyledTest>
      <br />
      <hr />
      <Card>
        <Btn>hello</Btn>
      </Card>
    </>
  );
};
