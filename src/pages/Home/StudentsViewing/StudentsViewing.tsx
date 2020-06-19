import React from "react";
import { connect, ConnectedProps } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardItem from "../RecomendedLections/Lections/CardItem";

import { RootState } from "../../../store";
import { getLectures } from "../../../store/actions/getLectures";
import Lecture from "../../../models/lecture";

const classes = require("./StudentsViewing.module.css");

const mapStateToProps = (state: RootState) => ({
  lecturesList: state.lectures.lectures,
  lecturesLoading: state.lectures.loading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getLectures: () => dispatch(getLectures()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const StudentsViewing = ({ lecturesList, lecturesLoading }: PropsFromRedux) => {
  const renderLectures = (arr: Lecture[]) => {
    if (!lecturesLoading && arr) {
      return arr.map((item: any) => <CardItem item={item} key={item.id} />);
    }
    return null;
  };
  const lectionCard = renderLectures(lecturesList);

  const settings1 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const settings3 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div className={classes.wrapper}>
      <p className={classes.textStudent}>Students are viewing</p>

      <Slider {...settings1} className={classes.slider_1}>
        {lectionCard}
      </Slider>

      <Slider {...settings2} className={classes.slider_2}>
        {lectionCard}
      </Slider>

      <Slider {...settings3} className={classes.slider_3}>
        {lectionCard}
      </Slider>
    </div>
  );
};

export default connector(StudentsViewing);
