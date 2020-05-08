import React from 'react';
import RowTable from './RowTable';
import {Table} from 'semantic-ui-react';

const BodyTable = ({lecturesList}) =>{ 
    return(
        <Table.Body>
            {lecturesList.map((lecture,i)=>{
                return (       
                        <RowTable 
                            key ={i} 
                            id={lecturesList[i].id} 
                            title={lecturesList[i].title} 
                            videoUrl={lecturesList[i].videoUrl} />
                       );
                })
            }
        </Table.Body>
    );
}

export default BodyTable