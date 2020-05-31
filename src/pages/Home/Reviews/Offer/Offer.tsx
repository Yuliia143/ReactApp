import React from "react";
import { Button } from "semantic-ui-react";

const classes = require("./Offer.module.css");

const Offer = () => {
  return (
    <div className={classes.flexCategories}>
      <div className={classes.container}>
        <div className={classes.textCont}>
          <div className={classes.title}>
            <p>Become an instructor</p>
          </div>
          <div className={classes.text}>
            Top instructors from around the world teach millions of students on
            StudyHard. We provide the tools and skills to teach what you love.
          </div>
          <Button className="ui red inverted button" id={classes.button}>
            Start teaching today
          </Button>
        </div>
      </div>

      <div className={classes.container}>
        <div className={classes.textCont}>
          <div className={classes.title}>
            <p>StudyHard for Business</p>
          </div>
          <div className={classes.text}>
            Get unlimited access to 4,000+ of StudyHard’s top courses for your
            team.
          </div>
          <Button className="ui red inverted button" id={classes.button}>
            Get StudyHard for Business
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
