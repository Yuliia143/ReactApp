import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import http from '../../../api/http';

const classes = require('./FavoriteLections.module.css');

interface CardProps {
    imgUrl: string,
    title: string,
    author: string,
    description: string,
    '_id': string,
}

interface Props {
    item: CardProps,
    handleClick: Function
}

const List = (props: Props) => {
    const {item} = props;
    const { author, description, _id, imgUrl, title } = item;
    const {handleClick} = props;

    const deleteFavLection = async (id: any) => {
        handleClick(true);
        await http.remove(`/api/lectures/${id}/fav_lectures`);
        handleClick(false);
    }

    return (
        <div className="ui middle aligned divided list" id={classes.wrapList}>
            <div className="item">
                <div className="right floated content" id={classes.forButtons}>
                    <Link to={`/lecture/${_id}`}>
                        <Button className="ui button" content="Watch" color='green'/>
                    </Link>
                    <Button className="ui button" content="Delete" color='red' onClick={() => deleteFavLection(_id)}/>
                </div>
                <img className="ui avatar image" id={classes.imgLection} src={imgUrl} alt='Avatar'/>
                <div className="content">
                    <div className={classes.headerTitle}>{title}</div>
                    <div className={classes.author}>{author}</div>
                    <div>{description}</div>
                </div>
            </div>
        </div>
    )
}
export default List;
