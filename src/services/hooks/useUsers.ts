import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../apiClient";

type User = {
  id: string;
  name: string;
  email: string;
  cargo: string;
  createdAt: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

type pageUser ={
  totalCount: number;
  users: number;
  pageStart: number;
  pageEnd: number;
  page: number;
  per_page: number;
}

export async function getUsers(): Promise<User[]> {
    const {data} = await api.get("users");

    const users = data.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        cargo: user.cargo,
        createdAt: new Date(user.created_At).toLocaleDateString('pt',{
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      };
    });

    return users;
  };
  
  export function useUsers(){
    return useQuery('users', getUsers,{
    staleTime: 1000 * 5 //5 segundos
  });
}

export function pageUsers():Promise<pageUser> {
  const page =1 ;
  const per_page =10;

  const total = getUsers.length

  const pageStart = (Number(page)- 1 * Number(per_page));
  const pageEnd = pageStart + Number(per_page);

  const users = this.serialize(getUsers).slice(pageStart, pageEnd)

  return{ 
    total,
    users,
    pageStart,
    pageEnd,
    page,
    per_page,
  }
}