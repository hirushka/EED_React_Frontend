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
class CurrentActivityOfSrc extends React.Component {
    constructor() {
        super()
        this.state = {
            srcId: -1,
            initialActivity: "",
            srcList: [],
            fromDate: Date().toLocaleString(),
            todayDate: Date().toLocaleString(),
            toDate: Date().toLocaleString(),
            currentActivity: "",
            isErrorAlertOpen: false,
            errsrcId: "",
            errinitialActivity: "",
            errfromDate: "",
            errortoDate: "" 
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
        mywindow.document.write(' <center>  <img src=" ' + img + '"/> <h3><strong>Current Activity Of The Source<hr/></strong></h3>  </center>');
        mywindow.document.write('</div>');
        mywindow.document.write('<div class-"col-4" style="margin-left:90mm;margin-top:-6mm;">');
        mywindow.document.write('</div>');
        mywindow.document.write('<div class="clearfix"></div>');
        mywindow.document.write('<div class-"col-4">');
        mywindow.document.write('<br/><br/></div>');
        mywindow.document.write('</div>');
        mywindow.document.write('</div>');
        mywindow.document.write('<div><table><tr>');
        mywindow.document.write('<tr><td><strong>Source Name </strong> </td>');
        mywindow.document.write('<td> :' + srcName + ' </td></tr>');
        mywindow.document.write('<tr><td><strong>Initial Activity (Bq) </strong> </td>');
        mywindow.document.write('<td> :' + this.state.initialActivity + ' </td></tr>');
        mywindow.document.write('<tr><td><strong>Start Date </strong> </td>');
        mywindow.document.write('<td> :' + this.state.fromDate + '</td></tr>');
        mywindow.document.write('<tr><td><strong>Current Date </strong> </td>');
        mywindow.document.write('<td> :' + this.state.toDate + '</td></tr>');
        mywindow.document.write('<tr><td><strong>Current Activity of the Source (Bq) </strong> </td>');
        mywindow.document.write('<td><strong> :' + this.state.currentActivity+ '</strong> </td>');
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
            errinitialActivity: "",
            errfromDate: "",
            errortoDate: ""
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
            initialActivity: "",
            fromDate: Date().toLocaleString(),
            todayDate: Date().toLocaleString(),
            toDate: Date().toLocaleString(),
            isErrorAlertOpen: false,
            currentActivity: "",
            errsrcId: "",
            errinitialActivity: "",
            errfromDate: "",
            errortoDate: ""
        })
    }

    formValidation() {
        var isValid = true;
        debugger;
        if (this.state.srcId == -1) {
            isValid = false;
            this.setState({
                errsrcId: "Please Select a Source."
            })
        }

        if (this.state.initialActivity === "" || this.state.initialActivity == 0) {
            isValid = false;
            this.setState({
                errinitialActivity: "Please Give Initial Activity of the Source."
            })
        }


        if (Date.parse(this.state.toDate) < Date.parse(this.state.fromDate)) {
            isValid = false;
            this.setState({
                errfromDate: "Please Select a Valid Date.",
                errortoDate: "Please Select a Valid Date.",
            })
        }


        return isValid;
    }
    handleSubmit = (event) => {

        event.preventDefault();
        var isValid = this.formValidation();

        if (isValid) {
            var quetString = ""
            var duration = Math.floor((Date.parse(this.state.toDate) - Date.parse(this.state.fromDate)) / 86400000);

            const headers = { 'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + this.state.accessToken,
          }
            quetString = this.state.initialActivity + "/" + duration + "/" + this.state.srcId

            fetch('http://localhost:8092/api/eed/src/getCurrentActivity/' + quetString, {headers})
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data != null) {
                        this.setState({
                            currentActivity: data
                        })
                        localStorage.removeItem("currentActivity");
                        localStorage.setItem("currentActivity", data);
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
                                <FireplaceIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Current Activity Of The Source
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
                                            autoComplete="initialActivity"
                                            name="initialActivity"
                                            value={this.state.initialActivity}
                                            required
                                            fullWidth
                                            id="initialActivity"
                                            label="Initial Activity (Bq)"
                                            autoFocus
                                            onChange={this.handleChange}

                                        />
                                        <div id='errinitialActivity' className={classes.errmsg}>{this.state.errinitialActivity}</div>
                                    </Grid>

                                    <Grid item xs={5}>
                                        <TextField
                                            id="date"
                                            label="Start Date"
                                            type="date"
                                            onChange={this.handleChange}
                                            name="fromDate"
                                            value={this.state.fromDate}
                                            defaultValue={this.state.todayDate}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <div id='errfromDate' className={classes.errmsg}>{this.state.errfromDate}</div>
                                    </Grid>
                                    <Grid item xs={1}>

                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            id="date"
                                            label="Current Date"
                                            type="date"
                                            defaultValue={this.state.todayDate}
                                            value={this.state.toDate}
                                            name="toDate"
                                            required
                                            onChange={this.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <div id='errortoDate' className={classes.errmsg}>{this.state.errortoDate}</div>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            autoComplete="currentActivity"
                                            name="currentActivity"
                                            value={this.state.currentActivity}
                                            disabled
                                            fullWidth
                                            id="currentActivity"
                                            label="Current Activity (Bq)"
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
CurrentActivityOfSrc = withStyles(styles)(CurrentActivityOfSrc);
export default withRouter(CurrentActivityOfSrc);