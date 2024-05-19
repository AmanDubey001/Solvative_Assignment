import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const NewRewards = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [userData,setUserData] = useState([]);
    const [userInfo,setUserInfo] = useState(null);
    const[selectedUser,setSelectedUser] = useState(null);
    const [value,setValue] = useState(0);
    const [update,setUpdate] = useState(false);
    useEffect(()=>{
        if(params?.id){
       axios.get(`http://localhost:5050/user?id=${params?.id}`).then(res=> {
       const result =  res?.data?.filter(item=>{
        if(item?._id === params?.id) setUserInfo(item)
        return item?._id !== params?.id
       } );
        setUserData(result);
        setSelectedUser(result[0]?._id)
    }).catch(console.log);
        }
    },[update])
    const handleSelected = (e) =>{
        setSelectedUser(e.target.value)}

    const handleSubmit = () =>{
    if(userInfo && selectedUser){
       const rece =  userData?.filter(item=>item?._id === selectedUser)
        const body = {
                sender: userInfo?.username,
                reciever: rece[0]?.username,
                transfered: +value,
                recieved: +value
              
        }
        axios.post('http://localhost:5050/transaction',body).then((res=>{
            if(res?.data?._id){
                setUpdate(prev=>!prev)
                navigate(`/${params?.id}/p5`)            
            }

        })).catch(console.log)
        }
    }
  return (
    <div>
       Send To  {" "}
   <select value={selectedUser} onChange={handleSelected}>
      {userData?.map(user => (
        <option key={user?._id} value={user?._id}>
          {user?.username}
        </option>
      ))}
    </select>

    <div><input type="number" placeholder="Transfering..." min="0" max="100" value={value}  onChange={(e=> setValue(e.target.value))} />
    <p>Balance: {" "} {userInfo?.p5balance}</p>
    </div>
 <div>
    <button disabled={ !(userInfo?.p5balance>=value && value<=100)} className="button" onClick={()=>handleSubmit()}>
        Submit
    </button>
    </div>
    <div>
    <button className="button" onClick={() => navigate(`/${params?.id}/p5`) }>
        Cancel
    </button>
    </div>
     

    </div>
  )
}

export default NewRewards
