import React,{useState,useEffect} from 'react'
import axios from 'axios';
import styles from './Users.module.css';
import Card from '../Card/Card';

const Users = () => {
    const [users,setUsers] = useState([])
    const [query,setQuery] = useState("");

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
    const formObject = {query}

    let onSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/users/search/",formObject)
        .then( res => console.log(res.data.user));
        setQuery("");
    }

    
    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
                <button>Submit</button>
            </form>
            {users.map((user,k) => (
                <Card key={k} name={user.name} email={user.email} gender={user.gender} DOB={user.DOB.slice(0,10)}/>
            ))}
            
        </div>
    )
}

export default Users;