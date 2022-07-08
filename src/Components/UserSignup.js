import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { withRouter } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles, withStyles } from '@mui/styles';
import img from '../assets/GGG.png';

const styles = {
  appBar: {
    position: 'relative',
  }
};
class UserSignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      cpassword: "",
      empId: "",
      userType: 0,
      designation: "",
      firstName: "",
      lastName: "",
      empLocation: "",
      roleId: 2
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }
  handleSubmit = (event) => {
    const { history } = this.props;

    fetch('http://localhost:8092/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        empId: this.state.empId,
        empLocation: this.state.empLocation,
        roleId: 2,
        designation: this.state.designation,
        username: this.state.username,
        password: this.state.password
      }),
    }).then((response) => {
      if (response.status == 200 ||response.status == 201 ) {
        console.log("SUCESS")
        history.push('./signin')
      }
    }).catch(function (error) {
        console.log(error);
      });

    event.preventDefault();


  }

  handleBlur(event) {
    const confirmPassword = this.state.cpassword
    const password = this.state.password

    if (confirmPassword !== "" && confirmPassword !== password) alert("passwords dose not matched...")
  }

  render() {
    return (
      <div>
        <AppBar position="absolute" color="default" className={styles.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Emergency Excercise Instruction Sysytem
            </Typography>
            <img src={img} />
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
                Sign up
              </Typography>
              <Box sx={{ mt: 3 }}>
                <form component="form" noValidate onSubmit={this.handleSubmit} >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="username"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        onChange={this.handleChange}
                        autoFocus
                        value={this.state.username}

                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="cpassword"
                        value={this.state.cpassword}
                        autoComplete="c-password"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                      <TextField
                        required
                        fullWidth
                        id="empId"
                        label="Employee Id"
                        name="empId"
                        autoComplete="empId"
                        value={this.state.empId}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                      <TextField
                        required
                        fullWidth
                        id="designation"
                        label="Designation"
                        name="designation"
                        autoComplete="designation"
                        value={this.state.designation}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                      <TextField
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        autoComplete="empLocation"
                        name="empLocation"
                        required
                        fullWidth
                        id="empLocation"
                        label="Emplyee Location"
                        onChange={this.handleChange}
                        autoFocus
                        value={this.state.empLocation}

                      />
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="./signin" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>

            </Box>
          </Container>

        </Card>
      </div>

    )
  }
}
UserSignUp = withStyles(styles)(UserSignUp);
export default withRouter(UserSignUp);