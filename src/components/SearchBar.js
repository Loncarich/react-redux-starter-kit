import React from 'react';

class SearchBar extends React.Component {
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

  capitalizeNamePosition(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render(){
    return (
      <div className= 'col-md-4 col-sm-3 col-xs-5 search-bar'>
        <input
          id="form-control"
          type="text"
          placeholder={'Search '+ this.capitalizeNamePosition(this.props.namePosition) + ' Name'}
          value={this.state.queryText}
          onChange={this.handleSearchChangeLocal}
          />
      </div>
      )
  }
}

export default SearchBar;