import React from 'react';

const UsersCard= (props) => {

  return (
    <div className= 'col-md-3 user-card' onClick= {() => props.openModal(props.username)}>
      <img src= {props.picture}></img>
      <div>{props.name.first + ' ' + props.name.last}</div>
      <div>DOB: {props.dob}</div>
      <div>City: {props.city}</div>
    </div>
    )
}

export default UsersCard;