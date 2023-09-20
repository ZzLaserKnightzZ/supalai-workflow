import React from "react";
import { GanttPage } from "./Pages/GanttPage";
import { FlowPage } from "./Pages/FlowPage";
import { ProjectPage } from "./Pages/ProjectPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { KanbanPage } from "./Pages/KanbanPage";
import { Theme } from "./Pages/ThemePage";

// Init
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/:projectId" index element={<ProjectPage />}/>
            <Route path="/" element={<Theme />}/>
            {/*
            <Route index element={<GanttPage />} />
            <Route path="flow" element={<FlowPage />} />
            <Route path="kanban" element={<KanbanPage />} />
            */}
         {/* </Route>*/}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
