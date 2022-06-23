import React, { useEffect , useState } from 'react'
import { Container } from '../assets/Style';
import { useSelector , useDispatch } from 'react-redux';
import { setUsers } from '../redux/actions/action';


const AdminPanel = () => {
  const [data,setData] = useState([]);
  const users = useSelector((state)=>state.userReducer.List);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
    .then((response)=>response.json())
    .then((actualData)=>dispatch(setUsers(actualData)));
  },[]);

  
    if(users){
      return(
        <Container>
          <table class="ui green table">
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
                return(
                      <tr>
                        <td>checkbox</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td> 
                        <i class="blue large edit icon"></i>
                        <i class="red large trash icon"></i>
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