import React from 'react';
import { Button } from 'semantic-ui-react';
import classes from './FavoriteLections.module.css';
import { Link } from 'react-router-dom';
import http from '../../../api/http';


const List = (props) => {

    const {handleClick} = props
    const deleteFavLection = async (id) => {
        handleClick(true);
        await http.remove(`/api/lectures/${id}/fav_lectures`)
        handleClick(false);
    }

    const { author, description, _id, imgUrl, title } = props.item;
    return (
        <div className="ui middle aligned divided list" id={classes.wrapList}>
            <div className="item">
                <div className="right floated content" id={classes.forButtons}>
                    <Link to={`/lecture/${_id}`}>
                        <Button className="ui button" content="Watch" color='green'></Button>
                    </Link>
                    <Button className="ui button" content="Delete" color='red' onClick={() => deleteFavLection(_id)} ></Button>
                </div>
                <img className="ui avatar image" id={classes.imgLection} src={imgUrl} />
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
