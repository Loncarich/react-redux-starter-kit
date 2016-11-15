import React from 'react';
import $ from 'jquery';
import UsersList from './UsersList';
import SearchBar from './SearchBar';
import SortBy from './SortBy';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import methods from '../methods.js';

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
        const finalResults= methods.sortAndGroupByFirstLetter(data.results, 'last');
        self.setState({usersFull: finalResults, usersToRender: finalResults})
      }
    });
  }

  handleSortByChange(option){
    var usersCopy= this.state.usersToRender.slice();
    const newUsers= methods.flattenAndSortUsers(usersCopy, option);
    this.setState({usersToRender: newUsers, namePosition: option});
  }

  handleSearchChange(searchText, position){
    var usersCopy= this.state.usersFull.slice(),
        sortedUsers= methods.flattenAndSortUsers(usersCopy, this.state.namePosition),
        usersFiltered= methods.searchFilter(sortedUsers, position, searchText.trim().toLowerCase());
    this.setState({usersToRender: usersFiltered});
  }

  handleModalOpen(username){
    const modalUser= methods.findModalUser(this.state.usersToRender, username);
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