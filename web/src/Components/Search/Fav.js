import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import star1 from '../../assets/Img/emptyStar.png'
import star2 from '../../assets/Img/filledStar.png'

export default class Fav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFav: JSON.parse(localStorage.getItem('favorites') || '[]').includes(props.favId),
    };
  }

  changeStar = e => {
    e.stopPropagation();
    let fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!this.state.isFav) {
      fav = [...fav, this.props.favId];
      this.setState({isFav: true});
    } else {
      fav = fav.filter(e => e !== this.props.favId);
      this.setState({isFav: false});
    }
    localStorage.setItem('favorites', JSON.stringify(fav));
    console.log(fav);
  }

  render() {
    return (
      <img src={this.state.isFav ? star2 : star1} alt='favorite' width="50" height="50" onClick={this.changeStar}/>
    );
  }
}

Fav.propTypes = {
  favId: PropTypes.number.isRequired
};