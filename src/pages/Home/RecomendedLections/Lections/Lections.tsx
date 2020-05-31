import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';
import { connect, ConnectedProps } from 'react-redux';

import CardItem from './CardItem';
import { getLectures } from '../../../../store/actions/getLectures';
import { RootState } from '../../../../store';
import Lecture from '../../../../models/lecture';

const classes = require('./Lections.module.css');

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

const Lections = ({
  lecturesList,
  lecturesLoading,
  categoryId = '',
}: PropsFromRedux & Props) => {
  const renderLectures = (arr: Lecture[]) => {
    if (arr.length === 0) {
      return <h3 className={classes.titleNoLections}>No lectures</h3>;
    }
    if (arr && !lecturesLoading) {
      return arr.map((item: any) => <CardItem item={item} key={item.id} />);
    }
    return null;
  };

  const [filteredLections, setFilterLections] = useState<Lecture[]>(
    lecturesList || []
  );
  useEffect(() => {
    if (categoryId) {
      setFilterLections(
        lecturesList.filter((item) => item.categoryId === categoryId)
      );
    } else {
      setFilterLections(lecturesList);
    }
  }, [categoryId]);

  const lectionCard = renderLectures(filteredLections);

  const settings1 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.cardsFlex}>
        <Slider {...settings1} className={classes.slider_1}>
          {lectionCard}
        </Slider>
        <Slider {...settings2} className={classes.slider_2}>
          {lectionCard}
        </Slider>
      </div>
    </div>
  );
};

export default connector(Lections);
