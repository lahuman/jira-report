
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import apiInstance from '../../apiInstance';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  export default function SignIn() {
    const classes = useStyles();
    const [userId, setUserId] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isSaveId, setIsSaveId] = React.useState(false);

    React.useEffect(() => {
        const id = window.localStorage.getItem("userId");
        if(id){
            setIsSaveId(true);
            setUserId(id);
        }
    },[]);
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={async (e) => {
                e.preventDefault();
                if(userId.trim() === '' || password.trim() === ''){
                    alert('ID/PW를 입력하여 주세요');
                    return;
                }
                if(isSaveId) {
                    window.localStorage.setItem("userId", userId);
                }else {
                    window.localStorage.clear();
                }
                const result = await apiInstance({url:'/v2/login', method:'POST', body: {id: userId, pw: password}});
                if(result.id === userId){
                    window.location.href = '/';
                }
          }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="UserId"
              label="UserId"
              name="UserId"
              autoComplete="UserId"
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              password={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              checked={isSaveId}
              onChange={(e) => setIsSaveId(e.target.checked)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }