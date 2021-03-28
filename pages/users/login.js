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
    <AppBar>
    </AppBar>
    <Card>
      <CardContent>
        <div>
          
          {notify}
          <form className={classes.root} onSubmit={handleLogin} >
          <h1>Login</h1>
            <Typography color="textSecondary" gutterBottom>
              Email
            </Typography>
            <TextField id="filled-basic" className={classes.input_field} variant="filled" type="text" value={username} onChange={({target}) => setUsername(target.value)} />
            <br />
            <Typography color="textSecondary" gutterBottom>
              Password
            </Typography>
            <TextField id="filled-basic" className={classes.input_field}  variant="filled" type="password" value={password} onChange={({target}) => setPassword(target.value)} />
            <br />
            <br/>
            <Button className={classes.button_style} type="submit" variant="contained" color="primary">Login</Button>
            <br/>
            <a  href="/users/register">Register</a>
          </form>
        </div>
      </CardContent>
    </Card>
    </Container>
  )

}

export default Login
