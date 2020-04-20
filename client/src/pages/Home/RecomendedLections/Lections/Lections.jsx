import React from "react";
import classes from './Lections.module.css';
import LectureService from '../../../../api/lection';
import CardItem from "./CardItem";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

  
export default class Lections extends React.Component{
  lectureService = new LectureService();
    state = {
      lection: [] 
    };

  updateLecture = () => {
    this.lectureService.getLectures()
      .then((lection) => {
        this.setState({
          lection
        })
      })
    }

  componentDidMount(){
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
      slidesToShow: 3,
      slidesToScroll: 3
    };

    return (
       
      <div className={classes.cardsFlex}> 
       <Slider {...settings} >
            {lectionCard}
      </Slider>
      </div>
  
    )
  }


}



