import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core';

const styles = {
  searchBar: {
    border: 'none',
    height: 32,
    width: '100%',
    outline: 'none',
    paddingLeft: 6
  },
  searchIcon: {
    padding: 4,
    cursor: 'pointer',
  },
  search: {
    padding: 4,
    width: '100%',
    display: 'flex'
  },
  searchText: {
    flex: 1
  },
};

class Searchbar extends PureComponent {

  setSearchValue = event => this.props.setSearchValue(event.target.value);
  setSearchRef = ref => this.searchbarRef = ref;
  focusSearch = () => this.searchbarRef && this.searchbarRef.focus();

  render() {
    const {
      search,
      classes,
    } = this.props;
    return (
      <Card>
        <div className={classes.search}>
          <Typography className={classes.searchText}>
            <input
              placeholder="Recherche..."
              className={classes.searchBar}
              value={search}
              onChange={this.setSearchValue}
              ref={this.setSearchRef}
            />
          </Typography>
          <div
            onClick={this.focusSearch}
            className={classes.searchIcon}
          >
            <SearchIcon/>
          </div>
        </div>
      </Card>
    );
  }
}

Searchbar.propTypes = {
  search: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    searchBar: PropTypes.string.isRequired,
    searchIcon: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    searchText: PropTypes.string.isRequired,
  }).isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default withStyles(styles)(Searchbar);