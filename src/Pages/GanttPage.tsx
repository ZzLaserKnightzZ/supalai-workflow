import * as React from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "../components/Gantt/view-switcher";
import { getStartEndDateForProject, initTasks } from "../helper";
import "../styled/Gantt/GanttPage.css";
import { Project, ProjectTask } from "../model/ProjectTask";
import test from "../Data/test.json";
import { useContext } from "react";
import { TaskContext } from "./ProjectPage";


const ConvertJsonToGantt = (
  tasks: ProjectTask[],
  saveTasks: (tasks: Task[]) => void,
  dependencies: string,
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
      return {
        //start: new Date(2021, 1, day - 1),
        //end: new Date(2021, 1, day++),
        start: task.startDate ? new Date(task.startDate):new Date(),
        end: task.endDate ? new Date( task.endDate):new Date(),
        name: task.name + task.id,
        id: task.id.toString(),
        progress: task.progress ? task.progress : 0,
        dependencies: [dependencies],
        type: "task",
        project: "project name",
        displayOrder: 0, //init
      };
    })
  );

  for (const task of tasks) {
    if (task.task) {
      ConvertJsonToGantt(task.task, saveTasks, task.id.toString());
    }
  }

};
/*
//----------------------test---------------------------
const testProject = JSON.parse(JSON.stringify(test)) as Project;
let taskss: Task[] = [];
ConvertJsonToGantt(
  testProject.task,
  (newTasks) => {
    taskss = [...taskss, ...newTasks];
  },
  "project"
);
//----------------------test---------------------------
*/

interface GanttPageProps {
  tasks?: ProjectTask[];
}

export const GanttPage: React.FC<GanttPageProps> = (props) => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>([]);
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
    //console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    //alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    //console.log("On Click event Id:" + task.id);
    ViewDetail(task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    //console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    //console.log("On expander click Id:" + task.id);
  };

  const initTask = () => {
    //console.log("init",props.tasks);
    if (props.tasks) {
      let taskss: Task[] = [];
      ConvertJsonToGantt(
        props.tasks,
        (newTasks) => {
          taskss = [...taskss,...newTasks];
        },"project");
      console.log(tasks);
       taskss.sort((a, b) => Number(a.id) - Number(b.id)).forEach((t, i) => {
        t.displayOrder = i+1;
      });
      setTasks(taskss);
    }
  };

  React.useEffect(initTask, []);

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      {tasks.length > 0 ? <Gantt
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
      />:<h1>ไม่มีข่อมูล</h1>}
    </div>
  );
};
