import React, { Component } from 'react';
import $ from 'jquery';
import UsersList from './UsersList';
import SearchBar from './SearchBar';
import SortBy from './SortBy';
import ModalLocal from './ModalLocal';
import methods from '../methods.js';

class App extends Component {
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
        const finalResults= methods.sortAndGroupByFirstLetter(data.results, 'last', true);
        self.setState({usersFull: finalResults, usersToRender: finalResults})
      }
    });
  }

  handleSortByChange(option){
    var usersCopy= this.state.usersToRender.slice();
    const newUsers= methods.sortAndGroupByFirstLetter(usersCopy, option, false);
    this.setState({usersToRender: newUsers, namePosition: option});
  }

  handleSearchChange(searchText, position){
    var usersCopy= this.state.usersFull.slice(),
        usersFiltered= methods.filterSearch(usersCopy, position, searchText.trim().toLowerCase());
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
        <ModalLocal
          showModal= {this.state.showModal}
          handleModalClose= {this.handleModalClose}
          modalUser= {this.state.modalUser}
        />
      </div>
      )
  }
}

export default App;