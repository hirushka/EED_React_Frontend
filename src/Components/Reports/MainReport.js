import React from "react";
import { makeStyles, withStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { withRouter } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const styles = theme => ({
    paper: {
        marginTop: 10,
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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
class MainReport extends React.Component {
    constructor() {
        super()
        this.state = {
            accList: [],
            tcId: -1,
            lvId: -1,
            lcId: -1,
            id: 0,
            accName: "",
            emegencyLevelList: [],
            locationList: [],
            threatcatList: [],
            instructionList: [],
            isErrorAlertOpen: false,
            isModalOpen: false,
            instructionObj: "",
            minDisObj: "",
            minDistance: 0,
            isInstrExist: false,
            instructionTitle: "",
            instructionDescriptionOne: "",
            instructionDescriptionTwo: "",
            instructionDescriptionThree: "",
            instructionDescriptionFour: "",
            instructionDescriptionFive: "",
            selectAcc: true,
            selectActivity: false,
            selectSafetyDis: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleOpenAdd = this.handleOpenAdd.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.accName)
        let queryString = "/" + this.state.accName
        fetch('http://localhost:8092/api/eed/getaccbyname' + queryString)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    this.clearAllFields()
                    this.setState({
                        accList: data
                    })
                    if (data.length == 0) {
                        this.setState({
                            isErrorAlertOpen: true
                        })
                    }
                } else {
                    console.log("NO DATA")

                }
            })



    }
    clearAllFields = () => {
        this.setState({
            accName: "",
            minDistance: 0,
            isInstrExist: false,
            instructionTitle: "",
            instructionDescriptionOne: "",
            instructionDescriptionTwo: "",
            instructionDescriptionThree: "",
            instructionDescriptionFour: "",
            instructionDescriptionFive: ""

        })
    }
    handleOpenAdd = (row) => {
        const { history } = this.props;
        //history.push('./addinstr')
        console.log(row)
        let queryString = "/" + row.id
        fetch('http://localhost:8092/api/eed/getinstracc' + queryString)
            .then(response => response.text())

            .then(data => {
                console.log(data);
                if (data != null || data != "undefined") {
                    if (data == "") {
                        console.log("NO DATA ADD")
                        history.push({
                            pathname: '/addinstr',
                            state: {
                                accId: row.id,
                                accName: row.accName
                            },
                        });
                    } else {
                        this.setState({
                            isInstrExist: true
                        })
                    }

                } else {
                    console.log("NO DATA")

                }
            })



    }
    handleOpen = (row) => {
        this.clearAllFields();
        console.log(row)
        let queryString = "/" + row.id
        fetch('http://localhost:8092/api/eed/getinstracc' + queryString)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {

                    this.setState({
                        instructionTitle: data.instructionTitle,
                        instructionDescriptionOne: data.instructionDescriptionOne,
                        instructionDescriptionTwo: data.instructionDescriptionTwo,
                        instructionDescriptionThree: data.instructionDescriptionThree,
                        instructionDescriptionFour: data.instructionDescriptionFour,
                        instructionDescriptionFive: data.instructionDescriptionFive
                    })

                } else {
                    console.log("NO DATA")

                }
            }).then(() => {
                let queryString = "/" + row.id
                fetch('http://localhost:8092/api/eed/mindis' + queryString)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {

                            this.setState({
                                minDistance: data.minDistance
                            })

                        } else {
                            console.log("NO DATA")

                        }
                    })
            })
        this.setState({
            isModalOpen: true
        })

    }
    handleClose = () => {
        this.setState({
            isErrorAlertOpen: false,
            isInstrExist: false
        })
    }
    handleCloseModal = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })     

    }

    componentWillMount() {

       
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card style={{ marginTop: 10 }}>
                    <CardContent>


                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <PlaylistAddCheckIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Report Builder
                            </Typography>

                        </div >

                        <Card className={classes.paper}>
                            <CardContent>
                                <h4><strong>Includable Items</strong></h4>

                                <div>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox  type= "checkbox" name="selectAcc" checked={this.state.selectAcc} onChange={this.handleChange} />} label="Last Searched Accident And Instructions" />
                                        <FormControlLabel control={<Checkbox  type= "checkbox" name="selectActivity" checked={this.state.selectActivity} onChange={this.handleChange} />} label="Current Activity Of The Source" />
                                        <FormControlLabel control={<Checkbox  type= "checkbox" name="selectSafetyDis" checked={this.state.selectSafetyDis} onChange={this.handleChange} />} label="Accuarate Safety Distance" />
                                    </FormGroup>
                                </div>
                                <Grid container spacing={2}>
                            <Grid item xs={12} sm={10}></Grid>
                            <Grid item xs={12} sm={2}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    value="Print"
                                    fullwidth
                                    className={classes.submit}
                                    onClick={()=>{this.setState({
                                        isModalOpen:true
                                    })}}
                                >
                                    Generate Report
                                </Button>
                            </Grid>

                        </Grid>

                            </CardContent>
                        </Card>


                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.isErrorAlertOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >


                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        No Data Available.
                    </Alert>

                </Dialog>
                <Dialog
                    open={this.state.isInstrExist}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >


                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Instruction Exist Already. Select View to View Instructions.
                    </Alert>

                </Dialog>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography component="h1" variant="h5">
                            Instruction Registry
                        </Typography>


                        <List
                            sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 300,
                                '& ul': { padding: 0 },
                            }}
                            subheader={<li />}
                        >
                            <ListSubheader><strong>{this.state.instructionTitle === "" ? "Title" : this.state.instructionTitle}</strong></ListSubheader>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionOne === "" ? "No Data Available" : this.state.instructionDescriptionOne} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionTwo} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionThree} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionFour} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionFive} />
                            </ListItem>
                            <ListSubheader ><strong>Minimum Safety Distance</strong></ListSubheader>
                            <ListItem>
                                <ListItemText primary={this.state.minDistance == 0 ? "No Data Available" : this.state.minDistance} />
                            </ListItem>
                        </List>
                    </Box>
                </Modal>
            </div >
        )
    }

}
MainReport = withStyles(styles)(MainReport);
export default withRouter(MainReport);
