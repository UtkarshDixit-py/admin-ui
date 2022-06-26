import React, { useEffect , useState } from 'react'
import { Container } from '../assets/Style';
import { useSelector , useDispatch } from 'react-redux';
import { deleteUser, setUsers , openModal } from '../redux/actions/action';
import UpdateModal from './UpdateModal';

const AdminPanel = () => {
  const users = useSelector((state)=>state.userReducer.List);
  const isModalOpen = useSelector((state)=>state.userReducer.isModalOpen);
  const dispatch = useDispatch();
  
  
    useEffect(()=>{
      fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
      .then((response)=>response.json())
      .then((actualData)=>dispatch(setUsers(actualData)));
    },[]);

   const handleDelete=(id)=>{
      dispatch(deleteUser(id));
    }
    
    const handleOpenModal=(user)=>{
      dispatch(openModal(user))
    }
  


    if(users){
      return(
        <>
        {isModalOpen===true? <UpdateModal/>  : null} 
        <Container>
          <table class="ui blue table">
            <thead>
                <tr>
                <th>&nbsp;</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {users.map(user=>{
                const {name , role , email , id} = user;
                return(
                      <tr key={id}>
                      <td>
                        <div class="ui checkbox">
                          <input type="checkbox" name="example"/>
                          <label></label>
                        </div>
                      </td>
                      <td>{name}</td>
                      <td>{role}</td>
                      <td>{email}</td>
                      <td> 
                      <div class="ui icon buttons">
                          <button class="ui blue basic button" onClick={()=>handleOpenModal(user)}>
                            <i class="edit icon blue "></i>
                          </button>
                          <button class="ui red basic button" onClick={()=>handleDelete(id)}>
                            <i class="trash icon red "></i>
                          </button>
                        </div>
                      </td>
                      </tr>
                    )
              })}
            </tbody>
          </table>
        </Container>
        </>
      )
    }
    else{
      return null;
    }
  
}

export default AdminPanel