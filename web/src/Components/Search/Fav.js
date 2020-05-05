import React, {PureComponent} from 'react';
import star1 from '../../assets/Img/emptyStar.png'
import star2 from '../../assets/Img/filledStar.png'

let ArrayFav = []

export default class Fav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      starSelected: star1,
      isFav: false,
    };
  }

  removePeople(id) {
    var array = ArrayFav // make a separate copy of the array
    var index = array.indexOf(id)
    if (index !== -1) {
      array.splice(index, 1);
      ArrayFav = array
    }
  }

  changeStar = (e) => {
    e.stopPropagation();
    if (this.state.starSelected === star1) {
      this.setState({starSelected: star2})
      ArrayFav = [...ArrayFav, this.props.favId]
    } else {
      this.setState({starSelected: star1})
      this.removePeople(this.props.favId)
    }
    console.log(ArrayFav);
  }

  render () {
    return (
      <img src={this.state.starSelected} width="50" height="50" onClick={this.changeStar}/>
    )
  }
}