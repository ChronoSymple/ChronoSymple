import React, {PureComponent} from 'react';
import boy from '../../assets/Img/boy.png';
import girl from '../../assets/Img/girl.png';
import baby from '../../assets/Img/baby.png';
import woman from '../../assets/Img/woman.png';
import man from '../../assets/Img/man.png';
import oldMan from '../../assets/Img/oldMan.png';
import oldWoman from '../../assets/Img/oldWoman.png';

let iconsArray = [boy, girl, baby, woman, man, oldMan, oldWoman];

export default class PatIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      iconSelected: baby
    };
  }

  // getAge(PatAge) = date => {
  //   const current = new Date();
  //   const yearAge = current.getFullYear() - date.getFullYear();
  //   return (current.getMonth() > date.getMonth() || (current.getMonth() == date.getMonth() && current.getDate() >= date.getDate()))  ? yearAge : yearAge - 1;
  // }

  ageProcessing() {
    // this.props.patBirth
    // Date.now
    // if (this.state.starSelected === star1) {
    //   this.setState({starSelected: star2})
    //   ArrayFav = [...ArrayFav, this.props.favId]
    // } else {
    //   this.setState({starSelected: star1})
    //   this.removePeople(this.props.favId)
    // }
    console.log(this.props.patBirth);
  }

  render () {
    this.ageProcessing();
    return (
      <img src={this.state.iconSelected}/>
    )
  }
}