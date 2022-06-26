import React from 'react'
import { closeModal ,updateUser } from '../redux/actions/action';
import { useDispatch , useSelector} from 'react-redux';
import { useState } from 'react';
import {ModalBackground,ModalContainer,CloseModalBtn} from "../assets/Style"
const UpdateModal = () => {
  
  const userData = useSelector((state)=>state.userReducer.userToUpdateData)
  const dispatch = useDispatch();

  const handleCloseModal=()=>{
    dispatch(closeModal(false))
  }
  const [updateUserData, setUserUpdateData] = useState({
    id: userData.id,
    name : userData.name,
    role: userData.role,
    email: userData.email
  })

  const changeHandler = e =>{
    setUserUpdateData({...updateUserData,[e.target.name]:e.target.value})
  }

  const submitHandler=()=>{
    dispatch(updateUser(updateUserData));
    handleCloseModal();
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseModalBtn>
          <button
          onClick={() => {
            handleCloseModal()
          }}
          >
            X
          </button>
        </CloseModalBtn>
        <form class="ui form">
        <div class="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" value={updateUserData.name} onChange={changeHandler}/>
        </div>
        <div class="field">
          <label>Role</label>
          <input type="text" name="role" placeholder="Role" value={updateUserData.role} onChange={changeHandler}/>
        </div>
        <div class="field">
          <label>Email</label>
          <input type="text" name="email" placeholder="Email" value={updateUserData.email} onChange={changeHandler}/>
        </div>
        <button class="fluid ui button big blue " type="button" onClick={submitHandler}>Submit</button>
      </form>
      </ModalContainer>
    </ModalBackground>
  )
}

export default UpdateModal;