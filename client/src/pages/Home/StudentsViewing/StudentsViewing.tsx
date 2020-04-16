import React, { Component } from "react";
import classes from './StudentsViewing.module.css';
import { Card, Rating} from 'semantic-ui-react';
import LectureService from '../../../../src/services/service-lecture';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class StudentsViewing extends React.Component{
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

renderLectures(arr: any) {
    return arr.map((item:any) => {
    const {imgUrl, title, author, defaultRating, oldPrice, newPrice} = item;

    return (
       <Card className={classes.wrapperCards} onClick={()=> alert('1111')}> 
        <div className="ui link three cards" > 
      <div className="card" id={classes.cards}>
              <div className="image">
                <img src={imgUrl}></img>
              </div>
              <div className="content">
                <div className="header" id={classes.headerTitle}>{title}</div>
                <div className="meta">
                  <a>{author} </a>
                </div>
                <div className="description">
                <Rating maxRating={5} defaultRating={defaultRating} icon='star' size='small' />
                </div>
              </div>
              <div className="extra content">
                <span className="right floated">
                <span className={classes.oldPrice}> {oldPrice} </span>
                  <span className={classes.newPrice}> {newPrice}</span>
                </span>
              </div>
            </div>
             </div> 
            </Card> 
    )
  })

}


render() {
  console.log(this.state.lection)
  const { lection } = this.state;
  const lectionCard = this.renderLectures(lection);
  
  const settings = {
        dots: false,
        infinite: true,
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
