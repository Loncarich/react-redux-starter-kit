import React from 'react';
import UsersContainer from './UsersContainer';

const UsersList= (props) => {
  const usersContainersList= props.users.map((userContainer, index) => {
    return <UsersContainer
            firstLetter= {userContainer.firstLetter}
            key= {userContainer.firstLetter}
            users= {userContainer.users}
            openModal= {props.openModal}
           />
  })

  return (
    <div>{ usersContainersList }</div>
    )
}

export default UsersList;