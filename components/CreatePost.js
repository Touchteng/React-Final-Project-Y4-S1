import React, { useState } from 'react';
import fire from '../config/fire-config';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AppBar from './Bar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        content: content,
      });

    setTitle('');
    setContent('');

    setNotification('Blogpost created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  const useStyles = makeStyles((theme) => ({
    input_field: {
      '& > *': {
        margin: theme.spacing(0),
        marginBottom: 30,
        width: '40vh',
      },
    },
    button_style: {
      width: '40vh',
      marginBottom: 20
    },
    root: {
      '& > *': {
        marginLeft: '10vh',
      },
    },
  }));
  const classes = useStyles();
  return (

    <Container>
      <Card>
        <CardContent>
          <div>
            <form className={classes.root} onSubmit={handleSubmit}>
              <h2>Add Blog</h2>
              <p>{notification}</p>
              <TextField
                className={classes.input_field}
                label="Title"
                variant="outlined"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />

              <TextField
                className={classes.input_field}
                label="Content"
                variant="outlined"
                type="textarea"
                value={content}
                onChange={({ target }) => setContent(target.value)}
              />
              <Button
                className={classes.button_style}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Save
                </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

export default CreatePost;