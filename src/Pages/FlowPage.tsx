import * as React from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  EdgeTypes,
  MarkerType,
  Node,
  OnConnect,
  OnNodesChange,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";
import CustomNode from "../components/Flow/CustomNode";
import CustomEdge from "../components/Flow/CustomEdge";

//test
import projectData from "../Data/project.json";
import test from "../Data/test.json";
import { Project, ProjectTask } from "../model/ProjectTask";
import { ConverToNodeFlow, ConvertToEdge } from "../functionConverter/Convert";

/*
const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "customNode",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "2" },
    type: "customNode",
  },
  {
    id: "3",
    position: { x: 100, y: 100 },
    type: "customNode",
    data: { label: "3" },
  },
  {
    id: "4",
    position: { x: 500, y: 500 },
    type: "customNode",
    data: { label: "4" },
  },
];
*/

const DrawProject = (
  tasks: ProjectTask[],
  addTask: (nodes: Node) => void,
  startX = 0,
  startY = 0,
  stack = 0
) => {
  const stepX = 300;
  const stepY = 300;

  let x = startX + stepX;
  let y = startY - stepY; //protect index 0
  let index = 0;

  for (const task of tasks) {
    y += stepY;
    addTask({
      id: task.id + "",
      position: {
        x: x,
        y: y,
      },
      data: { label: task.id + ":" + x + "," + y, parentId: task.parentId },
      type: "customNode",
    } as Node);

    if (task.task) {
      DrawProject(task.task, addTask, x, y, stack + 1);
    }
    index++;
  }
};

const SortNodes2 = (
  nodes: Node[],
  saveNode: (node: Node) => void,
  startX = 0,
  startY = 0,
  step = 0
) => {
  const stepX = 300;
  const stepY = 300;

  if (step === 0) {
    let xMax = 0;
    nodes.forEach((node) => {
      if (node.position.x > xMax) {
        xMax = node.position.x;
      }

      let y = 0;
      nodes
        .filter((node) => node.position.x === xMax)
        .forEach((node, index) => {
          if (node.position.y > 0) {
            y += stepY;
            saveNode({
              ...node,
              position: { x: node.position.x, y: y },
            } as Node);
            index++;
          }
        });
      SortNodes2(nodes, saveNode, xMax - stepX, y, ++step);
    });
  } else {
    const nodesColumn = nodes.filter((node) => node.position.x === startX);
    const lastNodes = nodes.filter(
      (node) => node.position.x === startX + stepX
    );

    let maxY = 0,
      y = startY;
    lastNodes.forEach((node) => {
      if (node.position.y > maxY) {
        maxY = node.position.y;
      }
    });

    y = maxY;
    nodesColumn.forEach((node, index) => {
      if (node.position.y > 0) {
        y += stepY;
        saveNode({
          ...node,
          position: { x: node.position.x, y: y },
        } as Node);
      }
    });

    if (startX > stepX) {
      SortNodes2(nodes, saveNode, startX - stepX, y, ++step);
    }
  }
};
//------------------------------node---------------------------------
const project = JSON.parse(JSON.stringify(test)) as Project; //const project = JSON.parse(JSON.stringify(projectData)) as Project;
let nodeArr: Node[] = [];

//////////////////////////////test////////////////////////////////////
//const projectTest = JSON.parse(JSON.stringify(projectTest)) as Project;

if (project.task)
  DrawProject(project.task, (node) => {
    nodeArr = [...nodeArr, node];
  });
for (let sortTime = 0; sortTime < 30; sortTime++) {
  SortNodes2(nodeArr, (node) => {
    nodeArr = nodeArr.map((n) => (n.id === node.id ? node : n));
  });
}
const initialNodes: Node[] = nodeArr;
//////////////////////////////test////////////////////////////////////
//------------------------------node--------------------------------

//------------------------------edge--------------------------------
let initialEdges: Edge[] = [];
ConvertToEdge(project.task, (edg) => {
  initialEdges = [...initialEdges, ...edg];
});
//console.log(initialEdges);
const nodeTypes = {
  customNode: CustomNode,
};
//------------------------------edge--------------------------------
/*
const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 6,
      height: 6,
      color: "white",
      strokeWidth: 5,
    },
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: "white",
    },
    data: {
      label: "test.....s",
    },
    type: "custom",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 6,
      height: 6,
      color: "white",
      strokeWidth: 5,
    },
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: "white",
    },
    data: {
      label: "test.....s",
    },
    type: "custom",
  },
  {
    id: "B->G",
    source: "2",
    target: "3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 6,
      height: 6,
      color: "white",
      strokeWidth: 5,
    },
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: "white",
    },
    data: {
      label: "test.....s",
    },
    type: "custom",
  },
];
*/

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
  //'start-end': CustomEdgeStartEnd,
};
interface IFlowPageProps {
  tasks?: ProjectTask[];
}

export const FlowPage: React.FC<IFlowPageProps> = (props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  /**
     *   const onNodesChange: OnNodesChange = useCallback(
            (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
            [setNodes]
        );
        const onEdgesChange: OnEdgesChange = useCallback(
            (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
            [setEdges]
        );
     */

  /*
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );*/

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        //onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        {/*<MiniMap />*/}
        <Background gap={12} size={1} style={{ backgroundColor: "gray" }} />
      </ReactFlow>
    </>
  );
};
