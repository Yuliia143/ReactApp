import React, { useState, useEffect } from "react";
import classes from './Lections.module.css';
import CardItem from "./CardItem";
import { readLectures } from '../../../../api/lectures';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {connect, ConnectedProps} from "react-redux";
import {getLectures} from "../../../../store/actions/getLectures";
import {RootState} from "../../../../store";

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth,
  lecturesList: state.lectures.lectures
});

const mapDispatchToProps = (dispatch: Function) => ({
  getLectures: () => dispatch(getLectures())
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


const Lections = ({lecturesList, getLectures}: PropsFromRedux) => {
  const [lection, setLection] = useState([]);
  
  // const updateLecture = () => {
  //   const newArray = getLectures();
  //   setLection({ lection: newArray});
  // }
  
  // const updateLecture = () => setLection(getLectures());

  useEffect(() => {
    getLectures();
    // updateLecture()
  }, [])

  const renderLectures = (arr:any) => {
    console.log(arr)
    return arr.map((item:any, index:any) => {
      return (
        <CardItem item={item} />
      )
    })

  }
  const lectionCard = renderLectures(lection);

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

export default connector(Lections);

