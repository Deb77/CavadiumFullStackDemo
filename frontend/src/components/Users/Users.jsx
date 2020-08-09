import React,{useState,useEffect} from 'react'
import axios from 'axios';
import styles from './Users.module.css';
import Card from '../Card/Card';
import classnames from 'classnames';

const Users = () => {
    const [users,setUsers] = useState([])
    const [query,setQuery] = useState("");
    const [data,setData] = useState([]);
    const [filter,setFilter] = useState([]);

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
        .then( res => setData(res.data.user))
        setQuery("");
    }


    let onChild = () => {
        axios.post("http://localhost:5000/users/filter/",{ $gte: 0, $lte: 18 })
        .then( res => setFilter(res.data.user))
    }
    let onYouth = () => {
        axios.post("http://localhost:5000/users/filter/",{ $gte: 19, $lte: 35 })
        .then( res => setFilter(res.data.user))
    }
    let onAdult = () => {
        axios.post("http://localhost:5000/users/filter/",{ $gte: 36 })
        .then( res => setFilter(res.data.user))
    }

    
    return (
            <div className={styles.container}>
            <div className={styles.formC}>
                <form  className={styles.form} onSubmit={onSubmit}>
                    <input className={styles.search} type="text" value={query} onChange={e => setQuery(e.target.value)}/>
                    <button className={styles.btn}><img alt=""src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABbElEQVRIia2VsU4CQRRFnxRYiJ02LIWFPX/gZ4DaaaEGkIoGO39LQoyCrVba0GgBaAy9SrLHwrvJSnB2RvY1s5m99515M/tmzRYC2ATaQB+YAF8a+8A5UFr0eAewD7zhjleg9p/kF0CsJLdAHSgDRSASfKD3MdANXXkMzIGzDG1DutirEu15si3O5AsQgGnmmehAAW58kqd8Q/laWcK+hPVAwIF8vSzhRMJyICCSb5wl/JSwGAhYl+/DpSuY2UzPWyEAM9vWOHOJCmb2pOe9QECif3Sq1P4AA9/MwBpwJ18zS1xS+wM0PAEt7z6QoZbqZCdEyecCdHwWlBi7qbtoqO+8oruoAhymtiWJd6AaAqmpbFdMgY6SJ5Bj4NKrl3QmTaAHjNUnY+BK8xvSVVOQJEZAxbsij8UcLanwF6SwImNnydyumV3nUgk/P6TRH2c1AqI8IJEDcr8yIAPykgvAATnJDZCCPADPwKmZ2TdWELCQQJ/4TwAAAABJRU5ErkJggg=="/><span>Search</span></button>
                </form>
                <div className={styles.dropdown}>
                    <button className={classnames(styles.dropbtn,styles.btn)}>< img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAo0lEQVQ4jd3SvQkCQRCG4W8EsYUDOzgbMLENUzP7sAtt4crwAjswPxC0BDF5DeTAO5b9NTj8omXZeWbZWWnqsX4BbCRVmc7DzNrBDtCRn87ZBthlYHvv3YFTAnYMPgYwB84R2AVYRL0wUAE3D3YHllHYF7oGng7sxedHpAf3kPxD+HUsdABoBgVm21KQEeitmYXA1PwPeJV0kLQq7gjUxcik8gYbvz8XQ9OU5wAAAABJRU5ErkJggg=="/><span>filter</span></button>
                    <div className={styles.dropdowncontent}>
                        <a href="#" onClick={onChild}>Aged Below 18</a>
                        <a href="#" onClick={onYouth}>Aged 18-35</a>
                        <a href="#" onClick={onAdult}>Above 35</a>
                    </div>
                </div>
            </div>
            {data.length?(
                <div className={styles.searchco}>
                    <h3>Search Results</h3>
                    <div className={styles.cardcon}>
                    {data.map((user,k) => (
                        <Card key={k} name={user.name} email={user.email} gender={user.gender} DOB={user.DOB.slice(0,10)}/>
                    ))}
                    </div>
                </div>
            ):null}
            {filter.length?(
                <div className={styles.searchco}>
                    <h3>Filter Results</h3>
                    <div className={styles.cardcon}>
                    {filter.map((user,k) => (
                        <Card key={k} name={user.name} email={user.email} gender={user.gender} DOB={user.DOB.slice(0,10)}/>
                    ))}
                    </div>
                </div>
            ):null}
             <h3>All Users</h3>
            <div className={styles.cardcon}>
            {users.map((user,k) => (
                <Card key={k} name={user.name} email={user.email} gender={user.gender} DOB={user.DOB.slice(0,10)}/>
            ))}
            </div>            
        </div>
        
    )
}

export default Users;