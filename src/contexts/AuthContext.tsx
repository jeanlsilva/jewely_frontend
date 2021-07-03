import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies' 
import Router from 'next/router'

import { api } from "../services/apiClient";

type User = {
  email: string;
  id: string;
  name: string;
  avatar: string;
  cargo: string;
};

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'jewely.token')
  // destroyCookie(undefined, 'jewely.refreshToken')

  authChannel.postMessage('signOut');

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { 'jewely.token': token } = parseCookies()

    if (token) {
      const {sub} = token;
      console.log(sub);   
      api.get(`/users`)
        .then(response => {
          const { email, cargo, name,  id, avatar } = response.data

          setUser({ email, cargo , id, avatar, name })
        })
        .catch(() => {
          signOut();
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })

      console.log(response.data)
      console.log(response.data.user)

      const token = response.data.token
      const { cargo , name, id, avatar} = response.data.user;

      console.log(token)

      setCookie(undefined, 'jewely.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      // setCookie(undefined, 'jewely.refreshToken', refreshToken, {
      //   maxAge: 60 * 60 * 24 * 30, // 30 days
      //   path: '/'
      // })

      setUser({
        email,
        cargo,
        name, 
        id,
        avatar
      })

      // console.log(user)

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}