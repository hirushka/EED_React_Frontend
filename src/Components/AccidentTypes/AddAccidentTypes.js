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
import FormControl from '@mui/material/FormControl';
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
    },
    errmsg:{
        color:'red',
        fontSize: 12,   
    },
});
class AddAccidentTypes extends React.Component {
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
            erraccName:"",
            erraccDescription:"",
            errlvId:"",
            errlcId:"",
            accessToken:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
        this.setState({
            erraccName:"",
            erraccDescription:"",
            errlvId:"",
            errlcId:""
        })
    }
    handleClose = () => {
        this.setState({
            isSuccessAlertOpen: false
        })
    }
    clearAllFields = () => {
        this.setState({
            accName: "",
            accDescription: "",
            tcId: -1,
            lvId: -1,
            lcId: -1,
            erraccName:"",
            erraccDescription:"",
            errlvId:"",
            errlcId:"",
            
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { history } = this.props;

        var isValid = this.formValidation();
        if(isValid){
            fetch('http://localhost:8092/api/eed/addacc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.accessToken,
                },
    
                body: JSON.stringify({
                    accName: this.state.accName,
                    accDescription: this.state.accDescription,
                    tcId: this.state.tcId,
                    lvId: this.state.lvId,
                    lcId: this.state.lcId,
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
                .catch(function (error) {
                    console.log(error);
                });
    
           
    
        }

       

    }

    formValidation(){
        var isValid = true;

        if(this.state.accName === ""){
            isValid = false;
            this.setState({
                erraccName:"Please Give a Accident Name."
            })
        }

        if(this.state.accDescription === ""){
            isValid = false;
            this.setState({
                erraccDescription:"Please Give a Accident Description."
            })
        }
        if(this.state.lcId == -1){
            isValid = false;
            this.setState({
                errlcId:"Please Select a Location."
            })
        }

        if(this.state.lvId == -1){
            isValid = false;
            this.setState({
                errlvId:"Please Select a Emergency Level."
            })
        }

        return isValid;
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
        fetch('http://localhost:8092/api/eed/emelevel', {headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    this.setState({
                        emegencyLevelList: data
                    })
                }
            })

        fetch('http://localhost:8092/api/eed/location' , {headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    this.setState({
                        locationList: data
                    })
                }
            })

        fetch('http://localhost:8092/api/eed/threatcat' , {headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    this.setState({
                        threatcatList: data
                    })
                }
            })

    }

    render() {
        const { classes } = this.props;

        return (

            <div>
                <Card style={{ marginTop: 30 }}>
                    <Container component="main" maxWidth="xs">

                        <Box sx={{ '& > :not(style)': { m: 1 } }} display="flex" justifyContent="flex-end">
                            <Fab size="small" aria-label="add" component={Link} to={'/acctypes'} >
                                <LibraryBooksIcon  />
                            </Fab>

                        </Box>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LibraryAddIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Emergency Registry
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                <Grid container spacing={2}>
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
                                        />
                                           <div id='' className={classes.errmsg}>{this.state.erraccName}</div>
                                
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            maxRows={4}
                                            id="accDescription"
                                            label="Accident Description"
                                            name="accDescription"
                                            autoComplete="accDescription"
                                            value={this.state.accDescription}
                                            onChange={this.handleChange}
                                        />
                                         <div id='' className={classes.errmsg}>{this.state.erraccDescription}</div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel id="demo-simple-select-label">Threat Category</InputLabel>
                                        <Select
                                            className={classes.select}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.tcId}
                                            onChange={this.handleChange}
                                            name="tcId"
                                        >
                                            <MenuItem value={-1}>-- Please Select a Threat Category --</MenuItem>
                                            {this.state.threatcatList.map((tc) => (
                                                <MenuItem value={tc.id}>{tc.category}</MenuItem>
                                            ))}
                                            
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel id="demo-simple-select-label"> Emergency Level</InputLabel>
                                        <Select
                                            className={classes.select}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.lvId}
                                            onChange={this.handleChange}
                                            name="lvId"
                                        >
                                            <MenuItem value={-1}>-- Please Select an Emergency Level --</MenuItem>
                                            {this.state.emegencyLevelList.map((em) => (
                                                <MenuItem value={em.id}>{em.levelName}</MenuItem>
                                            ))}
                                        </Select>
                                        <div id='' className={classes.errmsg}>{this.state.errlvId}</div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel id="demo-simple-select-label">Location Type</InputLabel>
                                        <Select
                                            className={classes.select}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.lcId}
                                            onChange={this.handleChange}
                                            name="lcId"
                                        >
                                            <MenuItem value={-1}>-- Please Select a Location Type --</MenuItem>
                                            {this.state.locationList.map((lc) => (
                                                <MenuItem value={lc.id}>{lc.locationName}</MenuItem>
                                            ))}
                                        </Select>
                                        <div id='' className={classes.errmsg}>{this.state.errlcId}</div>
                                    </Grid>


                                </Grid>

                                <br />
                                <Grid container spacing={2}>

                                <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Add
                                </Button>
                                </Grid>
                                <Grid item xs={6}>
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
                                </Grid>
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
                                Accident Type Create Successfully.
                            </Alert>

                        </Dialog>
                    </Container>
                </Card>

            </div>
        )
    }
}
AddAccidentTypes = withStyles(styles)(AddAccidentTypes);
export default withRouter(AddAccidentTypes);