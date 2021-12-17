const RoomReducer = (state,action)=>{
    switch (action.type) {        
        case 'ADD_MSG_SUCCESS':
            return{
                ...state,
                room: {...state.room},
                messages: [...state.messages,action.payload ],
                isFetching: false,
                error: false
            }
        case 'FETCH_ROOM_SUCCESS':
            return{
                ...state,
                room: action.payload.room,
                messages: action.payload.messages,
                isFetching: false,
                error: false
            }
        default:
            return {
                ...state
            };
    }
}

export default RoomReducer