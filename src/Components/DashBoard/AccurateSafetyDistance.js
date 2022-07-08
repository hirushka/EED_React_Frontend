import React from "react";
import { makeStyles, withStyles } from '@mui/styles';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import FormControl from '@mui/material/FormControl';
import GppGoodIcon from '@mui/icons-material/GppGood';
import img from '../../assets/GGG.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

const styles = theme => ({
    paper: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: 10,
        // backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 10,
        marginBottom: 30
    },
    submit: {
        //margin: theme.spacing(3, 0, 2),
        alignItems: 'right',
        justifyContent: 'center',

    },
    select: {
        width: '100%'
    },
    errmsg: {
        color: 'red',
        fontSize: 12,
    },

});
class AccurateSafetyDistance extends React.Component {
    constructor() {
        super()
        this.state = {
            srcId: -1,
            doseReading: "",
            srcList: [],
            currentActivity: "",
            isErrorAlertOpen: false,
            errsrcId: "",
            errdoseReadin: "",
            errfromDate: "",
            errortoDate: "",
            accurateSafetyDistance: "",           
            todayDate: Date().toLocaleString(),
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handlePrint = this.handlePrint.bind(this)
    }

    handlePrint(event) {
        var srcName = "";
        this.state.srcList.map(src => {
            if (src.id == this.state.srcId) {
                srcName  = src.srcName;
            }
        })
        event.preventDefault();
        var mywindow = window.open('', 'PRINT', 'height=600,width=1000');
        mywindow.document.write('<html> <body>');
        mywindow.document.write('<div class-"container">');
        mywindow.document.write('<div class-"row">');
        mywindow.document.write('<div class-"col-4">');
        mywindow.document.write('Date : <strong>' + this.state.todayDate + '</strong>');
        mywindow.document.write(' <center>  <img src=" ' + img + '"/> <h3><strong>Accuarate Safety Distance<hr/></strong></h3>  </center>');
        mywindow.document.write('</div>');
        mywindow.document.write('<div class-"col-4" style="margin-left:90mm;margin-top:-6mm;">');
        mywindow.document.write('</div>');
        mywindow.document.write('<div class="clearfix"></div>');
        mywindow.document.write('<div class-"col-4">');
        mywindow.document.write('<br/><br/></div>');
        mywindow.document.write('</div>');
        mywindow.document.write('</div>');
        mywindow.document.write('<div><table><tr>');
        mywindow.document.write('<tr><td><strong>Source Name</strong> </td>');
        mywindow.document.write('<td>:' + srcName + ' </td></tr>');
        mywindow.document.write('<tr><td><strong>Dose Reading (R/hr)</strong> </td>');
        mywindow.document.write('<td>:' + this.state.doseReading + ' </td></tr>');
        mywindow.document.write('<tr><td><strong>Current Activity of the Source (Bq)</strong> </td>');
        mywindow.document.write('<td>:' + this.state.currentActivity+ ' </td>');
        mywindow.document.write('<tr><td><strong>Accuarate Safety Distance (m)</strong> </td>');
        mywindow.document.write('<td><strong>:' + this.state.accurateSafetyDistance+ '</strong> </td>');
        mywindow.document.write('</tr></table></div>');
        mywindow.document.write('</body></html>');
        setTimeout(
            function () {
                mywindow.document.close(); // necessary for IE >= 10
                mywindow.focus(); // necessary for IE >= 10*/

                mywindow.print();
                //mywindow.close();
            }, 3000);
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
        this.setState({
            errsrcId: "",
            errdoseReadin: "",
            errcurrentActivity: "",
        })

    }
    handleClose = () => {
        this.setState({
            isErrorAlertOpen: false
        })
    }
    clearAllFields = () => {
        this.setState({
            srcId: -1,
            doseReading: "",
            isErrorAlertOpen: false,
            currentActivity: "",
            errsrcId: "",
            errdoseReadin: "",
            errcurrentActivity: "",
            accurateSafetyDistance: ""
        })
    }

    formValidation() {
        var isValid = true;
        if (this.state.srcId == -1) {
            isValid = false;
            this.setState({
                errsrcId: "Please Select a Source."
            })
        }

        if (this.state.currentActivity === "") {
            isValid = false;
            this.setState({
                errcurrentActivity: "Please Give the Current Activity of the Source."
            })
        }
        if (this.state.doseReading === "") {
            isValid = false;
            this.setState({
                errdoseReadin: "Please Give the Dose Reading."
            })
        }

        return isValid;
    }
    handleSubmit = (event) => {

        event.preventDefault();
        var isValid = this.formValidation();

        if (isValid) {
            var currentActivity = this.state.currentActivity;

            const headers = { 'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + this.state.accessToken,
          }
            var quetString = ""
            quetString = this.state.doseReading + "/" + currentActivity + "/" + this.state.srcId

            fetch('http://localhost:8092/api/eed/src/getAccurateSafetyDistance/' + quetString, {headers})
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data != null) {
                        this.setState({
                            accurateSafetyDistance: data
                        })
                        localStorage.removeItem("currentActivity");
                    } else {
                        this.setState({
                            isErrorAlertOpen: true,
                        })
                    }
                })

        } else {

        }


    }


    componentWillMount() {

        var accessToken= sessionStorage.getItem("accessToken");
        console.log(accessToken)
        this.setState({
            accessToken:accessToken
        })

        const headers = { 'Content-Type': 'application/json' ,
        'Authorization': 'Bearer ' + accessToken,
      }

        console.log(localStorage.getItem("currentActivity"));
        var x = (localStorage.getItem("currentActivity") == null) ? "" : parseFloat(localStorage.getItem("currentActivity"));
        this.setState({
            currentActivity: x
        })

        fetch('http://localhost:8092/api/eed/src', {headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    this.setState({
                        srcList: data
                    })
                }
            })

    }

    render() {
        const { classes } = this.props;

        return (

            <div>
                <Card style={{ marginTop: 20 }}>
                    <Container component="main" maxWidth="xs">
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <GppGoodIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Accuarate Safety Distance
                            </Typography>

                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                        <InputLabel id="demo-simple-select-label">Source</InputLabel>
                                        <Select
                                            className={classes.select}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.srcId}
                                            onChange={this.handleChange}
                                            name="srcId"
                                            required
                                        >
                                            <MenuItem value={-1}>-- Please Select a Source --</MenuItem>
                                            {this.state.srcList.map((src) => (
                                                <MenuItem value={src.id}>{src.srcName}</MenuItem>
                                            ))}
                                        </Select>
                                        <div id='errsrcId' className={classes.errmsg}>{this.state.errsrcId}</div>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            autoComplete="doseReadin"
                                            name="doseReading"
                                            value={this.state.doseReading}
                                            required
                                            fullWidth
                                            id="doseReading"
                                            label="Dose Reading (R/hr)"
                                            autoFocus
                                            onChange={this.handleChange}
                                          
                                        />
                                        <div id='errdoseReadin' className={classes.errmsg}>{this.state.errdoseReadin}</div>
                                    </Grid>

                                    <Grid item xs={12} >
                                        <TextField
                                            autoComplete="currentActivity"
                                            name="currentActivity"
                                            value={this.state.currentActivity}
                                            required
                                            fullWidth
                                            id="currentActivity"
                                            label="Current Activity (Bq)"
                                            autoFocus
                                            onChange={this.handleChange}

                                        />
                                        <div id='errcurrentActivity' className={classes.errmsg}>{this.state.errcurrentActivity}</div>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            autoComplete="accurateSafetyDistance"
                                            name="accurateSafetyDistance"
                                            value={this.state.accurateSafetyDistance}
                                            disabled
                                            fullWidth
                                            id="accurateSafetyDistance"
                                            label="Accuare Safety Distance (m)"
                                            autoFocus
                                            onChange={this.handleChange}

                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        // onClick={this.handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={this.clearAllFields}
                                        >
                                            Clear
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            value="Print"
                                            className={classes.submit}
                                            onClick={(event) => this.handlePrint(event)}
                                        >
                                            Print
                                        </Button>
                                    </Grid>
                                </Grid>

                                <br />

                            </form>
                        </div>
                        <Dialog
                            open={this.state.isErrorAlertOpen}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >


                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Unable to Calculate. Please Try Again Later.
                            </Alert>

                        </Dialog>
                    </Container>
                </Card>

            </div>
        )
    }
}
AccurateSafetyDistance = withStyles(styles)(AccurateSafetyDistance);
export default withRouter(AccurateSafetyDistance);