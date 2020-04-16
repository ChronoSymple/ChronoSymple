import React, { PureComponent } from 'react';
import img1 from '../../assets/Img/alert1.png';
import img2 from '../../assets/Img/alert2.png';
import img3 from '../../assets/Img/alert3.png';

const images = [img1, img2, img3];

export default class Alert extends PureComponent {
  state = {
    i: 0
  };
  changeImg = e => {
    e.stopPropagation();
    this.setState(({i}) => ({i: (i + 1) % images.length}));
  }
  render = () => <img src={images[this.state.i]} alt="alertLevel" onClick={this.changeImg}></img>;
}