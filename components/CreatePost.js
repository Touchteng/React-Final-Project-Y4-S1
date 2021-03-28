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
        width: '50ch',
      },
    },
    button_style: {
      '& > *': {
        margin: theme.spacing(0),
        width: '53ch',
      },
    },
    root: {
      '& > *': {
        marginLeft: '400px',
      },
    },
  }));
  const classes = useStyles();
  return (

    <Container maxWidth="lg">
      <AppBar></AppBar>
      <Card>
        <CardContent>
          <div>
            <form className={classes.root} onSubmit={handleSubmit}>
            <h2>Add Blog</h2>
              <p>{notification}</p>
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Title
                </Typography>
                <TextField variant="filled" id="filled-basic" className={classes.input_field} type="text" value={title} onChange={({target}) => setTitle(target.value)} />
              </div>
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Content
                </Typography>
                <TextField variant="filled" id="filled-basic" className={classes.input_field} value={content} onChange={({target}) => setContent(target.value)} />
              </div>
              <br/>
              <Button className={classes.button_style} type="submit" variant="contained" color="primary">Save</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

export default CreatePost;