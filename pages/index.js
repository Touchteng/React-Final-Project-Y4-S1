import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/CreatePost';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// style
import globalStyles from "../styles/global"

// ui-components
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";

// icons
import MenuIcon from '@material-ui/icons/Menu';

// components
import Login from "../pages/users/login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // classes
  const classes = useStyles();

  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

  useEffect(() => {
    fire.firestore()
      .collection('blog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
  }, []);

  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 500)
      });
  }

  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      {/* <h1>Blog</h1> */}
      {notification}
      {!loggedIn
        ?
        // <div>
        //   <Link href="/users/register">
        //     <a>Register</a>
        //   </Link> | 
        //   <Link href="/users/login">
        //     <a> Login</a>
        //   </Link>
        //   <Login/>
        // </div>
        <Login />
        :
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              News
        </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
            >Logout</Button>
          </Toolbar>
        </AppBar>
      }
      {
        loggedIn ?
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <CreatePost />
            </Grid>
            <Grid item xs={12} sm={7}>
              <ul>
                {blogs.map(blog =>
                  <li key={blog.id}>
                    <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                      <a itemProp="hello">{blog.title}</a>
                    </Link>
                  </li>
                )}
              </ul>
            </Grid>
          </Grid>
          : null
      }
    </div>
  )
}

export default Home;