import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';

class TodoSearch extends React.Component {
  render() {

    var {dispatch, searchText} = this.props;

    return(
      <div>
        <input
          className="main-input"
          placeholder="Search todos"
          type="search"
          autoFocus="true"
          ref="searchText"
          value={searchText}
          onChange={() => {
            var searchText = this.refs.searchText.value.toLowerCase();
            dispatch(actions.setSearchText(searchText));
          }}
        />
      </div>
    )
  }
}

TodoSearch.propTypes = {
  searchText: PropTypes.string,
  dispatch: PropTypes.func
};

export default connect(
  (state) => {
    return {
      searchText: state.searchText
    }
  }
)(TodoSearch);
