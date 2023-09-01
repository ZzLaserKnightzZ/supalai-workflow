import styled, { css } from "styled-components";

export const KanbanContainer = styled.div`
  width: 100%;
  height: 3rem;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media screen and (width < 820px) {
    display: none;
  }
`;

export const KanbanColumn = styled.div<{ $status: string }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: white;
  font-size: clamp(1rem, 2.5vw, 4rem);
  //for KanbanCounter
  position: relative;
  user-select: none;
  ${({ $status }) => {
    switch ($status) {
      case "pending":
        return css`
          background-color: orange;
        `;
      case "on Schedule":
        return css`
          background-color: aqua;
        `;
      case "stuck":
        return css`
          background-color: red;
        `;
      case "completed":
        return css`
          background-color: lime;
        `;
    }
  }}
`;

export const KanbanCounter = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 3rem;
  color: white;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: clamp(1rem, 2.5vw, 3rem);
  transform: scale(0.7);
  //center text
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export const StatusContainer = styled.div`
  //background-color: gray;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  @media screen and (width < 820px) {
    display: none;
  }
`;

export const TaskContainer = styled.div`
  //background-color: lime;
  padding: 10px;
  gap: 10px;
  height: auto;
  max-width: 100%;

  display: flex;
  flex-direction: column;
`;

export const CardTask = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  width: 100%;
  height: auto;
  background-color: white;
  box-sizing: border-box;
`;

export const CardTaskHeader = styled.div`
  //background-color: rgba(0, 0, 0, 0.7);
  background-color: aliceblue;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 100%;
  height: 3rem;
  background-color: gray;
  //center text
  display: flex;
  justify-content: space-between;
`;

export const CardTaskName = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-left: 1rem;
  font-size: clamp(1rem, 2.2vw, 2rem);
`;

export const CardTaskImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: scale(0.8);
`;

export const CardTaskIcon = styled.div`
  height: 100%;
  width: 3rem;
  border-radius: 50%;
  //cemnter icon or img
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

export const Falcuty = styled.p`
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const CardTaskDescription = styled.div`
  overflow-wrap: break-word;
  overflow-y: hidden;
  padding: 0 5px;
  height: auto;
  max-height: 150px;
`;

export const CardTaskDescriptionImg = styled.img`
  width: 100%;
  height: 120px;
  border-radius: 10px;
`;

export const CardTaskBody = styled.div<{ $haveImg: boolean }>`
  padding: 10px;
  box-sizing: border-box;
  height: auto;
  overflow-wrap: break-word;
  //2col
  display: grid;
  grid-template-columns: 60% 40%;
  ${({ $haveImg }) =>
    $haveImg
      ? css``
      : css`
          grid-template-columns: 1fr;
        `}
  //background-color: aqua;
  @media screen and (width < 1100px) {
    grid-template-columns: unset;
    grid-template-rows: 120px auto;
    ${({ $haveImg }) =>
      $haveImg
        ? css``
        : css`
            grid-template-rows: 120px;
          `}
    gap: 10px;
  }
  @media screen and (width < 820px) {
    & > * {
      height: 30vh;
    }
  }
`;

export const CardTaskFooter = styled.div`
  margin-top: 10px;
  padding: 10px;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: clamp(1rem, 2vw, 2.5rem);
`;

export const MobileKanbanContainer = styled.div`
  width: 100%;
  height: auto;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  //hide on desktop
  display: none;
  @media screen and (width < 820px) {
    display: flex;
  }
`;

export const MobileKanbanHeader = styled.div<{ $status: string }>`
  height: 3rem;
  color: white;
  padding: 10px;
  font-size: clamp(1rem, 5vw, 5rem);
  border-radius: 10px;
  //for conster
  position: relative;
  //centertext
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  ${({ $status }) => {
    switch ($status) {
      case "pending":
        return css`
          background-color: orange;
        `;
      case "on Schedule":
        return css`
          background-color: aqua;
        `;
      case "stuck":
        return css`
          background-color: red;
        `;
      case "completed":
        return css`
          background-color: lime;
        `;
    }
  }}
`;

export const MobileKanbanContent = styled.div<{ $isShowing: boolean }>`
  height: auto;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.5s ease-in-out;
  display: ${({ $isShowing }) => ($isShowing ? "flex" : "none")};
`;

export const MobileKanbanStatusContainer = styled.div<{ $status: string }>`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  border-radius: 10px;
  //center text
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 10px;

  ${({ $status }) => {
    switch ($status) {
      case "pending":
        return css`
          border: 1px solid orange;
        `;
      case "on Schedule":
        return css`
          border: 1px solid aqua;
        `;
      case "stuck":
        return css`
          border: 1px solid red;
        `;
      case "completed":
        return css`
          border: 1px solid lime;
        `;
    }
  }}
`;
