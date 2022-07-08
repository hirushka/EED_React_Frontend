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
import Fab from '@mui/material/Fab';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Stepper from 'react-stepper-horizontal';
import img from '../../assets/GGG.png';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { TextareaAutosize } from "@mui/material";

const styles = theme => ({
    paper: {
        marginTop: -40,
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
    }, errmsg: {
        color: 'red',
        fontSize: 12,
    },
});

const sections = [
    { title: 'Step 1', onClick: () => this.setState({ currentPage: 1 }) },
    { title: 'Step 2', onClick: () => this.setState({ currentPage: 2 }) },
    { title: 'Step 3', onClick: () => this.setState({ currentPage: 3 }) },
    { title: 'Step 4', onClick: () => this.setState({ currentPage: 4 }) },
    { title: 'Step 5', onClick: () => this.setState({ currentPage: 5 }) }
];
class ExerciseScheduler extends React.Component {
    constructor() {

        var today = new Date(),
            date = '0' + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        var today = new Date(),
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        super()
        this.state = {
            exName: "",
            etDescription: "",
            etId: -1,
            exerciseTypeList: [],
            isSuccessAlertOpen: false,
            scenarioDes: "",
            stepOne: "",
            stepTwo: "",
            stepThree: "",
            stepFour: "",
            stepFive: "",
            stepSix: "",
            stepSeven: "",
            stepEight: "",
            stepNine: "",
            stepTen: "",
            stepEleven: "",
            stepTwelve: "",
            stepThirteen: "",
            stepFourteen: "",
            stepFifteen: "",
            stepSixteen: "",
            stepSeventeen: "",
            stepEighteen: "",
            stepNineteen: "",
            stepTwenty: "",
            sceduledDate: date.toLocaleString(),
            sceduledTime: time.toLocaleString(),
            todayDate: date.toLocaleString(),
            currentPage: 1,

            erretId: "",
            errexName: "",
            erretDescription: "",
            errscenarioDes: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        //this.handlePrint = this.handlePrint.bind(this)
    }

  /*  handlePrint(event) {
        var drillName = "";
        var drillPurpose = "";
        var drillPurposeDes = "";
        this.state.exerciseTypeList.map(ex => {
            if (ex.id == this.state.etId) {
                drillName = ex.drillName;
                drillPurpose = ex.drillPurpose;
                drillPurposeDes = ex.drillPurposeDes;
            }
        })

        var sceduledDateParts = this.state.sceduledDate.split('/')
        var date = sceduledDateParts[0] + ' ' + this.state.sceduledTime;
        var today = new Date(),
            currentdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();;

        event.preventDefault();
        var mywindow = window.open('', 'PRINT', 'height=600,width=1000');
        mywindow.document.write('<html> <body>');
        mywindow.document.write('<div class-"container">');
        mywindow.document.write('<div class-"row">');
        mywindow.document.write('<div class-"col-4">');
        mywindow.document.write('Date : <strong>' + this.state.todayDate + '</strong>');
        mywindow.document.write(' <center>  <img src=" ' + img + '"/> <h3><strong>Exercise Scedule<hr/></strong></h3>  </center>');
        mywindow.document.write('</div>');
        mywindow.document.write('<div class-"col-4" style="margin-left:90mm;margin-top:-6mm;">');
        mywindow.document.write('</div>');
        mywindow.document.write('<div class="clearfix"></div>');
        mywindow.document.write('<div class-"col-4">');
        mywindow.document.write('<br/><br/></div>');
        mywindow.document.write('</div>');
        mywindow.document.write('</div>');
        mywindow.document.write('<div><table><tr>');
        mywindow.document.write('<tr><td><strong>Exercise Name</strong> </td>');
        mywindow.document.write('<td>' + this.state.exName + ' </td></tr>');
        mywindow.document.write('<tr><td><strong>Excercise Purpose</strong> </td>');
        mywindow.document.write('<td>' + drillPurpose + ' </td></tr>');
        mywindow.document.write('<tr><td><strong>Excercise Type</strong> </td>');
        mywindow.document.write('<td>' + drillName + '</td></tr>');
        mywindow.document.write('<tr><td><strong>Exercise Type Purpose Description</strong> </td>');
        mywindow.document.write('<td>' + drillPurposeDes + '</td></tr>');
        mywindow.document.write('<tr><td><strong>Schedule Date and Time</strong> </td>');
        mywindow.document.write('<td><strong>' +currentdate + '</strong> </td>');
        mywindow.document.write('<tr><td><strong>Scenario of the Exercise</strong> </td>');
        mywindow.document.write('<td><strong>' + this.state.scenarioDes + '</strong> </td>');
        mywindow.document.write('</tr></table></div>');
        mywindow.document.write('<div><li>');
        mywindow.document.write('<ul>' + this.state.stepOne + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepTwo + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepThree + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepFour + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepFive + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepSix + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepSeven + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepEight + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepNine + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepTen + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepEleven + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepTwelve + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepThirteen + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepFourteen + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepFifteen + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepSixteen + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepSeventeen + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepEighteen + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepNineteen + '</ul>')
        mywindow.document.write('<ul>' + this.state.stepTwenty + '</ul>')
        mywindow.document.write('</li></div>')
        mywindow.document.write('</body></html>');
        setTimeout(
            function () {
                mywindow.document.close(); // necessary for IE >= 10
                mywindow.focus(); // necessary for IE >= 10*/

               // mywindow.print();
                //mywindow.close();
         //   }, 3000);
 //   }*/


    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value }, () => {

            if (this.state.etId !== "-1") {
                this.state.exerciseTypeList.map((e) => {
                    if (this.state.etId === e.id) {
                        this.setState({
                            etDescription: e.drillPurposeDes
                        })
                    }
                })
            }

            this.setState({
                erretId: "",
                errexName: "",
                erretDescription: "",
                errscenarioDes: "",
            })
        })
        console.log(this.state.sceduledDate + ' ' + this.state.sceduledTime)

    }
    handleClose = () => {
        this.setState({
            isSuccessAlertOpen: false
        })
    }
    clearAllFields = () => {
        this.setState({
            exName: "",
            etDescription: "",
            etId: -1,
            scenarioDes: "",
            stepOne: "",
            stepTwo: "",
            stepThree: "",
            stepFour: "",
            stepFive: "",
            stepSix: "",
            stepSeven: "",
            stepEight: "",
            stepNine: "",
            stepTen: "",
            stepEleven: "",
            stepTwelve: "",
            stepThirteen: "",
            stepFourteen: "",
            stepFifteen: "",
            stepSixteen: "",
            stepSeventeen: "",
            stepEighteen: "",
            stepNineteen: "",
            stepTwenty: "",
            sceduledDate: "",
            sceduledTime: "",
            todayDate: "",
            currentPage: 1,
            erretId: "",
            errexName: "",
            erretDescription: "",
            errscenarioDes: "",
        })
    }
    formValidation() {
        var isValid = true;

        if (this.state.etId == -1) {
            isValid = false;
            this.setState({
                erretDescription: "Please Select a Exercise Type or Purpose.",
                erretId: "Please Select a Exercise Type or Purpose.",
            })
        }

        if (this.state.exName === "") {
            isValid = false;
            this.setState({
                errexName: "please Give a Exercise Name."
            })
        }

        if (this.state.scenarioDes === "") {
            isValid = false;
            this.setState({
                errscenarioDes: "Please Give a Scenario."
            })
        }

        return isValid;
    }
    handleSubmit = (event) => {
        event.preventDefault();

        var sceduledDateParts = this.state.sceduledDate.split('/')
        var date = sceduledDateParts[0] + ' ' + this.state.sceduledTime;
        var today = new Date(),
            currentdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();;

        fetch('http://localhost:8092/api/eed/addex', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',              
                'Authorization': 'Bearer ' + this.state.accessToken,
            },

            body: JSON.stringify({
                exName: this.state.exName,
                etDescription: this.state.etDescription,
                etId: this.state.etId,
                scenarioDes: this.state.scenarioDes,
                sceduledDate: date,
                createdBy: parseInt(this.state.userId),
                stepOne: this.state.stepOne,
                stepTwo: this.state.stepTwo,
                stepThree: this.state.stepThree,
                stepFour: this.state.stepFour,
                stepFive: this.state.stepFive,
                stepSix: this.state.stepSix,
                stepSeven: this.state.stepSeven,
                stepEight: this.state.stepEight,
                stepNine: this.state.stepNine,
                stepTen: this.state.stepTen,
                stepEleven: this.state.stepEleven,
                stepTwelve: this.state.stepTwelve,
                stepThirteen: this.state.stepThirteen,
                stepFourteen: this.state.stepFourteen,
                stepFifteen: this.state.stepFifteen,
                stepSixteen: this.state.stepSixteen,
                stepSeventeen: this.state.stepSeventeen,
                stepEighteen: this.state.stepEighteen,
                stepNineteen: this.state.stepNineteen,
                stepTwenty: this.state.stepTwenty,
                createdDate: currentdate


            }),
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log("SUCESS");
                //history.push('./acctypes')
                this.setState({
                    isSuccessAlertOpen: true
                })
               // this.handlePrint()
               this.clearAllFields();
            }
        })
            .catch(function (error) {
                console.log(error);
            });




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
        var username = sessionStorage.getItem("username")
        var roleId = sessionStorage.getItem("roleId")
        var userId = sessionStorage.getItem("userId")
        this.setState({
            username: username,
            roleId: roleId,
            userId: userId
        }, () => {
            console.log("username", this.state.username)
            console.log("roleId", this.state.roleId)
            console.log("userId", this.state.userId)
        })

        fetch('http://localhost:8092/api/eed/getallet',{headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    this.setState({
                        exerciseTypeList: data
                    })
                }
            })
    }

    next = () => {
        console.log(this.state.currentPage)

        if (this.state.currentPage == 1) {
            var isValid = this.formValidation();

            if (isValid) {
                this.setState((prev) => {
                    return {
                        ...prev,
                        currentPage: prev.currentPage + 1
                    }
                }, () => {
                    console.log(this.state.currentPage)
                })
            }
        } else {
            this.setState((prev) => {
                return {
                    ...prev,
                    currentPage: prev.currentPage + 1
                }
            }, () => {
                console.log(this.state.currentPage)
            })
        }

    }
    prev = () => {
        console.log(this.state.currentPage)
        this.setState((prev) => {
            return {
                ...prev,
                currentPage: prev.currentPage - 1
            }
        }, () => {
            console.log(this.state.currentPage)
        })
    }

    render() {
        const { classes } = this.props;

        return (

            <div>
                <Card style={{ marginTop: 30 }}>
                    <Container component="main" maxWidth="sm">

                        <Box sx={{ '& > :not(style)': { m: 1 } }} display="flex" justifyContent="flex-end">
                            <Fab size="small" aria-label="add" component={Link} to={'/exercises'} >
                                <PlaylistAddCheckIcon />
                            </Fab>

                        </Box>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <PlaylistAddIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Excercise Scheduler
                            </Typography>

                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Stepper
                                        steps={sections}
                                        activeStep={this.state.currentPage}
                                        activeColor="red"
                                        defaultBarColor="red"
                                        completeColor="green"
                                        completeBarColor="green"
                                    />

                                    {this.state.currentPage === 1 && (
                                        <>

                                            <Grid container spacing={2} style={{ marginTop: 20 }}>
                                                <Grid item xs={6}>
                                                    <InputLabel id="demo-simple-select-label">Excercise Purpose</InputLabel>
                                                    <Select
                                                        className={classes.select}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={this.state.etId}
                                                        onChange={this.handleChange}
                                                        name="etId"
                                                    >
                                                        <MenuItem value={-1}>-- Please Select the Purpose of the Excercise --</MenuItem>
                                                        {this.state.exerciseTypeList.map((et) => (
                                                            <MenuItem value={et.id}>{et.drillPurpose}</MenuItem>
                                                        ))}

                                                    </Select>
                                                    <div id='erretId' className={classes.errmsg}>{this.state.erretId}</div>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <InputLabel id="demo-simple-select-label">Excercise Type</InputLabel>

                                                    <Select
                                                        className={classes.select}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={this.state.etId}
                                                        onChange={this.handleChange}
                                                        name="etId"
                                                    >
                                                        <MenuItem value={-1}>-- Please Select a Excercise Type--</MenuItem>
                                                        {this.state.exerciseTypeList.map((et) => (
                                                            <MenuItem value={et.id}>{et.drillName}</MenuItem>
                                                        ))}

                                                    </Select>
                                                    <div id='erretId' className={classes.errmsg}>{this.state.erretId}</div>

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        multiline
                                                        fullWidth
                                                        maxRows={4}
                                                        disabled
                                                        id="etDescription"
                                                        label="Exercise Type Purpose Description"
                                                        name="etDescription"
                                                        autoComplete="etDescription"
                                                        value={this.state.etDescription}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div id='erretId' className={classes.errmsg}>{this.state.erretDescription}</div>

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="exName"
                                                        label="Exercise Name"
                                                        name="exName"
                                                        autoComplete="exName"
                                                        value={this.state.exName}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errexName}</div>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="sceduledDate"
                                                        label="Schedule Date"
                                                        type="date"
                                                        defaultValue={this.state.todayDate}
                                                        value={this.state.sceduledDate}
                                                        name="sceduledDate"
                                                        required
                                                        onChange={this.handleChange}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="sceduledTime"
                                                        label="Schedule Time"
                                                        type="time"
                                                        defaultValue={this.state.sceduledTime}
                                                        value={this.state.sceduledTime}
                                                        name="sceduledTime"
                                                        required
                                                        onChange={this.handleChange}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>


                                                <Grid item xs={12}>
                                                    <TextField
                                                        multiline
                                                        fullWidth
                                                        maxRows={5}
                                                        id="scenarioDes"
                                                        label="Scenario"
                                                        name="scenarioDes"
                                                        autoComplete="scenarioDes"
                                                        value={this.state.scenarioDes}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errscenarioDes}</div>

                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid item xs={6} style={{ marginTop: 5 }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.next}>Next</Button>
                                                </Grid>
                                                <Grid item xs={6}>

                                                </Grid>
                                            </Grid>
                                        </>
                                    )}

                                    {this.state.currentPage === 2 && (
                                        <>
                                            <Grid container spacing={2} style={{ marginTop: 20 }}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepOne"
                                                        label="Step I"
                                                        name="stepOne"
                                                        autoComplete="instructionTitleTwo"
                                                        value={this.state.stepOne}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepTwo"
                                                        label="Step II"
                                                        name="stepTwo"
                                                        autoComplete="instructionDescriptionTwoOne"
                                                        value={this.state.stepTwo}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepThree"
                                                        label="Step III"
                                                        name="stepThree"
                                                        autoComplete="instructionDescriptionTwoTwo"
                                                        value={this.state.stepThree}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFour"
                                                        label="Step IV"
                                                        name="stepFour"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.stepFour}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFive"
                                                        label="Step V"
                                                        name="stepFive"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.stepFive}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Grid container spacing={2} style={{ marginTop: 5 }}>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.prev}>Back</Button>
                                                    </Grid>
                                                    <Grid item xs={6}>

                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.next}>Next</Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </>
                                    )}

                                    {this.state.currentPage === 3 && (
                                        <>
                                            <Grid container spacing={2} style={{ marginTop: 20 }}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepSix"
                                                        label="Step VI"
                                                        name="stepSix"
                                                        autoComplete="instructionTitleThree"
                                                        value={this.state.stepSix}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepSeven"
                                                        label="Step VII"
                                                        name="stepSeven"
                                                        autoComplete="instructionDescriptionThreeOne"
                                                        value={this.state.stepSeven}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepEight"
                                                        label="Step VIII"
                                                        name="stepEight"
                                                        autoComplete="instructionDescriptionTwo"
                                                        value={this.state.stepEight}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepNine"
                                                        label="Step IX"
                                                        name="stepNine"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.stepNine}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepTen"
                                                        label="Step X"
                                                        name="stepTen"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.stepTen}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Grid container spacing={2} style={{ marginTop: 5 }}>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.prev}>Back</Button>
                                                    </Grid>
                                                    <Grid item xs={6}>

                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.next}>Next</Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </>
                                    )}

                                    {this.state.currentPage === 4 && (
                                        <>
                                            <Grid container spacing={2} style={{ marginTop: 20 }}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepEleven"
                                                        label="Step XI"
                                                        name="stepEleven"
                                                        autoComplete="instructionTitleThree"
                                                        value={this.state.stepEleven}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepTwelve"
                                                        label="Step XII"
                                                        name="stepTwelve"
                                                        autoComplete="instructionDescriptionThreeOne"
                                                        value={this.state.stepTwelve}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepThirteen"
                                                        label="Step XIII"
                                                        name="stepThirteen"
                                                        autoComplete="instructionDescriptionTwo"
                                                        value={this.state.stepThirteen}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFourteen"
                                                        label="Step XIV"
                                                        name="stepFourteen"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.stepFourteen}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFifteen"
                                                        label="Step XV"
                                                        name="stepFifteen"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.stepFifteen}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Grid container spacing={2} style={{ marginTop: 5 }}>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.prev}>Back</Button>
                                                    </Grid>
                                                    <Grid item xs={6}>

                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.next}>Next</Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </>
                                    )}
                                    {this.state.currentPage === 5 && (
                                        <>

                                            <Grid container spacing={2} style={{ marginTop: 20 }}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepSixteen"
                                                        label="Step XVI"
                                                        name="stepSixteen"
                                                        autoComplete="instructionTitleThree"
                                                        value={this.state.stepSixteen}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepSeventeen"
                                                        label="Step XVII"
                                                        name="stepSeventeen"
                                                        autoComplete="instructionDescriptionThreeOne"
                                                        value={this.state.stepSeventeen}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepEighteen"
                                                        label="Step XVIII"
                                                        name="stepEighteen"
                                                        autoComplete="instructionDescriptionTwo"
                                                        value={this.state.stepEighteen}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepNineteen"
                                                        label="Step XIX"
                                                        name="stepNineteen"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.stepNineteen}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepTwenty"
                                                        label="Step XX"
                                                        name="stepTwenty"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.stepTwenty}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                                                <Grid container spacing={2} style={{ marginTop: 5 }}>
                                                    <Grid item xs={4}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.prev}>Back</Button>
                                                    </Grid>
                                                    <Grid item xs={4}>

                                                    </Grid>
                                                    <Grid item xs={4}>

                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleSubmit}>Submit</Button>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </div>
                                        </>
                                    )}

                                </Grid>

                                <br />

                            </form>
                        </div>
                        <Dialog
                            open={this.state.isSuccessAlertOpen}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >


                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                Exercise Scduled Successfully.
                            </Alert>

                        </Dialog>
                    </Container>
                </Card>

            </div>
        )
    }
}
ExerciseScheduler = withStyles(styles)(ExerciseScheduler);
export default withRouter(ExerciseScheduler);