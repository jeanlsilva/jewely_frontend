import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../apiClient";

type Materia = {
  id: string;
  name: string;
  quantity: number;
  reference: number;
  user_id: string;
}

type GetMateriaResponse = {
  totalCount: number;
  materia: Materia[];
}

type pageUser ={
  totalCount: number;
  users: number;
  pageStart: number;
  pageEnd: number;
  page: number;
  per_page: number;
}

export async function getMaterias(): Promise<Materia[]> {
    const {data} = await api.get("materias");

    const materias = data.map(materia => {
      return {
        id: materia.id,
        name: materia.name,
        quantity: materia.quantity,
        reference: materia.reference,
        user_id: materia.user_id,
      };
    });
    console.log(materias);
    return materias;
  };
  
  export function useMaterias(){
    return useQuery('materia', getMaterias,{
    staleTime: 1000 * 5 //5 segundos
  });
}

// export function pageUsers():Promise<pageUser> {
//   const page =1 ;
//   const per_page =10;

//   const total = getMaterias.length

//   const pageStart = (Number(page)- 1 * Number(per_page));
//   const pageEnd = pageStart + Number(per_page);

//   const users = this.serialize(getMaterias).slice(pageStart, pageEnd)

//   return{ 
//     total,
//     users,
//     pageStart,
//     pageEnd,
//     page,
//     per_page,
//   }
// }