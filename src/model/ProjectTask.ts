export interface ProjectTask {
  id: number;
  projectId: number;
  parentId: number;
  sequence: number;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  user: string;
  status: string;
  members: string;
  faculty: string;
  img?: string[];
  attached: string;
  userImage?: string;
  progress:number,
  task?: ProjectTask[];
  
}

export interface Project {
  id: number;
  projectType: number;
  categoryId: number;
  name: string;
  dueDate: string;
  status: string;
  task: ProjectTask[];
}
