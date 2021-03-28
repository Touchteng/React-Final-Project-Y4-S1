import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

class deleteProject extends Component {
  state = {
    title: '',
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.deleteProject(this.state);
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="container">

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: (project) => dispatch(deleteProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(deleteProject)
