import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const P5Balance = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [history,setHistory] = useState([]);
    const [userInfo,setUserInfo] = useState(null);
    const [deleted,setDeleted] = useState(false);
    useEffect(()=>{
        if(params?.id){
       axios.get(`http://localhost:5050/user?id=${params?.id}`).then(res=> {
       const result =  res?.data?.filter(item=> item?._id === params?.id);
        setUserInfo(result?.[0])
    }).catch(console.log);
        }
    },[deleted])
    useEffect(()=>{
      if(userInfo){  axios.get('http://localhost:5050/transaction').then(res=> {
            setHistory(res?.data?.filter(item=>item?.sender === userInfo?.username))
        } ).catch(console.log)
    }
     },[userInfo,deleted]);
   
     const handleDelete = (body) =>{
       if(body) axios.delete('http://localhost:5050/transaction',{data:body}).then(res=>{
        if(res?.data?.acknowledged) setDeleted(prev=>!prev)
       }).catch(console.log)
     }
  return (
    <div>
        <div>
          <button className="button" onClick={() => navigate(`/${params?.id}/rewards/new`) }>
        Create reward
    </button>
    </div>
    <div>
    <button className="button" >
      P5: {userInfo?.p5balance}
    </button>
    </div>
    <table style={{maxWidth:600,marginInline:"auto",marginTop:"3rem"}}>
    <thead>
      <tr>
         <th >S.No</th>
        <th>Name</th>
        <th>Transfered</th>
        <th>Given At</th>
        <th>Action</th> {/* Button column */}
      </tr>
    </thead>
    <tbody>
      {history?.map((item, index) => (
        <tr key={index} >
          <td>{index+1}</td>
          <td>{item?.reciever}</td>
          <td>{item?.transfered}</td>
          <td>{item?.createdAt}</td>
          <td>
            <button className='login' onClick={() => handleDelete(item) }>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  )
}

export default P5Balance
