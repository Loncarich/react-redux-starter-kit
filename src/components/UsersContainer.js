import React from 'react';
import UsersCard from './UsersCard';

const UsersContainer= (props) =>{
  const usersCardList = props.users.map((user)=> {
    return <UsersCard
            picture= {user.picture.large}
            name= {user.name}
            dob= {user.dob}
            city= {user.location.city}
            username= {user.login.username}
            key= {user.login.username}
            openModal= {props.openModal}
           />
  });

  return (
    <div className= 'user-container'>
      <div className="row first-letter-row">
        <div className="col-sm-1 first-letter">{props.firstLetter.toUpperCase()}</div>
      </div>
      <div className="row user-card-row">
        { usersCardList }
      </div>
    </div>
    )
}

UsersContainer.propTypes = {
  users: React.PropTypes.array,
  openModal: React.PropTypes.func,
  firstLetter: React.PropTypes.string
}

export default UsersContainer;