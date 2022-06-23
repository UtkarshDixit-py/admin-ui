import React, { useEffect , useState } from 'react'
import { Container } from '../assets/Style';
import { useSelector , useDispatch } from 'react-redux';
import { deleteUser, setUsers } from '../redux/actions/action';


const AdminPanel = () => {
  const [data,setData] = useState([]);
  const users = useSelector((state)=>state.userReducer.List);
  const dispatch = useDispatch();
  
    useEffect(()=>{
      fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
      .then((response)=>response.json())
      .then((actualData)=>dispatch(setUsers(actualData)));
    },[]);

   const onDelete=(id)=>{
      dispatch(deleteUser(id));
    }
  
    if(users){
      return(
        <Container>
          <table class="ui blue table">
            <thead>
                <tr>
                <th>check box</th>
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
                      <tr>
                        <td>checkbox</td>
                      <td>{name}</td>
                      <td>{role}</td>
                      <td>{email}</td>
                      <td> 
                      <div class="ui icon buttons">
                          <button class="ui blue basic button">
                            <i class="edit icon blue "></i>
                          </button>
                          <button class="ui red basic button" onClick={()=>onDelete(id)}>
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
      )
    }
    else{
      return null;
    }
  
}

export default AdminPanel