import React, { useState, useEffect } from 'react';
import { getFavorites } from '../../../api/favorite-lectures';
import List from './List';

const classes = require('./FavoriteLections.module.css');

const FavoriteLections = () => {
  const [favLections, setFavLections] = useState([]);

  const [clickedDelete, setClickedDelete] = useState(false);

  const updateFav = async () => {
    const lections = await getFavorites();
    setFavLections(lections);
  };

  useEffect(() => {
    updateFav();
  }, [clickedDelete]);

  const renderLectures = (arr: any) => {
    const fav = arr.favouriteLectures;
    if (fav) {
      return fav.map((item: any) => (
        <List handleClick={setClickedDelete} item={item} key={item._id} />
      ));
    }
    return null;
  };

  const favoriteLection = renderLectures(favLections);

  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>Your favorite lections:</p>
      <div className={classes.cardsFlex}>{favoriteLection}</div>
    </div>
  );
};

export default FavoriteLections;
