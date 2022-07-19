import { createContext, Dispatch, SetStateAction, useState, useContext } from 'react'
import { MongooseAccountInterface } from '../interfaces/account';

export interface GlobalStateInterface {
  account: MongooseAccountInterface,
  expiresOn: string | null,
  loggedIn: boolean
}

const GlobalStateContext = createContext({
  state: {} as GlobalStateInterface,
  setState: {} as Dispatch<SetStateAction<GlobalStateInterface>>,
});


const GlobalStateProvider = ({
  children,
  value = {} as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: GlobalStateInterface;
}) => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  )
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };