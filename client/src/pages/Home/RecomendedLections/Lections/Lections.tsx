import React from "react";
import classes from './Lections.module.css';
import CardItem from "./CardItem";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect, ConnectedProps } from "react-redux";
import { getLectures } from "../../../../store/actions/getLectures";
import { RootState } from "../../../../store";

const mapStateToProps = (state: RootState) => ({
  lecturesList: state.lectures.lectures
});
const mapDispatchToProps = (dispatch: Function) => ({
  getLectures: () => dispatch(getLectures())
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


const Lections = ({lecturesList}: PropsFromRedux) => {

  const renderLectures = (arr: any) => {
    console.log(arr)
    return arr.map((item: any, index: any) => {
      return (
        <CardItem item={item} key={index}/>
      )
    })

  }
  const lectionCard = renderLectures(lecturesList);

  const settings = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className={classes.wrapper}>
    <div className={classes.cardsFlex}>
      <Slider {...settings} >
        {lectionCard}
      </Slider>
    </div>
    </div>
  )
}

export default connector(Lections);

