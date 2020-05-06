import React, { useEffect, useState } from 'react';
import {Progress} from 'semantic-ui-react';

const VideoLoaderProgress = (props) => {
  
    console.log(props.percentCompleted);
    console.log(props.clickUploadVideo);
  
    if (!props.clickUploadVideo) {
      return null;
    } else {
      return <Progress percent={props.percentCompleted} progress />
    } 
  }
  
export default VideoLoaderProgress;
  