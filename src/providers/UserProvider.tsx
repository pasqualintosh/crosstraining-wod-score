import React from 'react';
import useLocalStorage from './../helpers/useLocalStorage';

type UserProviderProps = {};
type UserContextState = {
  getCurrentUser: () => User;
  setCurrentUser: (currentUser: User) => void;
};

export interface User {
  first_name?: string;
  last_name?: string;
  dob?: Date;
  weight?: number;
  height?: number;
}

const UserProviderContext = React.createContext<UserContextState | undefined>(
  undefined,
);

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
}): JSX.Element => {
  const defaultUser: User = {};
  const [user, setUser] = useLocalStorage('user', defaultUser);

  const getCurrentUser = (): User => user;

  const setCurrentUser = (currentUser: User): void =>
    setUser({ ...user, ...currentUser });

  return (
    <UserProviderContext.Provider value={{ getCurrentUser, setCurrentUser }}>
      {children}
    </UserProviderContext.Provider>
  );
};

export const useUserProviderContext = (): UserContextState => {
  const context = React.useContext(UserProviderContext);
  if (context === undefined) {
    throw new Error('UserProviderContext must be used with a Provider');
  }

  return context;
};
