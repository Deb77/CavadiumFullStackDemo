import React from 'react'

const Card = (props) => {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.email}</p>
            <div>
                <img alt="wait"/>
                <p>Gender: {props.gender}</p>
                <p>DOB: {props.DOB}</p>
            </div>
        </div>
    )
}

export default Card;