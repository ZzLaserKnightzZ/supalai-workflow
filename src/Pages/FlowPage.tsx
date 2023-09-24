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
import test from "../Data/test.json";
import { Project, ProjectTask } from "../model/ProjectTask";
import { ConverToNodeFlow } from "../functionConverter/Convert";

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
      data: {
        label: task.name,
        description: task.description,
        parentId: task.parentId,
        status: task.status,
      },
      type: "customNode",
    } as Node);

    if (task.task) {
      DrawProject(task.task, addTask, x, y, stack + 1);
    }
    index++;
  }
};

const ConvertToEdge = (
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
          label: task.startDate+": "+ task.progress + "%",
          status: task.status,
          //percent: task.percent,
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

const SortNodes = (
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
      SortNodes(nodes, saveNode, xMax - stepX, y, ++step);
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
      SortNodes(nodes, saveNode, startX - stepX, y, ++step);
    }
  }
};

//------------------------------node convertter 2 ---------------------------------
const ConvertToNode2 = (  tasks: ProjectTask[],
  addTask: (nodes: Node[]) => void,
  startX = 0,
  startY = 0,
  isFirst = true)=>{

    const stepX = 300, stepY = 300;
    if(isFirst){
      addTask([{
        id: 0 + "",
        position: {
          x: -300,
          y: 300,
        },
        data: {
          label: "start",
          description: "start",
          parentId: "",
          status: "completed",
        },
        type: "customNode",
      } as Node]);
    }

    let y=0;
    addTask(tasks.map((task: ProjectTask, index: number) => {
      y += stepY;
      return {
        id: task.id + "",
        position: {
          x: startX ,
          y: y,
        },
        data: {
          label: task.name+"id="+task.id+":"+startX+":"+y,
          description: task.description,
          parentId: task.parentId,
          status: task.status,
        },
        type: "customNode",
      } as Node;
    }));

    for (let task of tasks) {
      
      if (task.task) {
        ConvertToNode2(task.task, addTask, startX + stepX,y, false);
      }
    }

}

const SordNodes2 = (nodes: Node[],startX=300,saveChange:(node:Node)=>void)=>{
 let nodeCols=  nodes.filter(node=>node.position.x===startX);
 
 nodeCols.forEach((node,index)=>{
    saveChange({
      ...node,
      position: { x: node.position.x, y: index*300 },
    } as Node);
  });

  if(nodeCols.length>0)
  SordNodes2(nodes,startX+300,saveChange);
}
//------------------------------node convertter 2 ---------------------------------
//------------------------------node---------------------------------
/*
const project = JSON.parse(JSON.stringify(test)) as Project; //const project = JSON.parse(JSON.stringify(projectData)) as Project;
let nodeArr: Node[] = [];
*/
//////////////////////////////test////////////////////////////////////
//const projectTest = JSON.parse(JSON.stringify(projectTest)) as Project;
/*
if (project.task)
  DrawProject(project.task, (node) => {
    nodeArr = [...nodeArr, node];
  });
for (let sortTime = 0; sortTime < 30; sortTime++) {
  SortNodes(nodeArr, (node) => {
    nodeArr = nodeArr.map((n) => (n.id === node.id ? node : n));
  });
}
const initialNodes: Node[] = nodeArr;
//////////////////////////////test////////////////////////////////////
//------------------------------node--------------------------------
*/

//-------------------------------test node ---------------------------
const projectTest = JSON.parse(JSON.stringify(test)) as Project;
/*
let nodeArr: Node[] = [];
ConverToNodeFlow(nodeArr, projectTest.task,(nodes)=> {
  nodeArr = [...nodeArr, ...nodes];
});
const initialNodes: Node[] = nodeArr;
*/
let nodeArr: Node[] = [];
ConvertToNode2( projectTest.task,(nodes)=> {
  nodeArr = [...nodeArr, ...nodes];
});
SordNodes2(nodeArr,-300,(node)=> {
  nodeArr = nodeArr.map(prev => prev.id === node.id ? node : prev);
});
const initialNodes: Node[] = nodeArr;
console.log(initialNodes);
//-------------------------------test node ---------------------------
//------------------------------test edge--------------------------------

let initialEdges: Edge[] = [];
ConvertToEdge(projectTest.task, (edg) => {
  initialEdges = [...initialEdges, ...edg];
});

//console.log(initialEdges);
const nodeTypes = {
  customNode: CustomNode,
};
//------------------------------test edge--------------------------------




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
  
 /*
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
*/
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

  const initTask = () => {
    if (props.tasks) {
      let initNodes: Node[] = [];
      DrawProject(props.tasks, (node) => {
        initNodes = [...initNodes, node];
      });

        for (let sortTime = 0; sortTime < 30; sortTime++) {
          SortNodes(initNodes , (node) => {
            initNodes = initNodes.map(prev => prev.id === node.id ? node : prev);
          });
        }
        setNodes(initNodes);
      ConvertToEdge(props.tasks, (edg) => {
        setEdges((prev) => [...prev, ...edg]);
      });


    }
  };

 // React.useEffect(initTask, [props.tasks]);

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
