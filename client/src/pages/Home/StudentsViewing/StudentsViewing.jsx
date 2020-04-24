import React from "react";
import classes from './StudentsViewing.module.css';
import CardItem from '../RecomendedLections/Lections/CardItem'
import {readLectures} from '../../../api/lectures';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class StudentsViewing extends React.Component {

  state = {
    lection: []
  };

  updateLecture = () => {
    readLectures()
      .then((lection) => {
        this.setState({
          lection
        })
      })
  }

  componentDidMount() {
    this.updateLecture();
  }

  renderLectures(arr) {
    return arr.map((item, index) => {

      return (
        <CardItem item = {item }/>
      )
    })

  }

  render() {
    const { lection } = this.state;
    const lectionCard = this.renderLectures(lection);

    const settings = {
      dots: false,
      infinite: false,
      speed: 900,
      slidesToShow: 4,
      slidesToScroll: 4
    };

    return (
      <div className={classes.wrapper}>
        <p className={classes.textStudent}>Students are viewing</p>

        <Slider {...settings}>
          {lectionCard}
        </Slider>
      </div>
    )
  }

}
