const initialState = {
    List:[],
    isModalOpen:false,
    userToUpdateData:{}

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
        
        case "OPEN_MODAL" :
            return{
                ...state,
                isModalOpen : true,
                userToUpdateData :action.payload
            }

        case "CLOSE_MODAL" :
            return{
                ...state,
                isModalOpen : false
            }

        case "UPDATE_USER" :
            const updatedData = state.List.map((elem)=>{
                if(elem.id===action.payload.id){
                    return{
                        ...elem,
                        name : action.payload.name,
                        role : action.payload.role,
                        email : action.payload.email
                    }
                }
                return elem
            })
            return{
                ...state,
                List : updatedData,


            }

        default:
            return state;
    }
}