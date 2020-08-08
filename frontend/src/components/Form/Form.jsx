import React,{ useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import styles from './Form.module.css';

const Form = () => {
    const [name,setName] =useState("");
    const [gender,setGender] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState(0);
    const [DOB,setDOB] = useState("");
    const formObject = {name,gender,email,phone,DOB}
    let onSubmit = (e) => {
        e.preventDefault();
        if(name===""|| gender===""||email===""||phone===0||DOB===""){
            alert("Please do not keep any field empty")
        }
        else{
            axios.post('http://localhost:5000/users/',formObject)
            .then(res => alert(res.data))
            setName("");
            setEmail("");
            setPhone(0);
            setDOB("");
        }
    }
    return (
        <div className={styles.container}>
            <h1>Enter User Details To Add To Our User Database</h1>
            <br/>
            <div className={styles.center}>
            <form onSubmit={onSubmit}>
                <label>Name</label>
                <br/>
                <input className={styles.text} type="text" name="name" value={name} onChange={e => setName(e.target.value)}/>
                <br/>
                <label>Email</label>
                <br/>
                <input className={styles.text} type="text" name="email"  value={email} onChange={e => setEmail(e.target.value)}/>
                <br/>
                <label>Gender</label>
                <br/>
                <label>Male</label>
                <input type="radio" name="gender" id="male" value="male" onChange={e => setGender(e.target.value)}/>
                <label>Female</label>
                <input type="radio" name="gender" id="female" value="female" onChange={e => setGender(e.target.value)}/>
                <br/>
                <br/>
                <label>Phone Number</label>
                <br/>
                <input className={styles.text} value ={phone} type="number" name="pnum"onChange={e => setPhone(e.target.value)}/>
                <br/>
                <label>Date of Birth</label>
                <br/>
                <DatePicker className={styles.text} selected={DOB} onChange={date => setDOB(date)}/>
                <br/>
                <label>Image</label>
                <br/>
                <button>Submit</button>
            </form>
            </div>          
        </div>
    )
}

export default Form;
