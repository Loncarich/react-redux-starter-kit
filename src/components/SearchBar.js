import React, { Component } from 'react';
import methods from '../methods.js';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state= {
      searchText: ''
    }
    this.handleSearchChangeLocal= this.handleSearchChangeLocal.bind(this);
  }

  handleSearchChangeLocal(e){
    this.props.handleSearchChange(e.target.value, this.props.namePosition);
    this.setState({searchText: e.target.value});
  }

  render(){
    return (
      <div className= 'col-md-4 col-sm-3 col-xs-5 search-bar'>
        <input
          type="text"
          placeholder="Search Name"
          value={this.state.searchText}
          onChange={this.handleSearchChangeLocal}
          />
      </div>
      )
  }
}

SearchBar.propTypes = {
  namePosition: React.PropTypes.string,
  handleSearchChange: React.PropTypes.func
}

export default SearchBar;