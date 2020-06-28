import React, {PureComponent} from 'react';
import Notes from '../Components/Patient/DiseaseCard/Notes';
//import Api from '../Api';

class NotesController extends PureComponent {
  state = {
    data: []
  };
  componentDidMount() {
    //const data = Api.getNotes(localStorage.getItem('myToken'));
    //this.setState({data: data.notes});
  }

  render() {
    const {
      data
    } = this.state;
    return (<Notes data={data}/>);
  }
}

export default NotesController;