import React, { useState } from 'react';
import { Card, Rating, Header, Image, Modal } from 'semantic-ui-react';
import classes from './Lections.module.css';
import ModalFooter from './ModalFooter';

const CardItem = (props) => {
  const [open, setOpen] = useState(false);
  const [dimmer, setDimmer] = useState(false);


  // const show = () => { setOpen(true), setDimmer(true) };
  const show = () => {setDimmer(true) };
  const close = () => setOpen(false);


  const { imgUrl, title, author, defaultRating, oldPrice, newPrice, description, id } = props.item;

  return (
    <div >
      <Card className={classes.wrapperCards} onClick={show('blurring')}>
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


      <Modal dimmer={dimmer} open={open} onClose={close()}>
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
        <ModalFooter onClose={close()} id={id} />
      </Modal>
    </div>
  )
}
export default CardItem;