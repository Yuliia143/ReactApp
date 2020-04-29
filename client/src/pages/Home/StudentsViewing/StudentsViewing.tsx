import React, { useState, useEffect } from "react";
import classes from './StudentsViewing.module.css';
import CardItem from '../RecomendedLections/Lections/CardItem'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {connect, ConnectedProps} from "react-redux";
import {getLectures} from "../../../store/actions/getLectures";
import {RootState} from "../../../store";


const mapStateToProps = (state: RootState) => ({
  lecturesList: state.lectures.lectures
});

const mapDispatchToProps = (dispatch: Function) => ({
  getLectures: () => dispatch(getLectures())
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const StudentsViewing = ({lecturesList, getLectures}: PropsFromRedux) => {
  // const [lection, setLection] = useState([]);

  // useEffect(() => {
  //   getLectures()
  // }, [])


  const renderLectures = (arr:any) => {
    console.log(arr)
    return arr.map((item:any, index:any) => {

      return (
        <CardItem item={item} />
      )
    })

  }

  const lectionCard = renderLectures(lecturesList);

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

export default connector(StudentsViewing);
