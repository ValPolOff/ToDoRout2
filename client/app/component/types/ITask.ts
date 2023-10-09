export interface ITask {
    id: number;
    completed: boolean;
    text: string;
    data: string;
    createdAt: string;
    updatedAt:string;
  }
  
  
  /*export interface ITaskItem {
    id: number;
    isDone: boolean;
    name: string;
    date: string;
    changeIsDone: (task: { id: number; name: string; isDone: boolean }) => void;
    handleClick: (
      action: string,
      id: number,
      name: string,
      isDone: boolean
    ) => void;
  }
  
  export interface ITaskAction {
    action: string;
    id: number;
    name: string;
    isDone: boolean;
  }*/