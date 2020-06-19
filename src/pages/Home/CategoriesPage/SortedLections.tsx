import React, { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { RootState } from "../../../store";
import { getLectures } from "../../../store/actions/getLectures";

import Lecture from "../../../models/lecture";
import CardItem from "../RecomendedLections/Lections/CardItem";

const classes = require("./CategoriesPage.module.css");

const mapStateToProps = (state: RootState) => ({
  lecturesList: state.lectures.lectures,
  lecturesLoading: state.lectures.loading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getLectures: () => dispatch(getLectures()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props {
  categoryId?: string;
}

const CategoriesPage = ({
  lecturesList,
  lecturesLoading,
  categoryId = "",
}: PropsFromRedux & Props) => {
  const renderLectures = (arr: Lecture[]) => {
    if (arr.length === 0) {
      return <h3 className={classes.noLection}>No lectures</h3>;
    }
    if (arr && !lecturesLoading) {
      return arr.map((item: any) => <CardItem item={item} key={item.id} />);
    }
    return null;
  };

  const [title, setTitle] = useState("");
  const [filteredLections, setFilterLections] = useState<Lecture[]>(
    lecturesList || []
  );

  const renderTitle = (arr: any) => {
    if (arr) {
      return arr.map((category: any) => {
        return {
          categoryTitle: category.categoryTitle,
        };
      });
    }
  };
  const selectedTitle = renderTitle(filteredLections);

  useEffect(() => {
    if (categoryId) {
      setFilterLections(
        lecturesList.filter((item) => item.categoryId === categoryId)
      );
      setTitle(selectedTitle[0].categoryTitle);
    } else {
      setFilterLections(lecturesList);
    }
  }, [categoryId, title]);

  const lectionCard = renderLectures(filteredLections);

  const settings1 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h1 className={classes.title}>{title}</h1>
      <div>
        <Slider {...settings1}>{lectionCard}</Slider>
      </div>
    </div>
  );
};
export default connector(CategoriesPage);
