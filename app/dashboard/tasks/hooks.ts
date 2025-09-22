import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addTasks: `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks/create`,
    updateTask: (id: any) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks/update/${id}`,
    createTaskComment: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks/${id}/comment/create`,
    fetchTasks: `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks`,
    fetchActiveTasks: `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks/active`,
    fetchTask: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks/${id}`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createTask = async (tasksData: any) => {
    try {
      const result = await axios.post(urls.addTasks, tasksData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const updateTask = async (taskId: any, tasksData: any) => {
    try {
      const result = await axios.put(urls.updateTask(taskId), tasksData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const createTaskComment = async (tasksData: any) => {
    try {
      const result = await axios.put(urls.createTaskComment(tasksData._id), tasksData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useTasks() {
  const { data: tasks, error, mutate } = useSWR(urls.fetchTasks, fetcher);

  return {
    tasks,
    isLoading: !error && !tasks,
    error,
    mutate,
  };
}

export function useActiveTasks() {
  const { data: tasks, error, mutate } = useSWR(urls.fetchActiveTasks, fetcher);

  return {
    tasks,
    isLoading: !error && !tasks,
    error,
    mutate,
  };
}

export function useTask(id: string) {
  const { data: task, error, mutate } = useSWR(urls.fetchTask(id), fetcher);

  return {
    task,
    isLoading: !error && !task,
    error,
    mutate,
  };
}
