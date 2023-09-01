import React from "react";
import { GanttPage } from "./Pages/GanttPage";
import { FlowPage } from "./Pages/FlowPage";
import { ProjectPage } from "./Pages/ProjectPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { KanbanPage } from "./Pages/KanbanPage";

// Init
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:projectId" element={<ProjectPage />}>
            {/*
            <Route index element={<GanttPage />} />
            <Route path="flow" element={<FlowPage />} />
            <Route path="kanban" element={<KanbanPage />} />
            */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
