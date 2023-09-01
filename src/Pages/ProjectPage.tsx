import * as React from "react";
import {
  BannerProjectContaner,
  BannerProjectName,
  Color,
  DateTime,
  ListOption,
  ListOptionContaner,
  SelectProjectName,
} from "../styled/BannerProject/BannerProject.styled";
import { FaChevronDown } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { TiFlowChildren } from "react-icons/ti";
import { TbTimelineEvent, TbLayoutKanban } from "react-icons/tb";
import { BsPersonBoundingBox, BsCalendar3 } from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import { Outlet, useParams } from "react-router-dom";
import { FlowPage } from "./FlowPage";
import { GanttPage } from "./GanttPage";
import { KanbanPage } from "./KanbanPage";
import { Project } from "../model/ProjectTask";
import {
  CancleBtn,
  DetailBox,
  DetailContainer,
  DetailContent,
  DetailTitle,
} from "../styled/BannerProject/Detail.styled";

export interface TaskManager {
  ViewDetail: (id: string) => void;
}

export const TaskContext = React.createContext<TaskManager>({
  ViewDetail: (id) => {},
});

export const ProjectPage: React.FC = () => {
  /*
  const {projectId} = useParams();
  if(!projectId){
    return <h1 style={{color:"red"}}>ไม่พบโปรเจค</h1>
  }
*/

  const [pageType, setPageType] = React.useState("flow");
  const [project, setProject] = React.useState<{ project: Project } | null>(
    null
  );
  const [detailId, setDetailId] = React.useState("");
  const [isShowingDetail, setIsShowingDetail] = React.useState(false);

  const fetchData = () => {};

  const ViewDetail = (id: string) => {
    //console.log(id);
    setDetailId(id);
  };

  React.useEffect(() => {
    setIsShowingDetail(true);
    //nodes.forEach((node) => {console.log(node)});
  }, [detailId]);
  React.useEffect(fetchData);

  return (
    <>
      <BannerProjectContaner>
        {/*left*/}
        <BannerProjectName>
          <Color></Color>
          <SelectProjectName>
            <div> {project?.project.name}</div>
            <div>
              <FaChevronDown />
            </div>
          </SelectProjectName>
          <ListOptionContaner>
            <ListOption /*to={"#"}*/>
              <div>
                <GiSettingsKnobs />
              </div>
              <label> Project setting</label>
            </ListOption>
            <ListOption /*to={"flow"}*/ onClick={() => setPageType("flow")}>
              <div>
                <TiFlowChildren />
              </div>
              <label>Flows</label>
            </ListOption>
            <ListOption /*to={"/"}*/ onClick={() => setPageType("timeline")}>
              <div>
                <TbTimelineEvent />
              </div>
              <label>Time Line</label>
            </ListOption>
            <ListOption /*to={"kanban"}*/ onClick={() => setPageType("kanban")}>
              <div>
                <TbLayoutKanban />
              </div>
              <label>Kanban</label>
            </ListOption>
            <ListOption /*to={"#"}*/>
              <div>
                <BsPersonBoundingBox />
              </div>
              <label>Change Image</label>
            </ListOption>
            <ListOption /*to={"#"}*/>
              <div>
                <GoTrash />
              </div>
              <label>Delete</label>
            </ListOption>
          </ListOptionContaner>
        </BannerProjectName>
        {/*right*/}
        <DateTime>
          Due Date : <BsCalendar3 /> &nbsp; 2021/12/12{" "}
          {project?.project.dueDate}
        </DateTime>
      </BannerProjectContaner>
      {/*<Outlet />*/}
      <TaskContext.Provider
        value={{
          ViewDetail,
        }}
      >
        {pageType === "flow" ? <FlowPage /> : null}
        {pageType === "timeline" ? <GanttPage /> : null}
        {pageType === "kanban" ? <KanbanPage /> : null}
      </TaskContext.Provider>
      {/*popup detail*/}
      <DetailContainer $isShowing={isShowingDetail}>
        <DetailBox>
          <DetailTitle>
            <label>hello</label>{" "}
            <CancleBtn onClick={() => setIsShowingDetail(false)}>
              &times;
            </CancleBtn>
          </DetailTitle>
          <DetailContent>{/*content here */}</DetailContent>
        </DetailBox>
      </DetailContainer>
    </>
  );
};
