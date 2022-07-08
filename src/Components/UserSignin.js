import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withRouter } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles, withStyles } from '@mui/styles';
import img from '../assets/GGG.png';

const styles = {
  appBar: {
      position: 'relative',
  }
};

class UserSignin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      isErrorAlertOpen: false,
      userLs: [],
      username: "",
      roleId: 0,
      tokenType:"",
      accessToken:"",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    const { name, value, type, checked } = event.target
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

  handleSubmit(event) {
    const { history } = this.props;
    event.preventDefault();
    fetch('http://localhost:8092/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        usernameOrEmail: this.state.username,
        password: this.state.password
      }),
    }).then((response) => {
      console.log(response)
      if (response.status == 200) {

        console.log("SUCESS")
        return response.json();
      }else if(response.status == 401){

          console.log("LOGIN FAIL")
          this.setState({
            isErrorAlertOpen: true
          })
      }
    }).then((data) => {

      this.setState({
        tokenType:data.tokenType,
        accessToken:data.accessToken
      })
      sessionStorage.setItem("accessToken",data.accessToken)
      if (data !== '') {
        console.log(data)
        if (data == "0") {
         

        } else {

          var userId = parseInt(data.userId);
          const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
          fetch('http://localhost:8092/api/eed/getuserbyid/' + userId, { headers })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              if (data != null) {
                this.setState({
                  userLs: data,
                 // username: data[0].username,
                //  roleId: data[0].roleId,
                }, () => {
                  console.log("userLs", this.state.userLs.username)
                
                  sessionStorage.setItem("roleId", this.state.userLs.roleId);
                  sessionStorage.setItem("userId", this.state.userLs.userId);
                  sessionStorage.setItem("username",this.state.userLs.username);
                })

              }
            }).then(() => {

              history.push('./home')
            })

        }

      }
    }).catch(function (error) {
      console.log(error);
    });



  }
  render() {


    return (

      <div>
        <AppBar position="absolute" color="default" className={styles.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Emergency Excercise Instruction Sysytem
                    </Typography>
                  <img src= {img}/>
                </Toolbar>
            </AppBar>

         <Card sx={{ mt: 10 }}>
        <Container component="main" maxWidth="xs" sx={{ mb: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form component="form" noValidate onSubmit={this.handleSubmit} >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={this.handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}

                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="./signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
          <Dialog
            open={this.state.isErrorAlertOpen}
            onClose={() => { this.setState({ isErrorAlertOpen: false }) }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >


            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Incorrect Username or Password.
            </Alert>

          </Dialog>
        </Container>
      </Card>
      </div>
     
    )
  }
}
UserSignin = withStyles(styles)(UserSignin);
export default withRouter(UserSignin);