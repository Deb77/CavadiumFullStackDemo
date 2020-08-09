import React from 'react';
import styles from './Card.module.css';

const Card = (props) => {
    return (
        <div className={styles.container}>
            <p className={styles.name}>{props.name}</p>
            <p className={styles.email}>{props.email}</p>
            <hr className={styles.rule}/>
            <div className={styles.image}>
                <img className={styles.avatar} src={props.image} alt="wait"/>
                <div>
                    <p>Gender: {props.gender}</p>
                    <p>DOB: {props.DOB}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;