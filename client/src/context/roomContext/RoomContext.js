import { createContext,useReducer } from "react";
import RoomReducer from "./RoomReducer";

const initialStalte ={    
    room: {},
    messages: [],
    isFetching: false,
    error: false
}

export const RoomContext = createContext(initialStalte)

export const RoomContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(RoomReducer, initialStalte)
    return(
        <RoomContext.Provider value={{
            room: state.room,
            messages: state.messages,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </RoomContext.Provider>
    )
}