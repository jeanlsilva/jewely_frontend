import axios, { AxiosError } from 'axios';
import {parseCookies} from 'nookies';

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    //baseURL: 'http://localhost:3000/api', 
    baseURL: 'http://localhost:3333',
    headers:{
      Authorization: `Bearer ${cookies['jewely.token']}` 
    }
  }); 
  return api
};
