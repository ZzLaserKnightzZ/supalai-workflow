import { Link } from "react-router-dom";
import styled from "styled-components";

export const BannerProjectContaner = styled.div`
  width: 100%;
  height: 3rem;
  //background-color: lime;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const ListOptionContaner = styled.div`
  position: absolute;
  top: 100%;
  left: 3rem;
  min-width: 250px;
  background-color: white;
  //width: calc(100% - 3rem);
  width: 100%;
  height: auto;
  border-radius: 10px;
  display: none;
  box-sizing: border-box;
  padding: 10px;
  z-index: 10;
`;

export const ListOption = styled.div` //(Link)
  background-color: white;
  height: 2rem;
  width: 100%;
  border-bottom: 1px solid black;
  padding: 2px 2rem;
  box-sizing: border-box;
  text-decoration: none;
  color: black;
  word-wrap: break-word;

  display: grid;
  grid-template-columns: 3rem auto;

  & > div {
    //center text
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    font-size: 1.5rem;
  }
  & > label {
    //center text
    display: flex;
    justify-content: center;
    //text-align: center;
    flex-direction: column;
    font-size: 1rem;
  }

  &:hover {
    background-color: gray;
  }
`;

export const BannerProjectName = styled.div`
  height: 100%;
  width: 20%;
  //max-width: 350px;

  display: grid;
  grid-template-columns: 3rem auto;
  //for list option
  position: relative;
  &:hover > ${ListOptionContaner} {
    display: block;
  }
`;

export const SelectProjectName = styled.div`
  width: auto;
  height: 100%;
  //background-color: gray;
  //center text
  display: grid;
  grid-template-columns: auto 3rem;
  & > div {
    //center text
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: clamp(1rem, 2.3vw, 3rem);
    font-weight: 900;
  }
`;

export const Color = styled.div`
  margin: 10px;
  background-color: aqua;
  border-radius: 5px;
`;

export const DateTime = styled.div`
  //center text
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: claim(1rem, 2.3vw, 3rem);
  font-weight: 900;
  padding-right: 1rem;
`;
