import React,{ useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

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
            .then(res => console.log(res.data))
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Name</label>
                <input type="text" name="name" onChange={e => setName(e.target.value)}/>
                <label>Gender</label>
                <label>Male</label>
                <input type="radio" name="gender" id="male" value="male" onChange={e => setGender(e.target.value)}/>
                <label>Female</label>
                <input type="radio" name="gender" id="female" value="female" onChange={e => setGender(e.target.value)}/>
                <label>Email</label>
                <input type="text" name="email" onChange={e => setEmail(e.target.value)}/>
                <label>Phone Number</label>
                <input type="number" name="pnum"onChange={e => setPhone(e.target.value)}/>
                <label>Date of Birth</label>
                <DatePicker selected={DOB} onChange={date => setDOB(date)}/>
                <label>Image</label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Form;
