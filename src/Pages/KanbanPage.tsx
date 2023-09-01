import * as React from "react";
import {
  KanbanColumn,
  KanbanContainer,
  KanbanCounter,
  MobileKanbanContainer,
  MobileKanbanContent,
  MobileKanbanHeader,
  MobileKanbanStatusContainer,
  StatusContainer,
  TaskContainer,
} from "../styled/Kanban/Kanban.styled";
import { CardKanBan, ICardKanban } from "../components/Kanban/CardKanban";
import jsonTest from "../Data/test.json";
import { Project, ProjectTask } from "../model/ProjectTask";

interface IKanbanPageProps {
  tasks?: ProjectTask[];
}

const ConvertJsonToKanban = (
  tasks: ProjectTask[],
  addCards: (card: ICardKanban[]) => void
) => {
  addCards(
    tasks.map((task, index) => {
      return {
        id: task.id + "",
        name: task.name + task.id,
        description: task.description,
        date: task?.date,
        faculty: task.faculty,
        img: task.img,
        status: task.status,
        userImage: task.userImage,
      } as ICardKanban;
    })
  );

  for (const task of tasks) {
    if (task.task) {
      ConvertJsonToKanban(task.task, addCards);
    }
  }
};

let card_list: ICardKanban[] = [];
const testProject = JSON.parse(JSON.stringify(jsonTest)) as Project;
ConvertJsonToKanban(testProject.task, (newCards) => {
  card_list = [...card_list, ...newCards];
});

export const KanbanPage: React.FC<IKanbanPageProps> = (props) => {
  const [cards, setCards] = React.useState<ICardKanban[]>(card_list);
  const [showPending, setShowPending] = React.useState<boolean>(false);
  const [showShedule, setShowShedule] = React.useState<boolean>(false);
  const [showStuck, setShowStuck] = React.useState<boolean>(false);
  const [showComplete, setShowComplete] = React.useState<boolean>(false);
  return (
    <>
      <KanbanContainer>
        <KanbanColumn $status="pending">
          Pending{" "}
          <KanbanCounter>
            {cards.filter((card) => card.status === "pending").length}
          </KanbanCounter>
        </KanbanColumn>
        <KanbanColumn $status="on Schedule">
          On Schedule{" "}
          <KanbanCounter>
            {cards.filter((card) => card.status === "on shedule").length}
          </KanbanCounter>
        </KanbanColumn>
        <KanbanColumn $status="stuck">
          Stuck{" "}
          <KanbanCounter>
            {cards.filter((card) => card.status === "stuck").length}
          </KanbanCounter>
        </KanbanColumn>
        <KanbanColumn $status="completed">
          Completed{" "}
          <KanbanCounter>
            {cards.filter((card) => card.status === "completed").length}
          </KanbanCounter>
        </KanbanColumn>
      </KanbanContainer>

      <StatusContainer>
        <TaskContainer>
          {cards
            .filter((card) => card.status === "pending")
            .map((card, index) => (
              <CardKanBan key={index} {...card} />
            ))}
        </TaskContainer>

        <TaskContainer>
          {cards
            .filter((card) => card.status === "on shedule")
            .map((card, index) => (
              <CardKanBan key={index} {...card} />
            ))}
        </TaskContainer>

        <TaskContainer>
          {cards
            .filter((card) => card.status === "stuck")
            .map((card, index) => (
              <CardKanBan key={index} {...card} />
            ))}
        </TaskContainer>

        <TaskContainer>
          {cards
            .filter((card) => card.status === "completed")
            .map((card, index) => (
              <CardKanBan key={index} {...card} />
            ))}
        </TaskContainer>
      </StatusContainer>
      {/*mobile */}
      <MobileKanbanContainer>
        <MobileKanbanStatusContainer $status="pending">
          <MobileKanbanHeader
            $status="pending"
            onClick={() => setShowPending((x) => !x)}
          >
            Pending
            <KanbanCounter style={{ width: "4rem" }}>
              {" "}
              {cards.filter((card) => card.status === "pending").length}
            </KanbanCounter>
          </MobileKanbanHeader>

          <MobileKanbanContent $isShowing={showPending}>
            {cards
              .filter((card) => card.status === "pending")
              .map((card, index) => (
                <CardKanBan key={index} {...card} />
              ))}
          </MobileKanbanContent>
        </MobileKanbanStatusContainer>

        <MobileKanbanStatusContainer $status="on Schedule">
          <MobileKanbanHeader
            $status="on Schedule"
            onClick={() => setShowShedule((x) => !x)}
          >
            On Schedule
            <KanbanCounter style={{ width: "4rem" }}>
              {cards.filter((card) => card.status === "on shedule").length}
            </KanbanCounter>
          </MobileKanbanHeader>
          <MobileKanbanContent $isShowing={showShedule}>
            {cards
              .filter((card) => card.status === "on shedule")
              .map((card, index) => (
                <CardKanBan key={index} {...card} />
              ))}
          </MobileKanbanContent>
        </MobileKanbanStatusContainer>

        <MobileKanbanStatusContainer $status="stuck">
          <MobileKanbanHeader
            $status="stuck"
            onClick={() => setShowStuck((x) => !x)}
          >
            Stuck
            <KanbanCounter style={{ width: "4rem" }}>
              {" "}
              {cards.filter((card) => card.status === "stuck").length}
            </KanbanCounter>
          </MobileKanbanHeader>
          <MobileKanbanContent $isShowing={showStuck}>
            {cards
              .filter((card) => card.status === "stuck")
              .map((card, index) => (
                <CardKanBan key={index} {...card} />
              ))}
          </MobileKanbanContent>
        </MobileKanbanStatusContainer>

        <MobileKanbanStatusContainer $status="completed">
          <MobileKanbanHeader
            $status="completed"
            onClick={() => setShowComplete((x) => !x)}
          >
            Completed
            <KanbanCounter style={{ width: "4rem" }}>
              {cards.filter((card) => card.status === "completed").length}
            </KanbanCounter>
          </MobileKanbanHeader>
          <MobileKanbanContent $isShowing={showComplete}>
            {cards
              .filter((card) => card.status === "completed")
              .map((card, index) => (
                <CardKanBan key={index} {...card} />
              ))}
          </MobileKanbanContent>
        </MobileKanbanStatusContainer>
      </MobileKanbanContainer>
    </>
  );
};
