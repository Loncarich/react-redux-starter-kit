import React from 'react';
import $ from 'jquery';
import UsersList from './UsersList';
import SearchBar from './SearchBar';
import SortBy from './SortBy';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import sortAndGroupByFirstLetter from '../methods.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      usersFull: [],
      usersToRender: [],
      namePosition: 'last',
      showModal: false,
      modalUser: {}
    }
    this.handleSortByChange= this.handleSortByChange.bind(this);
    this.handleSearchChange= this.handleSearchChange.bind(this);
    this.handleModalOpen= this.handleModalOpen.bind(this);
    this.handleModalClose= this.handleModalClose.bind(this);
  }

  componentDidMount(){
    var self= this;
    $.ajax({
      url: 'https://randomuser.me/api/?results=60',
      dataType: 'json',
      success: function(data) {
        const finalResults= sortAndGroupByFirstLetter(data.results, 'last');
        self.setState({usersFull: finalResults, usersToRender: finalResults})
      }
    });
  }

  flattenAndSortUsers(arr, position){
    var tempUsers= [];
    arr.forEach((letter) => {
      letter.users.forEach((user) =>{
        tempUsers.push(user);
      })
    });
    return sortAndGroupByFirstLetter(tempUsers, position);
  }

  handleSortByChange(option){
    var usersCopy= this.state.usersToRender.slice();
    const newUsers= this.flattenAndSortUsers(usersCopy, option);
    this.setState({usersToRender: newUsers, namePosition: option});
  }

  handleSearchChange(searchText, position){
    var searchTextLower= searchText.trim().toLowerCase();
    var usersCopy= this.state.usersFull.slice();
    var sortedUsers= this.flattenAndSortUsers(usersCopy, this.state.namePosition);
    var usersTemp= sortedUsers.filter((letter) => {
      var tempLetter= letter.users.filter((user) => {
        var name= user.name[position];
        return name.toLowerCase().match(searchTextLower);
      });
      letter.users= tempLetter;
      return tempLetter.length > 0;
    });
    this.setState({usersToRender: usersTemp});
  }

  handleModalOpen(username){
    var modalUser= {};
    this.state.usersToRender.forEach((letter) =>{
      letter.users.forEach((user) => {
        if (user.login.username === username){
          modalUser= user;
        }
      })
    })
    this.setState({showModal: true, modalUser: modalUser})
  }

  handleModalClose(){
    this.setState({showModal: false, modalUser: {}})
  }

  render(){
    return (
      <div className= 'container'>
        <div className= 'row search-box'>
          <SearchBar handleSearchChange= {this.handleSearchChange} namePosition= {this.state.namePosition} />
          <SortBy handleSortByChange= {this.handleSortByChange} namePosition= {this.state.namePosition}/>
        </div>
        <UsersList users= {this.state.usersToRender} openModal= {this.handleModalOpen}/>
        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.showModal === true ?
              this.state.modalUser.name.first+' '+this.state.modalUser.name.last : ''}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.showModal === true ?
              <div className= 'modal-body'>
                <img src= {this.state.modalUser.picture.large}></img>
                <div>Username: {this.state.modalUser.login.username}</div>
                <div>DOB: {this.state.modalUser.dob}</div>
                <div>City: {this.state.modalUser.location.city}</div>
                <div>Email: {this.state.modalUser.email}</div>
              </div>
              : <div></div>}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      )
  }
}

export default App;