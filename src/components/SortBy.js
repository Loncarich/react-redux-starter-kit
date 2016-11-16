import React from 'react';

const SortBy= (props) => {

  return (
    <div className= 'col-md-4 col-sm-3 col-xs-5 sort-by'>
      <div>Sort By</div>
      <label>
          <input
            type="radio"
            name="radioInput"
            value="last"
            checked={props.namePosition === 'last'}
            onChange= {(e) => props.handleSortByChange(e.target.value)}
          />
          <span>Last Name</span>
      </label>
      <label>
          <input
            type="radio"
            name="radioInput"
            value="first"
            checked= {props.namePosition === 'first'}
            onChange= {(e) => props.handleSortByChange(e.target.value)}
          />
          <span>First Name</span>
      </label>
    </div>
    )
}

SortBy.propTypes = {
  namePosition: React.PropTypes.string,
  handleSortByChange: React.PropTypes.func
}

export default SortBy;