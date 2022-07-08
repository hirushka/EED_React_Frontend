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

import DownloadIcon from '@mui/icons-material/Download';
import img from '../../assets/GGG.png'

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
    // position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '80%'
};
class InstructionDisplay extends React.Component {
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
            isModalDownloadOpen: false,
            threatcatList: [],
            locationList: [],
            emegencyLevelList: [],
            tcName: "",
            lvName: "",
            lcName: "",
            todayDate: Date().toLocaleString(),
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleOpenAdd = this.handleOpenAdd.bind(this)
        this.handleOpenDownload = this.handleOpenDownload.bind(this)
        this.handlePrint = this.handlePrint.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.accName)
        let queryString = "/" + this.state.accName
        const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
        fetch('http://localhost:8092/api/eed/getaccbyname' + queryString,{headers})
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
    handleOpenAdd = (row) => {
        const { history } = this.props;
        //history.push('./addinstr')
        console.log(row)
        let queryString = "/" + row.id
        const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
        fetch('http://localhost:8092/api/eed/getinstracc' + queryString, {headers})
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

    handleOpenDownload = (row) => {

        this.clearAllFields();
        console.log(row)
        this.setState({
            accName: row.accName,
            accDescription: row.accDescription,
            tcName: row.tcName,
            lvName: row.lvName,
            lcName: row.lcName
        })
        let queryString = "/" + row.id
        const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
        fetch('http://localhost:8092/api/eed/getinstracc' + queryString, {headers})
            .then(response => 
                 response.json()
            )
            .then(data => {
                console.log(data);
                if (data != null) {                  
                    this.setState({
                        instructionTitleOne: data.instructionTitleOne,
                        instructionDescriptionOneOne: data.instructionDescriptionOneOne,
                        instructionDescriptionOneTwo: data.instructionDescriptionOneTwo,
                        instructionDescriptionOneThree: data.instructionDescriptionOneThree,
                        instructionDescriptionOneFour: data.instructionDescriptionOneFour,
                        instructionDescriptionOneFive: data.instructionDescriptionOneFive,
                        instructionTitleTwo: data.instructionTitleTwo,
                        instructionDescriptionTwoOne: data.instructionDescriptionTwoOne,
                        instructionDescriptionTwoTwo: data.instructionDescriptionTwoTwo,
                        instructionDescriptionTwoThree: data.instructionDescriptionTwoThree,
                        instructionDescriptionTwoFour: data.instructionDescriptionTwoFour,
                        instructionDescriptionTwoFive: data.instructionDescriptionTwoFive,
                        instructionTitleThree: data.instructionTitleThree,
                        instructionDescriptionThreeOne: data.instructionDescriptionThreeOne,
                        instructionDescriptionThreeTwo: data.instructionDescriptionThreeTwo,
                        instructionDescriptionThreeThree: data.instructionDescriptionThreeThree,
                        instructionDescriptionThreeFour: data.instructionDescriptionThreeFour,
                        instructionDescriptionThreeFive: data.instructionDescriptionThreeFive,
                    })

                } else {
                    console.log("NO DATA")

                }
            }).then(() => {
                let queryString = "/" + row.id
                const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
                fetch('http://localhost:8092/api/eed/mindis' + queryString, {headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {

                            this.setState({
                                minDistance: data.minDistance,
                                isModalDownloadOpen: true,
                                accName: row.accName,
                                accDescription: row.accDescription,
                                
                            })

                        } else {
                            console.log("NO DATA")

                        }
                    })
            })
        



    }

    handleOpen = (row) => {
        this.clearAllFields();
        console.log(row)
        let queryString = "/" + row.id
        const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
        fetch('http://localhost:8092/api/eed/getinstracc' + queryString,{headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {

                    this.setState({
                        instructionTitleOne: data.instructionTitleOne,
                        instructionDescriptionOneOne: data.instructionDescriptionOneOne,
                        instructionDescriptionOneTwo: data.instructionDescriptionOneTwo,
                        instructionDescriptionOneThree: data.instructionDescriptionOneThree,
                        instructionDescriptionOneFour: data.instructionDescriptionOneFour,
                        instructionDescriptionOneFive: data.instructionDescriptionOneFive,
                        instructionTitleTwo: data.instructionTitleTwo,
                        instructionDescriptionTwoOne: data.instructionDescriptionTwoOne,
                        instructionDescriptionTwoTwo: data.instructionDescriptionTwoTwo,
                        instructionDescriptionTwoThree: data.instructionDescriptionTwoThree,
                        instructionDescriptionTwoFour: data.instructionDescriptionTwoFour,
                        instructionDescriptionTwoFive: data.instructionDescriptionTwoFive,
                        instructionTitleThree: data.instructionTitleThree,
                        instructionDescriptionThreeOne: data.instructionDescriptionThreeOne,
                        instructionDescriptionThreeTwo: data.instructionDescriptionThreeTwo,
                        instructionDescriptionThreeThree: data.instructionDescriptionThreeThree,
                        instructionDescriptionThreeFour: data.instructionDescriptionThreeFour,
                        instructionDescriptionThreeFive: data.instructionDescriptionThreeFive,
                    })

                } else {
                    console.log("NO DATA")

                }
            }).then(() => {
                let queryString = "/" + row.id
                const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
                fetch('http://localhost:8092/api/eed/mindis' + queryString,{headers})
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
            isModalOpen: false,
            isModalDownloadOpen: false,
        })
    }
    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })


    }
    handlePrint(event) {
        event.preventDefault();
        var mywindow = window.open('', 'PRINT', 'height=600,width=1000');
        mywindow.document.write('<html> <body>');
        mywindow.document.write('<div class-"container">');
        mywindow.document.write('<div class-"row">');
        mywindow.document.write('<div class-"col-4">');
        mywindow.document.write('Date : <strong>' + this.state.todayDate + '</strong>');
        mywindow.document.write(' <center>  <img src=" ' + img + '"/>');
        mywindow.document.write('</div>');
        mywindow.document.write('<div class-"col-4" style="margin-left:90mm;margin-top:-6mm;">');
        mywindow.document.write('</div>');
        mywindow.document.write('<div class="clearfix"></div>');
        mywindow.document.write('<div class-"col-4">');
        mywindow.document.write('<br/><br/></div>');
        mywindow.document.write('</div>');
        mywindow.document.write('</div>');
        mywindow.document.write(document.getElementById("printContent").innerHTML);
        mywindow.document.write('</body></html>');
        setTimeout(
            function () {
                mywindow.document.close(); // necessary for IE >= 10
                mywindow.focus(); // necessary for IE >= 10*/

                mywindow.print();
                //mywindow.close();
            }, 3000);
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
        fetch('http://localhost:8092/api/eed/emelevel',{headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    console.log(data)
                    this.setState({
                        emegencyLevelList: data
                    })
                }
            }).then(
                fetch('http://localhost:8092/api/eed/location',{headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {
                            this.setState({
                                locationList: data
                            })
                        }
                    })
            ).then(
                fetch('http://localhost:8092/api/eed/threatcat',{headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {
                            this.setState({
                                threatcatList: data
                            })
                        }
                    })
            ).then(
                fetch('http://localhost:8092/api/eed/getallacc',{headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {
                            this.setState({
                                accList: data
                            }, () => {
                                
                                var b = this.state.threatcatList;
                                var c = this.state.emegencyLevelList;
                                var d = this.state.locationList;
                                var bMap = b.reduce((map, item) => map.set(item.id, item.category), new Map);
                                var cMap = c.reduce((map, item) => map.set(item.id, item.levelName), new Map);
                                var dMap = d.reduce((map, item) => map.set(item.id, item.locationName), new Map);

                                var result = this.state.accList.map((item) => (Object.assign({
                                    tcName: bMap.get(item.tcId)
                                }, item)));
                                var result = result.map((item) => (Object.assign({
                                    lvName: cMap.get(item.lvId)
                                }, item)));
                                var newList = result.map((item) => (Object.assign({
                                    lcName: dMap.get(item.lcId)
                                }, item)));
                                console.log("newList", newList);
                                //  console.log("newAccList", newAccList)
                                this.setState({
                                    accList: newList
                                })
                            })
                        }
                    })
            )







    }

    render() {
        const { classes } = this.props;
        
    const username = sessionStorage.getItem("username")
    const roleId = sessionStorage.getItem("roleId")
        return (
            <div>
                <Card style={{ marginTop: 30 }}>
                    <CardContent>


                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <PlaylistAddCheckIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Instruction Registry
                            </Typography>

                        </div>

                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2}>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={2}>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
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
                                            </Grid>
                                            <Grid item xs={12} sm={3}  >
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}

                                                >
                                                    Search
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                    <TableContainer>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><strong>Accident Name</strong></TableCell>
                                                    <TableCell align="right"><strong>Accident Description</strong></TableCell>
                                                    <TableCell align="right"><strong>View</strong> </TableCell>
                                                    <TableCell align="right"><strong>Add</strong> </TableCell>
                                                    <TableCell align="right"><strong>Report Generate</strong> </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.accList.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.accName}
                                                        </TableCell>
                                                        <TableCell align="right">{row.accDescription}</TableCell>
                                                        <TableCell align="right">
                                                            <IconButton aria-label="delete">
                                                                <VisibilityIcon onClick={() => { this.handleOpen(row) }} />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <IconButton aria-label="delete"  disabled = {(roleId !== "1")?true:false}>
                                                                <AddCircleIcon onClick={() => { this.handleOpenAdd(row) }} />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <IconButton aria-label="delete">
                                                                <DownloadIcon onClick={() => { this.handleOpenDownload(row) }} />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </Grid>
                                <Grid item xs={12} sm={2}>
                                </Grid>
                            </Grid>
                        </Box>


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

                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 300,
                                '& ul': { padding: 0 },
                            }}
                            subheader={<li />}
                        >
                            <ListSubheader><strong>{this.state.instructionTitleOne === "" ? "Title" : this.state.instructionTitleOne}</strong></ListSubheader>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionOneOne === "" ? "No Data Available" : this.state.instructionDescriptionOneOne} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionOneTwo} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionOneThree} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionOneFour} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionOneFive} />
                            </ListItem>
                            <ListSubheader><strong>{this.state.instructionTitleTwo === "" ? "Title" : this.state.instructionTitleTwo}</strong></ListSubheader>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionTwoOne === "" ? "No Data Available" : this.state.instructionDescriptionTwoOne} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionTwoTwo} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionTwoThree} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionTwoFour} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionTwoFive} />
                            </ListItem>
                            <ListSubheader><strong>{this.state.instructionTitleThree === "" ? "Title" : this.state.instructionTitleThree}</strong></ListSubheader>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionThreeOne === "" ? "No Data Available" : this.state.instructionDescriptionThreeOne} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionThreeTwo} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionThreeThree} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionThreeFour} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary={this.state.instructionDescriptionThreeFive} />
                            </ListItem>
                            <ListSubheader ><strong>Minimum Safety Distance (m)</strong></ListSubheader>
                            <ListItem>
                                <ListItemText primary={this.state.minDistance == 0 ? "No Data Available" : this.state.minDistance} />
                            </ListItem>
                        </List>
                    </Box>
                </Modal>

                <Modal
                    open={this.state.isModalDownloadOpen}
                    onClose={this.handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography component="h1" variant="h5">
                            Report Builder
                        </Typography>
                        <div id="printContent">
                          
                            <Typography component="h2" variant="h5">
                                <center>Emergency Instruction Report</center>
                            </Typography>
                            <br /><br />
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={4}></Grid>
                                <Grid item xs={12} sm={4}>
                                    <table>
                                        <tr>
                                            <td><strong>Accident Name : </strong></td>
                                            <td>{this.state.accName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Accident Description : </strong></td>
                                            <td>{this.state.accDescription}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Threat Category : </strong></td>
                                            <td>{this.state.tcName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Emergency Level : </strong></td>
                                            <td>{this.state.lvName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Location : </strong></td>
                                            <td>{this.state.lcName}</td>
                                        </tr>
                                    </table>
                                </Grid>
                                <Grid item xs={12} sm={4}></Grid>
                            </Grid>
                            <List>
                                <ListSubheader><strong>{this.state.instructionTitleOne === "" ? "Title" : this.state.instructionTitleOne}</strong></ListSubheader>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionOneOne === "" ? "No Data Available" : this.state.instructionDescriptionOneOne} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionOneTwo} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionOneThree} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionOneFour} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionOneFive} />
                                </ListItem>
                                <ListSubheader><strong>{this.state.instructionTitleTwo === "" ? "Title" : this.state.instructionTitleTwo}</strong></ListSubheader>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionTwoOne === "" ? "No Data Available" : this.state.instructionDescriptionTwoOne} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionTwoTwo} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionTwoThree} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionTwoFour} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionTwoFive} />
                                </ListItem>
                                <ListSubheader><strong>{this.state.instructionTitleThree === "" ? "Title" : this.state.instructionTitleThree}</strong></ListSubheader>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionThreeOne === "" ? "No Data Available" : this.state.instructionDescriptionThreeOne} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionThreeTwo} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionThreeThree} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionThreeFour} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary={this.state.instructionDescriptionThreeFive} />
                                </ListItem>
                                <ListSubheader ><strong>Minimum Safety Distance (m)</strong></ListSubheader>
                                <ListItem>
                                    <ListItemText primary={this.state.minDistance == 0 ? "No Data Available" : this.state.minDistance} />
                                </ListItem>
                            </List>

                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={10}></Grid>
                            <Grid item xs={12} sm={2}>
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

                    </Box>

                </Modal>
            </div >
        )
    }

}
InstructionDisplay = withStyles(styles)(InstructionDisplay);
export default withRouter(InstructionDisplay);
