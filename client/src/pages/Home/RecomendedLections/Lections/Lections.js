import React from "react";
import classes from './Lections.module.css';
import { Card, Rating, Button, Header, Image, Modal } from 'semantic-ui-react';
import LectureService from '../../../../services/service-lecture'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

  
export default class Lections extends React.Component{
  lectureService = new LectureService();
    state = {
      lection: [],
      open: false 
    };


    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });
  

 updateLecture = () => {
  this.lectureService.getLectures()
    .then((lection) => {
      this.setState({
        lection
      })
    })
  }

  componentDidMount(){
    this.updateLecture();
  }



  renderLectures(arr) {
    return arr.map((item) => {
    const {imgUrl, title, author, defaultRating, oldPrice, newPrice, description} = item;

    const { open, dimmer } = this.state;
      return (
        <div>
        
        <Card className={classes.wrapperCards} onClick={this.show('blurring')}>
          <div className="ui link three cards" >
        <div className="card" id={classes.cards}>
              <div className="image">
                <img src={imgUrl}></img>
              </div>
              <div className="content">
                <div className="header" id={classes.headerTitle}>{title}</div>
                <div className="meta">
                  <a>{author} </a>
                </div>
                <div className="description">
                <Rating maxRating={5} defaultRating={defaultRating} icon='star' size='small' />
                </div>
              </div>
              <div className="extra content">
                <span className="right floated">
                <span className={classes.oldPrice}> {oldPrice} </span>
                  <span className={classes.newPrice}> {newPrice}</span>
                </span>
              </div>
            </div>
            </div>
        </Card>


        <Modal dimmer={dimmer} open={open} onClose={this.close}>
        <Modal.Header>Do you want to buy this lecture?</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size='medium'
            src={imgUrl}
          />
          <Modal.Description>
            <Header>{title}</Header>
            <p>
              {description}
            </p>
            <p>.....</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.close}>
            Cancel
          </Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content="Buy"
            onClick={this.close}
          />
        </Modal.Actions>
      </Modal>
        </div>
      )
    })

  }


  render() {
    console.log(this.state.lection)
    const { lection } = this.state;
    const lectionCard = this.renderLectures(lection);

    const settings = {
      dots: false,
      infinite: true,
      speed: 900,
      slidesToShow: 3,
      slidesToScroll: 3
    };

    return (
   
      <div className={classes.cardsFlex}> 
       <Slider {...settings}>
            {lectionCard}
      </Slider>
      </div>
  
    )
  }


}



