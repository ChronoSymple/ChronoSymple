import React, { PureComponent } from 'react';
import img1 from '../../assets/Img/alert1.png'
import img2 from '../../assets/Img/alert2.png'
import img3 from '../../assets/Img/alert3.png'

export default class Alert extends PureComponent {
  constructor(props) {
    super(props);
    this.i = 0;  // I declare the variable here
    this.state = {
      selectedImg : img1
    };
  }
  changeImg = () => {
    this.i++;
    if (this.i === 3)
      this.i = 0;
    console.log(this.i);
    if (this.i === 0) {

      this.setState({
        selectedImg: img2
      });
    }
    else if (this.i === 1) {
      this.setState({
        selectedImg: img3
      });
    }
    else if (this.i === 2) {
      this.setState({
        selectedImg: img1
      });
    }
  }
  render() {
    return (
      // <img src={this.imgPath + "1.png"}></img>
      <img src={this.state.selectedImg} alt="alertLevel" onClick={this.changeImg}></img>
    )
  }
}