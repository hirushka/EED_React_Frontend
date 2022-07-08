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
    }
});

const sections = [
    { title: 'Step 1', onClick: () => this.setState({ currentPage: 1 }) },
    { title: 'Step 2', onClick: () => this.setState({ currentPage: 2 }) },
    { title: 'Step 3', onClick: () => this.setState({ currentPage: 3 }) },
    { title: 'Step 4', onClick: () => this.setState({ currentPage: 4 }) }
];
class AddInstruction extends React.Component {
    constructor() {
        super()
        this.state = {
            accName: "",
            accDescription: "",
            tcId: -1,
            lvId: -1,
            lcId: -1,
            emegencyLevelList: [],
            locationList: [],
            threatcatList: [],
            isSuccessAlertOpen: false,
            instructionTitleOne: "",
            instructionDescriptionOneOne: "",
            instructionDescriptionOneTwo: "",
            instructionDescriptionOneThree: "",
            instructionDescriptionOneFour: "",
            instructionDescriptionOneFive: "",
            instructionTitleTwo: "",
            instructionDescriptionTwoOne: "",
            instructionDescriptionTwoTwo: "",
            instructionDescriptionTwoThree: "",
            instructionDescriptionTwoFour: "",
            instructionDescriptionTwoFive: "",
            instructionTitleThree: "",
            instructionDescriptionThreeOne: "",
            instructionDescriptionThreeTwo: "",
            instructionDescriptionThreeThree: "",
            instructionDescriptionThreeFour: "",
            instructionDescriptionThreeFive: "",
            minDistance: 0,
            currentPage: 1,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }
    handleClose = () => {
        this.setState({
            isSuccessAlertOpen: false
        })
    }
    clearAllFields = () => {
        this.setState({
            accId: 0,
            accName: "",
            instructionTitleOne: "",
            instructionDescriptionOneOne: "",
            instructionDescriptionOneTwo: "",
            instructionDescriptionOneThree: "",
            instructionDescriptionOneFour: "",
            instructionDescriptionOneFive: "",
            instructionTitleTwo: "",
            instructionDescriptionTwoOne: "",
            instructionDescriptionTwoTwo: "",
            instructionDescriptionTwoThree: "",
            instructionDescriptionTwoFour: "",
            instructionDescriptionTwoFive: "",
            instructionTitleThree: "",
            instructionDescriptionThreeOne: "",
            instructionDescriptionThreeTwo: "",
            instructionDescriptionThreeThree: "",
            instructionDescriptionThreeFour: "",
            instructionDescriptionThreeFive: "",
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8092/api/eed/addinstr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.accessToken,
            },

            body: JSON.stringify({
                accId: this.state.accId,
                instructionTitleOne: this.state.instructionTitleOne,
                instructionDescriptionOneOne: this.state.instructionDescriptionOneOne,
                instructionDescriptionOneTwo: this.state.instructionDescriptionOneTwo,
                instructionDescriptionOneThree: this.state.instructionDescriptionOneThree,
                instructionDescriptionOneFour: this.state.instructionDescriptionOneFour,
                instructionDescriptionOneFive: this.state.instructionDescriptionOneFive,
                instructionTitleTwo: this.state.instructionTitleTwo,
                instructionDescriptionTwoOne: this.state.instructionDescriptionTwoOne,
                instructionDescriptionTwoTwo: this.state.instructionDescriptionTwoTwo,
                instructionDescriptionTwoThree: this.state.instructionDescriptionTwoThree,
                instructionDescriptionTwoFour: this.state.instructionDescriptionTwoFour,
                instructionDescriptionTwoFive: this.state.instructionDescriptionTwoFive,
                instructionTitleThree: this.state.instructionTitleThree,
                instructionDescriptionThreeOne: this.state.instructionDescriptionThreeOne,
                instructionDescriptionThreeTwo: this.state.instructionDescriptionThreeTwo,
                instructionDescriptionThreeThree: this.state.instructionDescriptionThreeThree,
                instructionDescriptionThreeFour: this.state.instructionDescriptionThreeFour,
                instructionDescriptionThreeFive: this.state.instructionDescriptionThreeFive,
            }),
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log("SUCESS");
                //history.push('./acctypes')

                fetch('http://localhost:8092/api/eed/addmindis', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.state.accessToken,
                    },

                    body: JSON.stringify({
                        accId: this.state.accId,
                        minDistance: this.state.minDistance
                    }),
                }).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log("SUCESS");
                        //history.push('./acctypes')
                        this.setState({
                            isSuccessAlertOpen: true
                        })
                        this.clearAllFields();
                    }
                })


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

       
        this.setState({
            accId: this.props.location.state.accId,
            accName: this.props.location.state.accName,
        })
    }

    next = () => {
        console.log(this.state.currentPage)
        this.setState((prev) => {
            return {
                ...prev,
                currentPage: prev.currentPage + 1
            }
        }, () => {
            console.log(this.state.currentPage)
        })
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
                    <Container component="main" maxWidth="xs">

                        <Box sx={{ '& > :not(style)': { m: 1 } }} display="flex" justifyContent="flex-end">
                            <Fab size="small" aria-label="add" component={Link} to={'/instr'} >
                                <PlaylistAddCheckIcon />
                            </Fab>

                        </Box>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <PlaylistAddIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Instruction Registry
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
                                                <Grid item xs={12} >
                                                    <TextField
                                                        autoComplete="accName"
                                                        name="accName"
                                                        value={this.state.accName}
                                                        required
                                                        fullWidth
                                                        id="accName"
                                                        label="Accident Name"
                                                        autoFocus
                                                        onChange={this.handleChange}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionTitleOne"
                                                        label="Instruction Title I"
                                                        name="instructionTitleOne"
                                                        autoComplete="instructionTitle"
                                                        value={this.state.instructionTitleOne}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionOneOne"
                                                        label="Instruction Description I"
                                                        name="instructionDescriptionOneOne"
                                                        autoComplete="instructionDescriptionOneOne"
                                                        value={this.state.instructionDescriptionOneOne}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionOneTwo"
                                                        label="Instruction Description II"
                                                        name="instructionDescriptionOneTwo"
                                                        autoComplete="instructionDescriptionOneTwo"
                                                        value={this.state.instructionDescriptionOneTwo}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionThree"
                                                        label="Instruction Description III"
                                                        name="instructionDescriptionOneThree"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.instructionDescriptionOneThree}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionFour"
                                                        label="Instruction Description IV"
                                                        name="instructionDescriptionOneFour"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.instructionDescriptionOneFour}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionFive"
                                                        label="Instruction Description V"
                                                        name="instructionDescriptionOneFive"
                                                        autoComplete="instructionDescriptionFive"
                                                        value={this.state.instructionDescriptionOneFive}
                                                        onChange={this.handleChange}
                                                    />
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
                                                        id="instructionTitleTwo"
                                                        label="Instruction Title II"
                                                        name="instructionTitleTwo"
                                                        autoComplete="instructionTitleTwo"
                                                        value={this.state.instructionTitleTwo}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionOne"
                                                        label="Instruction Description I"
                                                        name="instructionDescriptionTwoOne"
                                                        autoComplete="instructionDescriptionTwoOne"
                                                        value={this.state.instructionDescriptionTwoOne}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionTwo"
                                                        label="Instruction Description II"
                                                        name="instructionDescriptionTwoTwo"
                                                        autoComplete="instructionDescriptionTwoTwo"
                                                        value={this.state.instructionDescriptionTwoTwo}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionThree"
                                                        label="Instruction Description III"
                                                        name="instructionDescriptionTwoThree"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.instructionDescriptionTwoThree}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionFour"
                                                        label="Instruction Description IV"
                                                        name="instructionDescriptionTwoFour"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.instructionDescriptionTwoFour}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionFive"
                                                        label="Instruction Description V"
                                                        name="instructionDescriptionTwoFive"
                                                        autoComplete="instructionDescriptionFive"
                                                        value={this.state.instructionDescriptionTwoFive}
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
                                                        id="instructionTitleThree"
                                                        label="Instruction Title III" 
                                                        name="instructionTitleThree"
                                                        autoComplete="instructionTitleThree"
                                                        value={this.state.instructionTitleThree}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionOne"
                                                        label="Instruction Description I"
                                                        name="instructionDescriptionThreeOne"
                                                        autoComplete="instructionDescriptionThreeOne"
                                                        value={this.state.instructionDescriptionThreeOne}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionTwo"
                                                        label="Instruction Description II"
                                                        name="instructionDescriptionThreeTwo"
                                                        autoComplete="instructionDescriptionTwo"
                                                        value={this.state.instructionDescriptionThreeTwo}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionThree"
                                                        label="Instruction Description III"
                                                        name="instructionDescriptionThreeThree"
                                                        autoComplete="instructionDescriptionThree"
                                                        value={this.state.instructionDescriptionThreeThree}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionFour"
                                                        label="Instruction Description IV"
                                                        name="instructionDescriptionThreeFour"
                                                        autoComplete="instructionDescriptionFour"
                                                        value={this.state.instructionDescriptionThreeFour}
                                                        onChange={this.handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        maxRows={4}
                                                        id="instructionDescriptionFive"
                                                        label="Instruction Description V"
                                                        name="instructionDescriptionThreeFive"
                                                        autoComplete="instructionDescriptionFive"
                                                        value={this.state.instructionDescriptionThreeFive}
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
                                                <Grid item xs={6}>
                                                    <TextField

                                                        fullWidth
                                                        required
                                                        id="minDistance"
                                                        label="Minimum Safety Distance (m)"
                                                        name="minDistance"
                                                        autoComplete="minDistance"
                                                        value={this.state.minDistance}
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
                                Instructions Add Successfully.
                            </Alert>

                        </Dialog>
                    </Container>
                </Card>

            </div>
        )
    }
}
AddInstruction = withStyles(styles)(AddInstruction);
export default withRouter(AddInstruction);