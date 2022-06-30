const initialState = {
    List:[],
    isModalOpen:false,
    userToUpdateData:{},
    searchedUsersList: [],
    inputForSearch:''

}


export const userReducer = (state = initialState,action)=>{
    switch(action.type){

        case "SET_USERS" :
            return{
                ...state,
                List : action.payload,
                searchedUsersList : action.payload
            }

        case "DELETE_USER" :
        return{
                ...state,
                List: state.List.filter((i) => i.id !== action.payload),
                searchedUsersList: state.List.filter((i) => i.id !== action.payload)
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
                searchedUsersList : updatedData
            }

        case "DELETE_SELECTED" :
            let set = new Set();
            for(let val of action.payload){
                set.add(val);
            }
            let filteredList = state.List.filter((user)=>!set.has(user.id))
            return{
                ...state,
                List : filteredList,
                searchedUsersList : filteredList
            };

        case "SEARCH_USERLIST" :
            return{
                ...state,
                searchedUsersList : action.payload
            }

        case "SEARCH_INPUT" :
            return{
                ...state,
                inputForSearch : action.payload
            }

        default:
            return state;
    }
}