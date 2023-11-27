'use client'
import React, {createContext, useContext, Dispatch, SetStateAction,useState, useEffect} from 'react';
import api from '../api/axiosInstance';
import { UserCreateResponse, UserCreateInput } from '../interface/User';
import { Purchase, PurchaseResponse } from '../interface/Purchase';

interface UserContextProps {
  userDatabase: UserCreateInput;
  setUserDatabase: Dispatch<SetStateAction<UserCreateInput>>;
  getUserByEmail: (userId: string) => Promise<UserCreateInput>;
  createUser: (user: UserCreateInput) => Promise<UserCreateResponse>;
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const UserContext = createContext({} as UserContextProps)

export const UserDatabseProvider = ({children}: any) => {
  const [userDatabase, setUserDatabase] = useState<UserCreateInput>({
    name: '',
    lastname: '',
    email: '',
    role: 'user',
    identification: '',
    status: true
  })
  const [loading, setLoading] = useState<boolean>(false)

  const getUserByEmail = async (email: string): Promise<UserCreateInput> => {
    setLoading(true)
    try {
        const {data} = await api.get<UserCreateResponse>(`/users/${email}`)
        setUserDatabase(data.data)
        return data.data
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (user: UserCreateInput): Promise<UserCreateResponse>=>{
    setLoading(true)
    try {
      const {data} = await api.post<UserCreateResponse>("/users", user)
      return data
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setLoading(false)
    }
  }


  return (
    <UserContext.Provider
      value={{
        userDatabase,
        setUserDatabase,
        getUserByEmail,
        createUser,
        loading,
        setLoading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)