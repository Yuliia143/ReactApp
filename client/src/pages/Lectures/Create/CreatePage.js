import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import { createLecture } from '../../../api/lectures-api';
import { Progress } from 'semantic-ui-react';

const onSubmitLecture = async (values) => {
  // const posterFile = posterRef.current.files[0];
  console.log("start submiting")
  console.log(values);
  // const formdata = new FormData();
  // formdata.append("title",values.title)
  // formdata.append("videoUrl",values.videoUrl)
  // formdata.append("description",values.description)
  // formdata.append("poster", posterFile)
  // const result = await createLecture(values);
  // console.log(result);
}

const onUploadVideo = (values) => {
  console.log("start submiting")
  console.log(values);
  //     const config = {
  //       onUploadProgress: function(progressEvent) {
  //         var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //         console.log(percentCompleted)
  //       }
  //     }
  //     const formdata = new FormData();
  //     formdata.append('lectureVideo', values.file, values.file.name);
  //     const response = await http.post('/api/aws/upload-video', formdata, { ...config, headers: {
  //       'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`
  //   }})
  //   console.log(response);
  // formdata.append("title",values.title)
  // formdata.append("videoUrl",values.videoUrl)
  // formdata.append("description",values.description)
  // formdata.append("poster", posterFile)
  // await createLecture(values);
}


class Thumb extends Component {
  state = {
    loading: false,
    thumb: undefined,
    progress: 0
  };

  componentDidUpdate(prevProps) {
    if (this.props.file !== prevProps.file) {
      this.setState({ loading: true }, () => {
        let reader = new FileReader();

        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            this.setState({ progress: Math.round((event.loaded / event.total) * 100) })
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

    if (loading) { return <Progress percent={progress} progress /> }


    return (<img src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200} />);
  }
}

const CreatePage = () => {
  return (
    <Formik initialValues={{ title: "", description: "", file: null }} onSubmit={values => onSubmitLecture(values)}>
      {({ values, handleSubmit, handleChange, isSubmitting, setFieldValue }) =>
        <Form onSubmit={handleSubmit}>
          <div className="inpAreaIn">
            <Input type="text" name="title" value={values.title}
              className="textInp" onChange={handleChange} placeholder="Title" />
            {/* <Input type="text" name="videoUrl" placeholder="VideoUrl"
                            className="textInp" value={values.videoUrl} onChange={handleChange} /> */}
            <Input type="text" name="description" placeholder="description"
              className="textInp" value={values.description} onChange={handleChange} />
            {/* <label htmlFor="file">File upload</label>
                        <input type="file" name="poster" hidden ref={posterRef} />  */}
            <label htmlFor="file">File upload</label>
            <input id="file" name="file" type="file" onChange={(event) => {
              setFieldValue("file", event.currentTarget.files[0]);
            }} />
            <Thumb file={values.file} />
            <Button
              type='button'
              onClick={(values) => onUploadVideo(values.file)}>
              Upload Video
                        </Button>
          </div>
          <div>
            {isSubmitting && "loading"}
            <Button type="submit" >Add Lecture</Button>
          </div>

        </Form>
      }

    </Formik>
  )
}

export default CreatePage;