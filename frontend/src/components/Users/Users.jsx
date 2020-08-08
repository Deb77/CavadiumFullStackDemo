import React,{useState,useEffect} from 'react'
import axios from 'axios';
import styles from './Users.module.css';

const Users = () => {
    const [users,setUsers] = useState([])
    useEffect(() => {
        async function getData(){
            await axios.get("http://localhost:5000/users")
        .then(res => {
            if(res.data.length>0){
                setUsers(res.data);
            }
        })
        }
        getData();
            
    },[])

    return (
        <div className={styles.container}>
            {users.map((user,k) => (
                <h1 key={k}>{user.email}</h1>
            ))}
            
        </div>
    )
}

export default Users;