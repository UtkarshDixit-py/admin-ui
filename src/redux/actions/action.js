

export const setUsers = (usersList)=>{
    return{
        type : "SET_USERS",
        payload : usersList
    }
}

export const deleteUser = (userId)=>{
    return{
        type : "DELETE_USER",
        payload : userId
    }
}
