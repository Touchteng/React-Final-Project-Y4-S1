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
            
            
            <form className={classes.root} onSubmit={handleLogin}>
              <h1>Create new user</h1>
              <p>{notify}</p>
              <Typography color="textSecondary" gutterBottom>
                Email
              </Typography>
              <TextField id="filled-basic" className={classes.input_field} variant="filled" type="text" value={userName} onChange={({target}) => setUsername(target.value)} /> 
              <br />
              <Typography color="textSecondary" gutterBottom>
                Password
              </Typography>
              <TextField id="filled-basic" className={classes.input_field}  variant="filled" type="password" value={password} onChange={({target}) => setPassword(target.value)} /> 
              <br />
              <Typography color="textSecondary" gutterBottom>
                Confirm Password
              </Typography>
              <TextField id="filled-basic" className={classes.input_field}  variant="filled" type="password" value={passConf} onChange={({target}) => setPassConf(target.value)} /> 
              <br />
              <br/>
              <Button className={classes.button_style} type="submit" variant="contained" color="primary">Register</Button>
            </form>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" href="/users/login" size="small">Back to Login</Button>
        </CardActions>
      </Card>
    </Container>
  )
}

export default Register