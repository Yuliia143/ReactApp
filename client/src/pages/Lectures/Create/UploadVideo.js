import React, { Component } from 'react';
import {Formik} from 'formik'
import { Progress } from 'semantic-ui-react';
import http from "../../../api/http";


const onUploadVideo = async (values) => {
  console.log("start submiting")
  console.log(values);
  const config = {
    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(percentCompleted)
    }
  }
  const formdata = new FormData();
  formdata.append('lectureVideo', values.file, values.file.name);
  const response = await http.post('/api/aws/upload-video', formdata, { ...config, headers: {
    'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`
}})
console.log(response);
}
  // formdata.append("title",values.title)
  // formdata.append("videoUrl",values.videoUrl)
  // formdata.append("description",values.description)
  // formdata.append("poster", posterFile)
  // await createLecture(values);




class Thumb extends Component {
  state = {
      loading: false,
      thumb: undefined,
      progress: 0
    }; 
 

  componentDidUpdate(prevProps){
    if (this.props.file !== prevProps.file){
      this.setState({ loading: true }, () => {
        let reader = new FileReader();
  
        reader.onprogress = (event) =>{
          if (event.lengthComputable) {
            this.setState({progress: Math.round((event.loaded/event.total)*100)})
          }
        }
  
        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };
  
        reader.readAsDataURL(this.props.file);
    })
    }
  }


  render() {
    const { file } = this.props;
    const { loading, thumb, progress } = this.state;

    if (!file) { return null; }

    if (loading) { return  <Progress percent={progress} progress /> }
    

    return (<img src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200} />);
  }
}



const UploadVideo = () => (
  <div className="container">
        <Formik 
          initialValues={{ file: null }}
          onSubmit={(values) => onUploadVideo(values)}>
          {({ values, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="file">File upload</label>
                  <input id="file" name="file" type="file" onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}  />
                   <Thumb file={values.file} />
                </div>
                <button type="submit" className="btn btn-primary" >submit</button>
              </form>
            );
          }}</Formik>
      </div> 
);

export default UploadVideo;