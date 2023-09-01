import {
    CardTask,
    CardTaskBody,
    CardTaskDescription,
    CardTaskDescriptionImg,
    CardTaskFooter,
    CardTaskHeader,
    CardTaskIcon,
    CardTaskImage,
    CardTaskName,
    Falcuty,
  } from "../../styled/Kanban/Kanban.styled";
  import { FaUserCircle } from "react-icons/fa";
  import { BsCalendarWeek } from "react-icons/bs";
  import { AiOutlinePaperClip } from "react-icons/ai";
  import { BsClipboardMinus } from "react-icons/bs";
  import { TaskContext } from "../../Pages/ProjectPage";
  import { useContext } from "react";

export interface ICardKanban {
  id:string;
    name?: string;
    img?: string[];
    description?: string;
    date?: string;
    file?: string[];
    status?: string;
    faculty?: string;
    userImage?: string;
  }

export const CardKanBan: React.FC<ICardKanban> = (prop) => {
  const { ViewDetail } = useContext(TaskContext);
    return (
      <CardTask onClick={()=> ViewDetail(prop.id)}>
        <CardTaskHeader>
          <CardTaskName>task 1 {prop?.name}</CardTaskName>
          <CardTaskIcon>
            {/*<FaUserCircle />*/}
            {/*<CardTaskImage src="https://picsum.photos/200/300" />*/}
            {prop.userImage ? (
              <CardTaskImage src={prop?.userImage} />
            ) : (
              <FaUserCircle />
            )}
          </CardTaskIcon>
        </CardTaskHeader>
        <Falcuty>{prop?.faculty}</Falcuty>
        <CardTaskBody $haveImg={prop?.img ? 1 : 0}>
          <CardTaskDescription>{prop?.description}</CardTaskDescription>
          {prop?.img && <CardTaskDescriptionImg src={prop?.img[0]} />}
        </CardTaskBody>
        <CardTaskFooter>
         
          &nbsp; {prop?.date &&  <BsCalendarWeek />} {prop?.date } <AiOutlinePaperClip /> <BsClipboardMinus />
        </CardTaskFooter>
      </CardTask>
    );
  };