import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Note extends PureComponent {
  render() {
    const {
      data
    } = this.props;
    return (
      <div>
        <p>Glicemie: {data.glycemie}</p>
        <p>Glucide: {data.glucide}</p>
        <p>Insuline av.repas: {data.insulineavrepas}</p>
        <p>Insuline ap.repas: {data.Insulineaprepas}</p>
        <p>Insuline a jeun: {data.insulineajeun}</p>
        <p>date: {data.date}</p>
        <p>heure: {data.heure}</p>
      </div>
    );
  }
}

Note.propTypes = {
  data: PropTypes.shape({
    glycemie: PropTypes.string,
    glucide: PropTypes.string,
    insulineavrepas: PropTypes.string,
    Insulineaprepas: PropTypes.string,
    insulineajeun: PropTypes.string,
    date: PropTypes.string,
    heure: PropTypes.string,
  })
};


class Notes extends PureComponent {
  state = {};
  componentDidMount() {
    this.fetchData();
  }
  
  async fetchData() {
    const token = localStorage.getItem('myToken');
    const req = await fetch('/api/notes', {
      headers: {
        'Authorization': token,
      }
    });
    const data = req.json();
    this.setState({data: data.notes});
  }

  render() {
    const {
      data
    } = this.state;
    return (
      <div>
        {data && data.map((e, i) => <Note key={i} data={e} ></Note>)}
      </div>
    );
  }
}

export default Notes;