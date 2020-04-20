import React from "react";
import classes from './Offer.module.css';
import { Icon, Button } from 'semantic-ui-react';

const Offer = () => {

  return (
    <div>
      <div className={classes.flexCategories}>
        <div className={classes.container}>
          <div className={classes.textCont}>
          <div className={classes.title}>
        <a href="#">Become an instructor</a>
        </div>
        <div className={classes.text}>
        Top instructors from around the world teach millions of students on 
        Udemy. We provide the tools and skills to teach what you love.
        </div>
        <Button className="ui red inverted button" id={classes.button}>Start teaching today</Button>
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.textCont}>
          <div className={classes.title}>
        <a href="#">Udemy for Business</a>
        </div>
        <div className={classes.text}> 
        Get unlimited access to 4,000+ of Udemy’s top courses for your team.
        </div>
        <Button className="ui red inverted button" id={classes.button}>Get Udemy for Business</Button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Offer;