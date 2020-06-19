import React from "react";
import TrustedCompanies from "./TrustedCompanies/TrustedCompanies";
import Offer from "./Offer/Offer";
const Avatar1 =  require("../../../assets/images/avatar_1.jpg")
const Avatar2 =  require("../../../assets/images/avatar_2.jpg")
const Avatar3 =  require("../../../assets/images/avatar_3.jpg")

const classes = require("./Reviews.module.css");

const Reviews = () => {
  return (
    <div className={classes.wrapperBG}>
      <div className={classes.wrapper}>
        <p className={classes.title}>What our students have to say</p>
        <div className={classes.flexCategories}>
          <div className={classes.container}>
            <div className={classes.imgAndName}>
              <img
                src={Avatar1}
                alt="Author"
                className={classes.image}
              />
              <div className={classes.author}>Borivoje</div>
            </div>
            <p className={classes.text}>
              StudyHard is a life saver. I don&apos;t have the time or money for
              a college education. My goal is to become a freelance web
              developer, and thanks to Udemy, I&apos;m really close.
            </p>
          </div>

          <div className={classes.container}>
            <div className={classes.imgAndName}>
              <img
                src={Avatar2}
                alt="Author"
                className={classes.image}
              />
              <div className={classes.author}>Dipesh</div>
            </div>
            <p className={classes.text}>
              I believe in lifelong learning and StudyHard is a great place to
              learn from experts. I&apos;ve learned a lot and recommend it to
              all my friends.
            </p>
          </div>

          <div className={classes.container}>
            <div className={classes.imgAndName}>
              <img
                src={Avatar3}
                alt="Author"
                className={classes.image}
              />
              <div className={classes.author}>Kathy</div>
            </div>
            <p className={classes.text}>
              My children and I LOVE StudyHard! The courses are fantastic and
              the instructors are so fun and knowledgeable. I only wish we found
              it sooner.
            </p>
          </div>
        </div>
        <TrustedCompanies />
        <Offer />
      </div>
    </div>
  );
};

export default Reviews;
