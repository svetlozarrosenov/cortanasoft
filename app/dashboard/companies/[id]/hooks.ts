import axios from 'axios';
import useSWR from 'swr';

const urls = {
    fetchUsers: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/${id}`,
    fetchCompanyUsers: `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/company/collegues`,
    fetchRolesByCompany: (id: string) =>  `${process.env.NEXT_PUBLIC_BACK_END_URL}/roles/company/${id}`,
    fetchRolesPermissions:  `${process.env.NEXT_PUBLIC_BACK_END_URL}/roles/permissions`,
    createUser: `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/create`,
    fetchUserRole: `${process.env.NEXT_PUBLIC_BACK_END_URL}/roles/user`,
    updateUser: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/update/${id}`,
    createRole: `${process.env.NEXT_PUBLIC_BACK_END_URL}/roles/create`,
    updateRole: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/roles/update/${id}`,
    deleteRole: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/roles/delete/${id}`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const deleteRole = async (roleId: string) => {
  try {
    const result = await axios.delete(urls.deleteRole(roleId), { withCredentials: true });
    return result.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export const createUser = async (clientData: any) => {
    try {
      const result = await axios.post(urls.createUser, clientData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const updateUser = async (userData: any) => {
    try {
      const result = await axios.put(urls.updateUser(userData._id), userData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


  export const createRole = async (clientData: any) => {
    try {
      const result = await axios.post(urls.createRole, clientData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const updateRole = async (id: string, roleData: any) => {
    try {
      const result = await axios.put(urls.updateRole(id), roleData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export function useRolesByCompany(id: string) {
    const { data: roles, error, mutate } = useSWR(urls.fetchRolesByCompany(id), fetcher);
  
    return {
      roles,
      isLoading: !error && !roles,
      error,
      mutate,
    };
  }

  export function useUserRole() {
    const { data: userRole, error, mutate } = useSWR(urls.fetchUserRole, fetcher);
  
    return {
      userRole,
      isLoading: !error && !userRole,
      error,
      mutate,
    };
  }

  export function useRolesPermissions() {
    const { data: rolesPermissions, error, mutate } = useSWR(urls.fetchRolesPermissions, fetcher);
  
    return {
      rolesPermissions,
      isLoading: !error && !rolesPermissions,
      error,
      mutate,
    };
  }

  export function useUsers(companyId: string) {
    const { data: users, error, mutate } = useSWR(urls.fetchUsers(companyId), fetcher);
  
    return {
      users,
      isLoading: !error && !users,
      error,
      mutate,
    };
  }

  export function useCompanyUsers() {
    const { data: users, error, mutate } = useSWR(urls.fetchCompanyUsers, fetcher);
  
    return {
      users,
      isLoading: !error && !users,
      error,
      mutate,
    };
  }