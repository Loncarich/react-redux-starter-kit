import React from 'react';
import UsersContainer from './UsersContainer';

const UsersList= (props) => {
  const usersContainersList= props.users.map((userContainer) => {
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

UsersList.propTypes = {
  users: React.PropTypes.array,
  openModal: React.PropTypes.func,
}

export default UsersList;