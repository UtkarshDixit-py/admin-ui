import React, { useEffect , useState } from 'react'


const AdminPanel = () => {
  const [data,setData] = useState([]);
  
  useEffect(()=>{
    fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
    .then((response)=>response.json())
    .then((actualData)=>setData(actualData));
  },[]);
  
  
    if(data){
      return(
        <>
          <table class="ui compact table">
            <thead>
                <tr>
                <th>check box</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {data.map(user=>{
                return(
                      <tr>
                        <td>checkbox</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td> 
                        <i class="edit icon"></i>
                        <i class="trash icon"></i>
                      </td>
                      </tr>
                    )
              })}
            </tbody>
          
          </table>
        </>
      )
    }
    else{
      return null;
    }
  
}

export default AdminPanel