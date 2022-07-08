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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import img from '../../assets/GGG.png';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

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
class AccidentReport extends React.Component {
    constructor() {

        var today = new Date(),
            date = '0' + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        var today = new Date(),
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        super()
        this.state = {
            informerFullName: "",
            informerMembership: "",
            informerAddress: "",
            informerPhone: "",
            accLocation: "",
            accDescription: "",
            isPublicInvolved: "",
            isUrgent: "",
            assistanceDes: "",
            radionuclides: "",
            sealedType: "",
            unsealedTypes: "",
            generatorsVolt: "",
            generatorsAmp: "",
            locationType: "",
            equipmentType: "",
            emergenyNature: "",
            srcDiscoveredStatus: "",
            isControlled: "",
            preventionAction: "",
            lastTimeSafe: "",
            srcOrigin: "",
            srcOwner: "",
            radiologicalHazards: "",
            conventionalHazards: "",
            injuredPerson: "",
            deaths: "",
            exposedIndividuals: "",
            contaminatedIndividuals: "",
            monitoryChallenges: "",


            errinformerFullName: "",
            errinformerMembership: "",
            errinformerAddress: "",
            errinformerPhone: "",
            erraccLocation: "",
            erraccDescription: "",
            errisPublicInvolved: "",
            errisUrgent: "",


            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChangeCheckBox = this.handleChangeCheckBox(this)
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
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
        console.log(this.state.sceduledDate + ' ' + this.state.sceduledTime)   
    }

   
    handleClose = () => {
        this.setState({
            isSuccessAlertOpen: false
        })
    }
    clearAllFields = () => {
        this.setState({


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



    }


    componentWillMount() {

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

        fetch('http://localhost:8092/api/eed/getallet')
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
            //var isValid = this.formValidation();

            if (true) {
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
                                Accident Registry Form
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
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth

                                                        id="etDescription"
                                                        label="Full Name Of The Informer"
                                                        name="informerFullName"
                                                        autoComplete=""
                                                        value={this.state.informerFullName}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errinformerFullName}</div>

                                                </Grid>

                                                <Grid item xs={12}>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">Member of</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="informerMembership"
                                                        onChange={this.handleChange}
                                                        value={this.state.informerMembership}
                                                    >
                                                        <FormControlLabel value="Public" control={<Radio />} label="Public" />
                                                        <FormControlLabel value="Facility Staff" control={<Radio />} label="Facility Staff" />
                                                        <FormControlLabel value="Emergency Service" control={<Radio />} label="Emergency Service" />

                                                    </RadioGroup>
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errinformerMembership}</div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="informerAddress"
                                                        label="Organization or Address of Informer"
                                                        name="informerAddress"
                                                        autoComplete="exName"
                                                        value={this.state.informerAddress}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errinformerAddress}</div>

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="informerPhone"
                                                        label="Telephone Number of Informer"
                                                        name="informerPhone"
                                                        autoComplete="exName"
                                                        value={this.state.informerPhone}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errinformerPhone}</div>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="sceduledDate"
                                                        label="Informing Date"
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
                                                        label="Informing Time"
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
                                                        fullWidth
                                                        maxRows={5}
                                                        id="scenarioDes"
                                                        label="Accident Location"
                                                        name="accLocation"
                                                        autoComplete="accLocation"
                                                        value={this.state.accLocation}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div id='erretId' className={classes.errmsg}>{this.state.erraccLocation}</div>

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        multiline
                                                        fullWidth
                                                        maxRows={5}
                                                        id="scenarioDes"
                                                        label="Accident Description"
                                                        name="accDescription"
                                                        autoComplete="accLocation"
                                                        value={this.state.accDescription}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div id='erretId' className={classes.errmsg}>{this.state.erraccDescription}</div>

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">Public Involved</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="isPublicInvolved"
                                                        onChange={this.handleChange}
                                                        value={this.state.isPublicInvolved}
                                                    >
                                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="false" control={<Radio />} label="No" />

                                                    </RadioGroup>
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errisPublicInvolved}</div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">Dose the Situation Require Urgent Attention</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="isUrgent"
                                                        onChange={this.handleChange}
                                                        value={this.state.isUrgent}
                                                    >
                                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="false" control={<Radio />} label="No" />

