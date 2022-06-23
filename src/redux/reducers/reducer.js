const initialState = {
    List:[]
}


export const userReducer = (state = initialState,action)=>{
    switch(action.type){

        case "SET_USERS" :
            return{
                ...state,
                List : action.payload
            }

        case "DELETE_USER" :
        return{
                ...state,
                List: state.List.filter((i) => i.id !== action.payload)
            }

        default:
            return state;
    }
}