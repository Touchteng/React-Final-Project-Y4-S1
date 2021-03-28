import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AppBar from '../../components/Bar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';


const Register = () => {

  const router = useRouter();

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');

  const [notify, setNotification] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (password !== passConf) {
      setNotification('Password and password confirmation does not match')

      setTimeout(() => {
        setNotification('')
      }, 2000)

      setPassword('');
      setPassConf('');
      return null;

    }

    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });

    // router.push("/")
    setNotification('User has been created');
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
        marginLeft: '400px',
      },
    },
  }));
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Card>
        <CardContent>
          <div>


            <form className={classes.root} onSubmit={handleLogin}>
              <h1>Create new user</h1>
              <TextField
                className={classes.input_field}
                label="Email"
                variant="outlined"
                value={userName}
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

              <TextField
                className={classes.input_field}
                label="Password"
                variant="outlined"
                type="password"
                value={passConf}
                onChange={({ target }) => setPassConf(target.value)}
              />
              <Button
                className={classes.button_style}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Register
              </Button>

              <Button
                className={classes.button_style}
                type="submit"
                // variant="outlined"
                color="primary"
                size="large"
              >
                <Link href="/users/login">
                  <a>Login</a>
                </Link>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Register