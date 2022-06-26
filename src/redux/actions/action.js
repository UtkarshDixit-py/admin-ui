
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

export const openModal = (modalStatus)=>{
    return{
        type: "OPEN_MODAL",
        payload: modalStatus
    }
}

export const closeModal = (modalStatus)=>{
    return{
        type: "CLOSE_MODAL",
        payload: modalStatus
    }
}

export const updateUser = (payload)=>{
    return{
        type: "UPDATE_USER",
        payload: payload
    }
}

