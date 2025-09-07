import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addTasks: `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks/create`,
    updateTasks: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks/update/${id}`,
    fetchTasks: `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks`,
    fetchTask: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/tasks/${id}`,
    fetchUsers: `${process.env.NEXT_PUBLIC_BACK_END_URL}/user`,
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

  export const updateTask = async (tasksData: any) => {
    try {
      console.log('crb_taskData', tasksData)
      const result = await axios.put(urls.updateTasks(tasksData._id), tasksData, { withCredentials: true });
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

export function useTask(id: string) {
  const { data: task, error, mutate } = useSWR(urls.fetchTask(id), fetcher);

  return {
    task,
    isLoading: !error && !task,
    error,
    mutate,
  };
}


export function useUsers() {
  const { data: users, error, mutate } = useSWR(urls.fetchUsers, fetcher);

  return {
    users,
    isLoading: !error && !users,
    error,
    mutate,
  };
}