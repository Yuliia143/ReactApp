import React from 'react';
import { Card, Rating, Header, Image, Modal } from 'semantic-ui-react';
import classes from './Lections.module.css';
import ModalFooter from './ModalFooter';

export default class CardItem extends React.Component{
    state ={
        open: false
    }
    
    show = (dimmer) => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });

    render(){
    const {imgUrl, title, author, defaultRating, oldPrice, newPrice, description, id} = this.props.item;
    const { open, dimmer } = this.state;

        return <div >
        
        <Card className={classes.wrapperCards} onClick={this.show('blurring')}>
          <div className="ui link three cards">
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
          </Modal.Description>
        </Modal.Content>
        <ModalFooter onClose={this.close} id={id}/>
      </Modal>
        </div>
    }
}