                                                    </RadioGroup>
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errisUrgent}</div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        multiline
                                                        fullWidth
                                                        maxRows={5}
                                                        id="scenarioDes"
                                                        label="What Assistance Required"
                                                        name="assistanceDes"
                                                        autoComplete="assistanceDes"
                                                        value={this.state.assistanceDes}
                                                        onChange={this.handleChange}
                                                    />
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errassistanceDes}</div>

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
                                                    <p>Enter the Source Details :</p>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        multiline
                                                        required
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepOne"
                                                        label="Radionuclide (s)"
                                                        name="radionuclides"
                                                        autoComplete="radionuclides"
                                                        value={this.state.radionuclides}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">Sealed</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="sealedType"
                                                        onChange={this.handleChange}
                                                        value={this.state.sealedType}
                                                    >
                                                        <FormControlLabel value="Capsule" control={<Radio />} label="Capsule" />
                                                        <FormControlLabel value="Foil" control={<Radio />} label="Foil" />
                                                        <FormControlLabel value="Pencil" control={<Radio />} label="Pencil" />
                                                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                                                    </RadioGroup>
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errsealedType}</div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">Unsealed</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="sealedType"
                                                        onChange={this.handleChange}
                                                        value={this.state.sealedType}
                                                    >
                                                        <FormControlLabel value="Liquid" control={<Radio />} label="Liquid" />
                                                        <FormControlLabel value="Gas" control={<Radio />} label="Gas" />
                                                        <FormControlLabel value="Solid" control={<Radio />} label="Solid" />
                                                        <FormControlLabel value="Powder" control={<Radio />} label="Powder" />
                                                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                                                    </RadioGroup>
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errsealedType}</div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepThree"
                                                        label="Generators Volatage (kV)"
                                                        name="generatorsVolt"
                                                        autoComplete="instructionDescriptionTwoTwo"
                                                        value={this.state.generatorsVolt}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFour"
                                                        label="Generators Eletron Flow / Current (mA)"
                                                        name="generatorsAmp"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.generatorsAmp}
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
                                                    <FormLabel id="demo-row-radio-buttons-group-label">Location Type of Source</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="locationType"
                                                        onChange={this.handleChange}
                                                        value={this.state.locationType}
                                                    >
                                                        <FormControlLabel value="Facility" control={<Radio />} label="Facility" />
                                                        <FormControlLabel value="Laboratory" control={<Radio />} label="Laboratory" />
                                                        <FormControlLabel value="Office" control={<Radio />} label="Office" />
                                                        <FormControlLabel value="Public Place" control={<Radio />} label="Public Place" />
                                                    </RadioGroup>
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errsealedType}</div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <p>Type of the Equipment :</p>
                                                </Grid>

                                                <Grid item xs={4}>

                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Diagnostic Xray" name = "Diagnostic Xray"/>
                                                        <FormControlLabel control={<Checkbox />} label="Veterinary Xray" name = "Veterinary Xray"/>
                                                        <FormControlLabel control={<Checkbox />} label="Teletherapy" />
                                                        <FormControlLabel control={<Checkbox />} label="Brachytherapy" />
                                                        <FormControlLabel control={<Checkbox />} label="Nuclear Medicine" />
                                                        <FormControlLabel control={<Checkbox />} label="Baggage Inseption" />
                                                        <FormControlLabel control={<Checkbox />} label="Gamma Radiography" />
                                                        <FormControlLabel control={<Checkbox />} label="X Radiography" />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Irradicator" />
                                                        <FormControlLabel control={<Checkbox />} label="Thickness Gauge" />
                                                        <FormControlLabel control={<Checkbox />} label="Level Gauge" />
                                                        <FormControlLabel control={<Checkbox />} label="Density / Moisturegauge" />
                                                        <FormControlLabel control={<Checkbox />} label="Xray Optics" />
                                                        <FormControlLabel control={<Checkbox />} label="Unsealed Source" />
                                                        <FormControlLabel control={<Checkbox />} label="Smoke Detection" />
                                                        <FormControlLabel control={<Checkbox />} label="Static Eliminators" />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Lab Sealed Sources" />
                                                        <FormControlLabel control={<Checkbox />} label="Radioactive Waste" />
                                                        <FormControlLabel control={<Checkbox />} label="Tracer" />
                                                        <FormControlLabel control={<Checkbox />} label="Processing of Ore" />
                                                        <FormControlLabel control={<Checkbox />} label="Scrapmeful Recycling" />
                                                        <FormControlLabel control={<Checkbox />} label="Other" />
                                                        <FormControlLabel control={<Checkbox />} label="Unknown" />
                                                    </FormGroup>
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
                                                    <p>Nature of Emergencies :</p>
                                                </Grid>

                                                <Grid item xs={4}>

                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Found Source" />
                                                        <FormControlLabel control={<Checkbox />} label="Found Contamination" />
                                                        <FormControlLabel control={<Checkbox />} label="Unshielded Source" />
                                                        <FormControlLabel control={<Checkbox />} label="Damaged Source" />

                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Missing Source" />
                                                        <FormControlLabel control={<Checkbox />} label="Laboratory Spill" />
                                                        <FormControlLabel control={<Checkbox />} label="Transport" />
                                                        <FormControlLabel control={<Checkbox />} label="Dispersion of Activity" />

                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Illict Trafficking" />
                                                        <FormControlLabel control={<Checkbox />} label="Other" />
                                                        <FormControlLabel control={<Checkbox />} label="Unkown" />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        multiline
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFourteen"
                                                        label="How does Source Discovered"
                                                        name="srcDiscoveredStatus"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.srcDiscoveredStatus}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">Is Access Being Controlled</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="isControlled"
                                                        onChange={this.handleChange}
                                                        value={this.state.isControlled}
                                                    >
                                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                    <div id='erretId' className={classes.errmsg}>{this.state.errsealedType}</div>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        multiline
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFifteen"
                                                        label="Actions to Prevent Exposure"
                                                        name="preventionAction"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.preventionAction}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFifteen"
                                                        label="Last Time Source Known to be Safe"
                                                        name="lastTimeSafe"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.lastTimeSafe}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFifteen"
                                                        label="Where did the Source Come From"
                                                        name="srcOrigin"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.srcOrigin}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepFifteen"
                                                        label="Source Owner"
                                                        name="srcOwner"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.srcOwner}
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
                                                    <p>Radiological Hazards :</p>
                                                </Grid>

                                                <Grid item xs={6}>

                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Significant Radiondose (maybe)" />
                                                        <FormControlLabel control={<Checkbox />} label="Inhalution Hazards (maybe)" />
                                                        <FormControlLabel control={<Checkbox />} label="Contaminated District Areas (maybe)" />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={6}>

                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Release to the Environment (maybe)" />
                                                        <FormControlLabel control={<Checkbox />} label="Potential for Disperson (maybe)" />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <p>Conventional Hazards :</p>
                                                </Grid>

                                                <Grid item xs={6}>

                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Fire" />
                                                        <FormControlLabel control={<Checkbox />} label="Expolsive" />
                                                        <FormControlLabel control={<Checkbox />} label="Chemicals" />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={6}>

                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Vapour and Fumes" />
                                                        <FormControlLabel control={<Checkbox />} label="Unknown" />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <p>Medical Effects : </p>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepEighteen"
                                                        label="Injured Individuals"
                                                        name="injuredPerson"
                                                        autoComplete="instructionDescriptionTwo"
                                                        value={this.state.injuredPerson}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepNineteen"
                                                        label="Deaths"
                                                        name="deaths"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.deaths}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepTwenty"
                                                        label="Exposed Individuls"
                                                        name="exposedIndividuals"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.exposedIndividuals}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="stepTwenty"
                                                        label="Contaminated Individuals"
                                                        name="contaminatedIndividuals"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.contaminatedIndividuals}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <p>Challenges to Monitoriny :</p>
                                                </Grid>

                                                <Grid item xs={6}>

                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Explosive Atmosphere" />
                                                        <FormControlLabel control={<Checkbox />} label="RF" />
                                                        <FormControlLabel control={<Checkbox />} label="Static" />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={6}>

                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox />} label="Water" />
                                                        <FormControlLabel control={<Checkbox />} label="Other" />
                                                    </FormGroup>
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
AccidentReport = withStyles(styles)(AccidentReport);
export default withRouter(AccidentReport);