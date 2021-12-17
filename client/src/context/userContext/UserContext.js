import {useContext, useReducer} from 'react'
import UserReducer from './UserReducer'
const initialState = {
    users: [],
    isFetching: false,
    error: true,
}
export const UserContext = createContext(initialState)

export const UserProvider = ({children})=>{
    const [state,dispatch] = useReducer(UserReducer, initialState)

    return (
        <UserContext.UserProvider value={{
            users: state.users,
            isFetching: state.isFetching,
            error: state.error
        }}>
            {children}
        </UserContext.UserProvider>
    )
}