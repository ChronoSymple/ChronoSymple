import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import MyTable from './MyTable';

const fakedata = [
  {firstname: "Carl", lastname: "DE GENTILE", birthdate: "XX/XX/XXXX"},
  {firstname: "Marie-Aimée", lastname: "FOURTANE", birthdate: "XX/XX/XXXX"},
  {firstname: "Alexandre", lastname: "CAILA", birthdate: "XX/XX/XXXX"},
  {firstname: "Vicro", lastname: "ZHU", birthdate: "XX/XX/XXXX"},
  {firstname: "Robin", lastname: "MILAS", birthdate: "XX/XX/XXXX"},
  {firstname: "Laura", lastname: "PEREIRA", birthdate: "XX/XX/XXXX"}
];

const columns = [
  {label:"Nom", field:"firstname"},
  {label:"Prénom", field:"lastname"},
  {label:"Date de naissance", field:"birthdate"},
];

class Search extends Component {
  state = {
    search: ""
  };

  setSearchRef = (searchBar) => {
    this.searchbar = searchBar
  };

  setSearchValue = (event) => {
    const search = event.target.value;
    this.setState({
      search
    });
  };

  render() {
    const {
      search
    } = this.state;
    const searches = search.split(" ");
    const tab = fakedata.filter(e => searches.map(s =>
      e.firstname.toLocaleLowerCase().includes(s.toLocaleLowerCase()) ||
      e.lastname.toLocaleLowerCase().includes(s.toLocaleLowerCase())
    ).reduce((p, c) => p && c, true));
    return (
      <div>
        <Card>
          <div style={{padding: 4, width: "100%", display: "flex"}}>
            <Typography style={{flex: 1}}>
            <input placeholder="Recherche..." style={{
              border: "none", height: 32, width: "100%", outline: "none",
              paddingLeft: 6
            }} ref={this.setSearchRef}
              value={search}
              onChange={this.setSearchValue}/>
            </Typography>
            <div onClick={() => this.searchbar.focus()}
                style={{padding: "4px 4px", cursor: "pointer"}}>
              <SearchIcon/>
            </div>
          </div>
        </Card>
        <Card style={{marginTop: 16}}>
          <MyTable cols={columns} data={tab}/>
        </Card>
      </div>
    );
  }
}

export default Search;