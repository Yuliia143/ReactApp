import React from 'react'

class MiniFormik extends React.Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    errors: {}
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;
    event.persist();
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  }

  handleBlur = (event) => {
    const target = event.target;
    const name = target.name;
    event.persist();
    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [name]: true
      }
    }));
  }

  handleSubmit = e => {
    e.preventDeafault();
    this.props.onSubmit(this.state.values)
  }



  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleInputChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit
    })
  }
}


class UploadVideo extends React.Component {

  render() {
    return (
      <MiniFormik
        initialValues={{
          isGoing: true,
          numberOfGuests: 2,
        }}
        onSubmit={values =>{
          console.log("I here")
          alert(JSON.stringify(values, null, 2))
        } 
          }
      >
        {(props) => {
          const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit} >
              <label>
                Триває:
          <input
                  name="isGoing"
                  type="checkbox"
                  checked={values.isGoing}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <br />
              <label>
                Кількість гостей:
          <input
                  name="numberOfGuests"
                  type="number"
                  value={values.numberOfGuests}
                  onChange={handleChange} />
              </label>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </form>
          )
        }}

      </MiniFormik>
    );
  }
}

export default UploadVideo;