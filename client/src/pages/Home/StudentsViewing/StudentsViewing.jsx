import React, { useState, useEffect } from "react";
import classes from './StudentsViewing.module.css';
import CardItem from '../RecomendedLections/Lections/CardItem'
import { readLectures } from '../../../api/lectures';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StudentsViewing = (props) => {
  const [lection, setLection] = useState([]);

  const updateLecture = () => {

    readLectures()
      .then((lection) => {
        setLection(lection)
      })
  }

  useEffect(() => {
    updateLecture()
  }, [])


  const renderLectures = (arr) => {
    console.log(arr)
    return arr.map((item, index) => {

      return (
        <CardItem item={item} />
      )
    })

  }

  // const { lection } = lection;
  const lectionCard = renderLectures(lection);

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

export default StudentsViewing;
