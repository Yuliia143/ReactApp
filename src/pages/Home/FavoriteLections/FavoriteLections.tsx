import React, { useState, useEffect } from "react";
import classes from './FavoriteLections.module.css';
import { getFavorites } from "../../../api/favorite-lectures";
import List from "./List";


const FavoriteLections = () => {

  const [favLections, setFavLections] = useState([]);
  const [clickedDelete, setClickedDelete] = useState(false);
  
  const updateFav = async () => {
    const favLections = await getFavorites();
    setFavLections(favLections);  
  }

  useEffect(() => {
    updateFav();
  }, [clickedDelete]);


  const renderLectures = (arr: any) => {
    let fav = arr.favouriteLectures;
    if (fav) {
      return fav.map((item: any, index: any) => {
        return (
          <List handleClick={setClickedDelete} item={item} key={index} />
        )
      })
    }
  }

  const favoriteLection = renderLectures(favLections);

  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>Your favorite lections:</p>
      <div className={classes.cardsFlex}>
        {favoriteLection}
      </div>
    </div>
  )
}

export default FavoriteLections;
