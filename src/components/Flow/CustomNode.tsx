import { memo, useContext, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import {
  CopyBtn,
  LockBtn,
  NodeContainer,
  TextContainer,
  ViewDetailBtn,
} from "../../styled/Flow/Flow.styled";
import { TaskContext } from "../../Pages/ProjectPage";
import {
  AiOutlineCopy,
  AiOutlineRead,
  AiOutlineLock,
  AiOutlineUnlock,
} from "react-icons/ai";

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  const { ViewDetail } = useContext(TaskContext);
  const [isFullSize, setIsFullSize] = useState(false);

  return (
    <>
      <NodeContainer $status={data?.status} $isFullSize={isFullSize}>
        <LockBtn onClick={() => setIsFullSize((x) => !x)}>
          {isFullSize ? <AiOutlineLock /> : <AiOutlineUnlock />}
        </LockBtn>
        <ViewDetailBtn onClick={() => ViewDetail(data?.label)}>
          <AiOutlineRead />
        </ViewDetailBtn>
        <CopyBtn
          onClick={() =>
            navigator.clipboard.writeText(data?.label + ":" + data?.description)
          }
        >
          <AiOutlineCopy />
        </CopyBtn>
        <Handle
          type="target"
          //position={targetPosition}
          position={Position.Left}
          isConnectable={isConnectable}
          style={{ border: "1px solid lime", backgroundColor: "lime" }}
        />
        <TextContainer>
          {" "}
          <b>{data?.label}</b> <br />
          {data?.description}
        </TextContainer>
        <Handle
          type="source"
          //position={sourcePosition}
          position={Position.Right}
          isConnectable={isConnectable}
          style={{ border: "1px solid lime", backgroundColor: "lime" }}
        />
      </NodeContainer>
    </>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
