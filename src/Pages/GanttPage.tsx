import * as React from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "../components/Gantt/view-switcher";
import { getStartEndDateForProject, initTasks } from "../helper";
import "../styled/Gantt/GanttPage.css";
import { Project, ProjectTask } from "../model/ProjectTask";
import test from "../Data/test.json";
import { useContext } from "react";
import { TaskContext } from "./ProjectPage";

let day = 2,
  order = 0;

const ConvertJsonToGantt = (
  tasks: ProjectTask[],
  saveTasks: (tasks: Task[]) => void,
  dependencies: string
) => {
  /*
  //add project
  const task:Task={
    start: new Date("2021-01-01"),
    end: new Date("2021-01-15"),
    name: project.name,
    id: project.id.toString(),
    progress: 25,
    type: "project",
    hideChildren: false,
    displayOrder: 1,
  };
*/

  saveTasks(
    tasks.map((task, index) => {
      order++;
      return {
        start: new Date(2021, 1, day - 1),
        end: new Date(2021, 1, day++),
        name: task.name + task.id,
        id: task.id.toString(),
        progress: 25,
        dependencies: [dependencies],
        type: "task",
        project: "project name",
        displayOrder: order,
      };
    })
  );

  for (const task of tasks) {
    if (task.task) {
      ConvertJsonToGantt(task.task, saveTasks, task.id.toString());
    }
  }
};

const testProject = JSON.parse(JSON.stringify(test)) as Project;
let taskss: Task[] = [];
ConvertJsonToGantt(
  testProject.task,
  (newTasks) => {
    taskss = [...taskss, ...newTasks];
  },
  "project"
);
//console.log(taskss);
interface GanttPageProps {
  tasks?: ProjectTask[];
}

export const GanttPage: React.FC<GanttPageProps> = (props) => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(taskss);
  const [isChecked, setIsChecked] = React.useState(true);
  const { ViewDetail } = useContext(TaskContext);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
    ViewDetail(task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
      />
    </div>
  );
};
