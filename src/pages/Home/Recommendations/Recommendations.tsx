import React from "react";
import { Button } from "semantic-ui-react";

const classes = require("./Recommendations.module.css");

const Recommendations = () => {
  return (
    <div>
      <div className={classes.backgroundThinLine} />
      <div className={classes.backgroundThickLine}>
        <p className={classes.title}>Get personalized recommendations</p>
        <p className={classes.text}>
          Answer a few questions for your top picks
        </p>
        <Button inverted color="red">
          Get started
        </Button>
      </div>
    </div>
  );
};

export default Recommendations;
