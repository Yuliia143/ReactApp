import React from "react";
import classes from './TrustedCompanies.module.css';
import { Icon, Button } from 'semantic-ui-react';

const TrustedCompanies = () => {

  return (
    <div>
      <p className={classes.title}>Trusted by companies of all sizes</p>
      <div className={classes.flexCategories}>
        <div className={classes.logo}>
        <img src= 'https://img-a.udemycdn.com/partner-logos/booking-logo.svg' className={classes.image}></img>
        </div>

        <div className={classes.logo}>
        <img src= 'https://img-a.udemycdn.com/partner-logos/mercedes-logo.svg' className={classes.image}></img>
        </div>

        <div className={classes.logo}>
        <img src= 'https://img-a.udemycdn.com/partner-logos/pinterest-logo.svg' className={classes.image}></img>
        </div>

        <div className={classes.logo}>
        <img src= 'https://img-a.udemycdn.com/partner-logos/adidas-logo.svg' className={classes.image}></img>
        </div>

        <div className={classes.logo}>
        <img src= 'https://img-a.udemycdn.com/partner-logos/eventbrite-logo.svg' className={classes.image}></img>
        </div>

      </div>
    </div>
  )
}

export default TrustedCompanies;