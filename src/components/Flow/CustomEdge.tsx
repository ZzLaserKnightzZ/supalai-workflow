import React, { FC } from "react";
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
} from "reactflow";
import { EdgeBox } from "../../styled/Flow/Edge.styled";
import { BsPlusCircle } from "react-icons/bs";

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  style,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isHover, setIsHover] = React.useState(false);
  return (
    <>
      <BaseEdge id={id} path={edgePath}  markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <EdgeBox
          $status="1"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents:
              "all" /* this is the key to make the edge clickable */,
          }}
          className="nodrag nopan"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {isHover ? data.label : <BsPlusCircle />}
        </EdgeBox>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
