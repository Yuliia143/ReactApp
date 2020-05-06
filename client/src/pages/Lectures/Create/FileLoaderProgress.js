import React, { useEffect, useState } from 'react';
import { Progress } from 'semantic-ui-react';
import http from '../../../api/http';


const FileLoaderProgress = (props) => {
    const [loading, setLoading] = useState(false);
    const [localReader, setLocalReader] = useState(false);
    const [percentCompleted, setPercentCompleted] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');

    const onUploadVideo = async (file) => {
        const config = {
          onUploadProgress: function (progressEvent) {
            setPercentCompleted(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          }
        }
        const formdata = new FormData();
        formdata.append('lectureVideo', file, file.name);
        const response = await http.post('/api/aws/upload-video', formdata, {
          ...config, headers: {
            'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`
    
          }
        })
        setVideoUrl(response.data.videoUrl);
        setLocalReader(false);
        console.log(response);
      }

  
    useEffect(() => {
      setLoading(true);
  
      let reader = new FileReader();
      
      if (props.file){
        reader.readAsDataURL(props.file);
      }
      
      reader.onloadend = () => {
        setLocalReader(true);
        setLoading(false);
        onUploadVideo(props.file);
      };
    }, [props.file])
  
    if (!props.file) {
      return null;
    } else if (loading) {
      return <h5>Upload File...</h5>
    } else if (localReader) {
        return (
        <div>
            <h5>Sending...</h5>
            <Progress percent={percentCompleted} progress />
        </div>
        ) 
    } else if (videoUrl.length > 0) {
        return (<img src=''
            alt={props.file.name}
            height={200}
            width={200} />);
        }
    }
  
export default FileLoaderProgress;
  