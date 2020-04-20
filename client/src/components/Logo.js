import React from 'react';
import {Image} from "semantic-ui-react";

export default function (props) {
    return(
        <Image
            src={props.image}
            size="tiny"
            alt="Logo"
            style={{width: '100px'}}
        />
    )
}
