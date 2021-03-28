import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AppBar from '../../components/Bar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save'

import Link from 'next/link';

// icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {

        console.log(err.code, err.message)
        setNotification(err.message)

        setTimeout(() => {
          setNotification('')
        }, 2000)
      })

    setUsername('')
    setPassword('')
    router.push("/")
  };
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
        marginLeft: '400px',
      },
    },
  }));
  const classes = useStyles();
  return (
    <Container>
      <Card>
        <CardContent>
          <div>
            {notify}
            <form className={classes.root} onSubmit={handleLogin} >
              <h1>Login</h1>
              <TextField
                className={classes.input_field}
                label="Email"
                variant="outlined"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <TextField
                className={classes.input_field}
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <Button
                className={classes.button_style}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>

              <Button
                className={classes.button_style}
                type="submit"
                color="primary"
                size="large"
              >
                <Link href="/users/register">
                  <a>Register</a>
                </Link>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login
