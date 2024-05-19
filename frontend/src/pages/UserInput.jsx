import React, { useEffect, useState } from 'react';
import "../pages/Userinput.css"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserInput = () => {
    const [value,setValue] = useState("");
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useState(null)
    const params = useParams();
    const [usersData,setUsersData] = useState([]);
    useEffect(()=>{
        if(params?.id){
       axios.get(`http://localhost:5050/user?id=${params?.id}`).then(res=> {
        setUsersData(res?.data)
       const result =  res?.data?.filter(item=> item?._id === params?.id);
    setUserInfo(result?.[0])
       setValue(result?.[0]?.username)
    }).catch(console.log);

        }
    },[])
    const handleClick=() =>{
        axios.post('http://localhost:5050/user' ,{ username:value,
        p5balance: 100,
        rewards: 0}).then((res)=>{
            if(res?.data?.created){
                navigate("/")
            }
        }).catch(console.log);
    }

    const handleUpdateUser=() =>{
        axios.put('http://localhost:5050/user' ,{ username:userInfo?.username,
        newUserName:value
        }).then(console.log).catch(console.log);
    }

  return (
    <div >
       <div><input type="text" placeholder="Username" value={value}  onChange={(e=> setValue(e.target.value))} /></div>
       {params?.id ? (<>
        <div><button className="button" onClick={handleUpdateUser}>
        Save
      </button></div>
      <div><button className="button" onClick={()=>navigate(`/${params.id}/p5`)}>
        Show P5Balance
      </button></div>
      <div><button className="button" onClick={()=>navigate(`/${params.id}/rewards`)}>
        Show Reward History
      </button></div>
       </>):(<><div><button className="button" onClick={handleClick}>
        Save
      </button></div>
      <div><button className="button" onClick={()=>navigate("/")}>
        Cancel
      </button></div></>)}
    </div>
  )
}

export default UserInput
