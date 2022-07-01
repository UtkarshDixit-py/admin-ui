import React, { useEffect , useState , useRef } from 'react'
import { Container } from '../assets/Style';
import { useSelector , useDispatch } from 'react-redux';
import { deleteUser, setUsers , openModal ,deleteSeleted ,updateSearchInput , searchUsersList} from '../redux/actions/action';
import UpdateModal from './UpdateModal';
import Pagination from './Pagination';

const AdminPanel = () => {
  const users = useSelector((state)=>state.userReducer.List);
  const isModalOpen = useSelector((state)=>state.userReducer.isModalOpen);
  const searchedUsersList = useSelector((state)=>state.userReducer.searchedUsersList);
  const dispatch = useDispatch();
  const [checked ,setChecked] =  useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [checkedAll , setCheckedAll] = useState(false);
  const [deleteAll, setDeleteAll] = useState({first:0 , last :10})

  
    useEffect(()=>{
      fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
      .then((response)=>response.json())
      .then((actualData)=>dispatch(setUsers(actualData)));
    },[]);

   var handleDelete=(id)=>{
      dispatch(deleteUser(id));
    }
    
    var handleOpenModal=(user)=>{
      dispatch(openModal(user))
    }
    
    var handleChecked =(id,ifChecked)=>{
      if(ifChecked){
        setChecked((prev)=>[...prev, id]);
      } else{
        setChecked((prev)=>prev.filter((elemId)=>elemId!==id));
      }
    };
    
    var handleDeleteSeleted =(idArr)=>{
      dispatch(deleteSeleted(idArr));
      setChecked([]);
    }

    var handleSearch=(event)=>{
      // dispatch(updateSearchInput(event.target.value));
      search(event.target.value);


    }
    
    const search =(input)=>{
      const filteredUserList = users.filter((user)=>{
        const {name , role , email , id} = user;
        const fullDetail = name  + email + role;
        if(fullDetail.toLowerCase().includes(input.toLowerCase())){
          return true;
        }
        return false;
      })
      dispatch(searchUsersList(filteredUserList))
    }

    const paginate = (pageNo) => setCurrentPage(pageNo)

    const LastDataObjectIndex = currentPage*dataPerPage
    const FirstDataObjectIndex = LastDataObjectIndex - dataPerPage
    const currentData = searchedUsersList.slice(FirstDataObjectIndex,LastDataObjectIndex)

    const handleSelectAll=(check)=>{
      let first = deleteAll.first;
      let last = deleteAll.last;

      if(check===true){
        setCheckedAll(true)
        let items = [...checked]
        for(let i = first ;i<=last ; i++){
          items.push(i.toString())
      }
      setChecked(items)
      let nfirst = first+10
      let nlast = last+10
      setDeleteAll({first : nfirst,last:nlast})
        
      }else{
        setCheckedAll(false)
      }
    }

    if(searchedUsersList){ 
      return(
        <>
        {isModalOpen===true? <UpdateModal/>  : null} 
        <Container>
        <div className="ui category search">
        <div className="ui icon input">
        <input className="prompt" type="text" placeholder="Search Here" onChange={handleSearch} />
        <i className="search icon"></i>
        </div>
        <div className="results"></div>
        </div>
          <table className="ui blue table">
            <thead>
                <tr>
                <th>
                  <div className="ui checkbox">
                          <input type="checkbox" name="selected"  onChange={(e)=>handleSelectAll(e.target.checked)}/>
                          <label></label>
                  </div>
                </th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
              currentData.map(user=>{
                const {name , role , email , id} = user;
                return(
                      <tr key={id}>
                      <td>
                        <div className="ui checkbox">
                          <input type="checkbox" name="selected"  onChange={(e)=>handleChecked(id,e.target.checked)}/>
                          <label></label>
                        </div>
                      </td>
                      <td>{name}</td>
                      <td>{role}</td>
                      <td>{email}</td>
                      <td> 
                      <div className="ui icon buttons">
                          <button className="ui blue basic button" onClick={()=>handleOpenModal(user)}>
                            <i className="edit icon blue "></i>
                          </button>
                          <button className="ui red basic button" onClick={()=>handleDelete(id)}>
                            <i className="trash icon red "></i>
                          </button>
                        </div>
                      </td>
                      </tr>
                    )
              })}
            </tbody>
          </table>
          <button className="ui red basic left floated button" onClick={()=>handleDeleteSeleted(checked)}>Delete Selected({checked.length})</button>
          <Pagination  currentPage={currentPage} dataPerPage={dataPerPage} totalData={searchedUsersList.length} paginate={paginate} />
        </Container>
        </>
      )
    }
    else{
      return null;
    }
  
}

export default AdminPanel