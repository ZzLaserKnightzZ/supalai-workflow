import { json } from "stream/consumers";
import projectData from "../Data/project.json";
import { Project, ProjectTask } from "../model/ProjectTask";
import { Edge, MarkerType, Node } from "reactflow";

export const ConvertToEdge = (
  tasks: ProjectTask[],
  addEdg: (edgs: Edge[]) => void
) => {
  addEdg(
    tasks.map((task: ProjectTask, index: number) => {
      return {
        id: task.id + "",
        source: task.parentId + "",
        target: task.id + "",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 6,
          height: 6,
          color: "white",
          strokeWidth: 4,
        },
        animated: false,
        style: {
          strokeWidth: 3,
          stroke: "white",
        },
        data: {
          label: "test.....status",
        },
        type: "custom",
      } as Edge;
    })
  );

  for (let task of tasks) {
    if (task.task) {
      ConvertToEdge(task.task, addEdg);
    }
  }
};

export const ConverToNodeFlow = (
  currentNodes: Node[],
  tasks: ProjectTask[],
  addRange: (nodes: Node[]) => void,
  startX = 1,
  startY = 1
) => {
  const stepX = 300,
    stepY = 300;
  //find last x postion of child
  let currentX = 0;
  let parentX = currentNodes.find((node) => node.id === tasks[0].parentId + ""); //getposiotion parent node
  addRange(
    tasks.map((task: ProjectTask, index: number) => {
      let nodeLength = index > 0 ? tasks[index - 1].task?.length : 0; //get prev sub task length
      if (nodeLength) {
        if (index === 0) {
          currentX = 0;
        } else {
          currentX += nodeLength * stepX;
        }
      } else {
        currentX += stepX;
      }
      //console.log("currentX", currentX, index,task.id);
      //let x = startY === 1 ? 1 : startX + (index === 0 ? 0:currentX);
      let x = startY === 1 ? 1 : startX + currentX;
      let y = startY * stepY;
      if (parentX) {
        //if node have parent node
        x = parentX.position.x - stepX + x;
      }

      if(task.parentId === 0){ x =0;} //if first node
      //shift node if same position
      let samePosition = currentNodes.find(
        (node) => node.position.x === x && node.position.y === y
      );
      /*
      if (samePosition) {
        currentX += samePosition.position.x;
        x = currentX;
      }
      */
      //save state of node
      currentNodes.push({
        id: task.id + "",
        position: {
          x: x,
          y: y,
        },
        data: { label: task.id + ":" + x + "," + y },
        type: "customNode",
      } as Node);

      return {
        id: task.id + "",
        position: {
          x: x,
          y: y,
        },
        data: { label: task.id + ":" + x + "," + y },
        type: "customNode",
      } as Node;
    })
  );

  for (let task of tasks) {
    if (task.task) {
      ConverToNodeFlow(currentNodes, task.task, addRange, startX, startY + 1);
    }
  }
};

export const EditeFlow=()=>
{
  
}
/* return {edg,node}*/
const toFlow = (data: string) => {
  //1.create node
  //2.node create edge
  const project: Project = JSON.parse(JSON.stringify(projectData));
};
/* return array[{timeline}]*/
const toGantt = (data: string) => {};
/* return array[]*/
const toKanban = (data: string) => {};

export const Convert = { toFlow, toGantt, toKanban };
