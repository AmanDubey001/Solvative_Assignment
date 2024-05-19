import React, { useEffect, useState } from 'react';
import "../pages/Home.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [usersData,setUsersData] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
     axios.get('http://localhost:5050/user').then(res=> setUsersData(res?.data) ).catch(console.log)
  },[])
  return (
    <div>
      <button className="button" onClick={() => navigate("/new") }>
        Create New User
      </button>
      <table style={{maxWidth:600,marginInline:"auto",marginTop:"3rem"}}>
      <thead>
        <tr>
           <th >S.No</th>
          <th>Name</th>
          <th>P5_Balance</th>
          <th>Rewards</th>
          <th>Login</th> {/* Button column */}
        </tr>
      </thead>
      <tbody>
        {usersData?.map((item, index) => (
          <tr key={index} >
            <td>{index+1}</td>
            <td>{item?.username}</td>
            <td>{item?.p5balance}</td>
            <td>{item?.rewards}</td>
            <td>
              <button className='login' onClick={() => navigate(`/${item?._id}`) }>Login</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Home
