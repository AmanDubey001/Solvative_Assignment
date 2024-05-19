import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Rewards = () => {
    const params = useParams();
    const [history,setHistory] = useState([]);
    const [userInfo,setUserInfo] = useState(null);
    useEffect(()=>{
        if(params?.id){
       axios.get(`http://localhost:5050/user?id=${params?.id}`).then(res=> {
       const result =  res?.data?.filter(item=> item?._id === params?.id);
        setUserInfo(result?.[0])
    }).catch(console.log);
        }
    },[])
    useEffect(()=>{
      if(userInfo){  axios.get('http://localhost:5050/transaction').then(res=> {
            setHistory(res?.data?.filter(item=>item?.reciever === userInfo?.username))
        } ).catch(console.log)
    }
     },[userInfo]);
  return (
    <div>
      <div>
    <button className="button" >
      Rewards: {userInfo?.rewards}
    </button>
    </div>
    <table style={{maxWidth:600,marginInline:"auto",marginTop:"3rem"}}>
    <thead>
      <tr>
         <th >S.No</th>
        <th>Name</th>
        <th>Recieved</th>
        <th>Recived_At</th>
      </tr>
    </thead>
    <tbody>
      {history?.map((item, index) => (
        <tr key={index} >
          <td>{index+1}</td>
          <td>{item?.sender}</td>
          <td>{item?.transfered}</td>
          <td>{item?.createdAt}</td>
         
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  )
}

export default Rewards
