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
    const [file,setFile] = useState('');
    const [filename,setFilename] = useState('Choose File');
    const [uploaded,setUploaded] = useState({});
    const [pass,setPass] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setPass('/uploads/'+e.target.files[0].name);
    }

    const formObject = {name,gender,email,phone,DOB,pass}
    let onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
            formData.append('file',file);

            try{
                const res = await axios.post('http://localhost:5000/upload',formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                const {fileName,filePath} = res.data;
                setUploaded({fileName,filePath})

            }catch(err){
                if(err.response.status === 500){
                    console.log('There was a problem with the server');
                }else{
                    console.log(err.response.data.msg);
                }
            }

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
            <form onSubmit={onSubmit} encType="multipart/form-data">
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
                <label>Image({filename})</label>
                <br/>
                <input type="file" onChange={onChange}/>
                <button>Submit</button>
            </form>
            {uploaded?(
                <div>
                    <img style={{width:'100px',height:'100px'}} src={uploaded.filePath} alt=""/>
                </div>
            ):null}
            </div>          
        </div>
    )
}

export default Form;
