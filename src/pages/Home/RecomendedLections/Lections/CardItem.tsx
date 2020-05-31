import React, { useState } from "react";
import { Card, Rating, Header, Image, Modal } from "semantic-ui-react";
import ModalFooter from "./ModalFooter";

const classes = require("./Lections.module.css");

interface CardProps {
  imgUrl: string;
  title: string;
  author: string;
  defaultRating: string;
  description: string;
  id: string;
}

interface Props {
  item: CardProps;
}

const CardItem = ({
  item: { imgUrl, title, author, defaultRating, description, id },
}: Props) => {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <div>
      <Card className={classes.wrapperCards} onClick={() => show()}>
        <div className="ui link three cards">
          <div className="card" id={classes.cards}>
            <div className="image">
              <img src={imgUrl} alt="img" />
            </div>

            <div className="content" id={classes.content}>
              <div className="header" id={classes.headerTitle}>
                {title}
              </div>
              <div className="meta">
                <p>{author} </p>
              </div>
              <div className="description">
                <Rating
                  maxRating={5}
                  defaultRating={defaultRating}
                  icon="star"
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Modal dimmer="blurring" open={open} onClose={close}>
        <Modal.Header>Do you want to buy this lecture?</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={imgUrl} />
          <Modal.Description>
            <Header>{title}</Header>
            <p>{description}</p>
          </Modal.Description>
        </Modal.Content>
        <ModalFooter onClose={close} id={id} />
      </Modal>
    </div>
  );
};
export default CardItem;
