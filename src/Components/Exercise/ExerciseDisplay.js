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
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

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
class ExersiceDisplay extends React.Component {
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
            taskList: [],
            currentPage: 1,
            currentSubPage: 1,
            qtaskList: [],
            staskList: [],
            isModalOpen: false,
            createdDate: "",
            sceduledDate: "",
            createdBy: "",
            toDate: Date().toLocaleString(),
            fromDate: Date().toLocaleString(),
            userList: [],
            drillName:"",
            firstName:"",
            lastName:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleQuickSearch = this.handleQuickSearch.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.toDate)

        const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
        let queryString = "/" + this.state.fromDate + "/" + this.state.toDate
        fetch('http://localhost:8092/api/eed/exlist' + queryString,{headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    // this.clearAllFields()
                    this.setState({
                        staskList: data
                    },()=>{
                        var b = this.state.exerciseTypeList;
                        var c = this.state.userList;
                        var bMap = b.reduce((map, item) => map.set(item.id, item.drillName), new Map);
                        var cMap = c.reduce((map, item) => map.set(item.id, item.firstName, item.lastName), new Map);

                        var result = this.state.staskList.map((item) => (Object.assign({
                            drillName: bMap.get(item.etId)
                        }, item)));
                        var newList = result.map((item) => (Object.assign({
                            firstName: cMap.get(item.createdBy),
                            lastName: cMap.get(item.createdBy)
                        }, item)));
                        console.log("newList", newList);
                        //  console.log("newAccList", newAccList)
                        this.setState({
                            staskList: newList
                        });
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

    handleOpen = (tsk) => {
        console.log(tsk)
        this.setState({
            exName: tsk.exName,
            etDescription: tsk.etDescription,
            etId: tsk.etId,
            scenarioDes: tsk.scenarioDes,
            stepOne: tsk.stepOne,
            stepTwo: tsk.stepTwo,
            stepThree: tsk.stepThree,
            stepFour: tsk.stepFour,
            stepFive: tsk.stepFive,
            stepSix: tsk.stepSix,
            stepSeven: tsk.stepSeven,
            stepEight: tsk.stepEight,
            stepNine: tsk.stepNine,
            stepTen: tsk.stepTen,
            stepEleven: tsk.stepEleven,
            stepTwelve: tsk.stepTwelve,
            stepThirteen: tsk.stepThirteen,
            stepFourteen: tsk.stepFourteen,
            stepFifteen: tsk.stepFifteen,
            stepSixteen: tsk.stepSixteen,
            stepSeventeen: tsk.stepSeventeen,
            stepEighteen: tsk.stepEighteen,
            stepNineteen: tsk.stepNineteen,
            stepTwenty: tsk.stepTwenty,
            createdDate: tsk.createdDate,
            sceduledDate: tsk.sceduledDate,
            createdBy: tsk.createdBy,
            drillName:tsk.drillName,
            firstName:tsk.firstName,
            lastName:tsk.lastName
            
        }, () => {
            this.setState({

                isModalOpen: true,
            })
        })
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

    handleQuickSearch(id) {

        this.setState({
            currentSubPage: id
        }, () => {

            var today = new Date(),
                currentdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();;

            if (this.state.currentSubPage == 1) {
                var date = new Date();
                date.setDate(date.getDate() - 1);
                var sentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                console.log(sentDate)

                const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
                fetch('http://localhost:8092/api/eed/exlist/' + sentDate + "/" + sentDate,{headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {
                            console.log(data)
                            this.setState({
                                qtaskList: data
                            },()=>{
                                var b = this.state.exerciseTypeList;
                                var c = this.state.userList;
                                var bMap = b.reduce((map, item) => map.set(item.id, item.drillName), new Map);
                                var cMap = c.reduce((map, item) => map.set(item.id, item.firstName, item.lastName), new Map);

                                var result = this.state.qtaskList.map((item) => (Object.assign({
                                    drillName: bMap.get(item.etId)
                                }, item)));
                                var newList = result.map((item) => (Object.assign({
                                    firstName: cMap.get(item.createdBy),
                                    lastName: cMap.get(item.createdBy)
                                }, item)));
                                console.log("newList", newList);
                                //  console.log("newAccList", newAccList)
                                this.setState({
                                    qtaskList: newList
                                }); 
                            })
                        }
                    })
            } else if (this.state.currentSubPage == 2) {
                var date = new Date();
                date.setDate(date.getDate() + 1);
                var sentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                console.log(sentDate)

                const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
                fetch('http://localhost:8092/api/eed/exlist/' + sentDate + "/" + sentDate,{headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {
                            console.log(data)
                            this.setState({
                                qtaskList: data
                            },()=>{
                                var b = this.state.exerciseTypeList;
                                var c = this.state.userList;
                                var bMap = b.reduce((map, item) => map.set(item.id, item.drillName), new Map);
                                var cMap = c.reduce((map, item) => map.set(item.id, item.firstName, item.lastName), new Map);

                                var result = this.state.qtaskList.map((item) => (Object.assign({
                                    drillName: bMap.get(item.etId)
                                }, item)));
                                var newList = result.map((item) => (Object.assign({
                                    firstName: cMap.get(item.createdBy),
                                    lastName: cMap.get(item.createdBy)
                                }, item)));
                                console.log("newList", newList);
                                //  console.log("newAccList", newAccList)
                                this.setState({
                                    qtaskList: newList
                                });
                            })
                        }
                    })
            } else if (this.state.currentSubPage == 3) {
                var curr = new Date; // get current date
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var last = first + 6; // last day is the first day + 6
                var firstday = new Date(curr.setDate(first));
                var lastday = new Date(curr.setDate(last));

                var sentDate1 = firstday.getFullYear() + '-' + (firstday.getMonth() + 1) + '-' + firstday.getDate();
                var sentDate2 = lastday.getFullYear() + '-' + (lastday.getMonth() + 1) + '-' + lastday.getDate();
                console.log(sentDate1, sentDate2)

                const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
                fetch('http://localhost:8092/api/eed/exlist/' + sentDate1 + "/" + sentDate2,{headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {
                            console.log(data)
                            this.setState({
                                qtaskList: data
                            },()=>{
                                var b = this.state.exerciseTypeList;
                                var c = this.state.userList;
                                var bMap = b.reduce((map, item) => map.set(item.id, item.drillName), new Map);
                                var cMap = c.reduce((map, item) => map.set(item.id, item.firstName, item.lastName), new Map);

                                var result = this.state.qtaskList.map((item) => (Object.assign({
                                    drillName: bMap.get(item.etId)
                                }, item)));
                                var newList = result.map((item) => (Object.assign({
                                    firstName: cMap.get(item.createdBy),
                                    lastName: cMap.get(item.createdBy)
                                }, item)));
                                console.log("newList", newList);
                                //  console.log("newAccList", newAccList)
                                this.setState({
                                    qtaskList: newList
                                });
                            })
                        }
                    })
            } else if (this.state.currentSubPage == 4) {
                var date = new Date();
                var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
                var lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                var sentDate1 = firstday.getFullYear() + '-' + (firstday.getMonth() + 1) + '-' + firstday.getDate();
                var sentDate2 = lastday.getFullYear() + '-' + (lastday.getMonth() + 1) + '-' + lastday.getDate();
                console.log(sentDate1, sentDate2)

                const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
                fetch('http://localhost:8092/api/eed/exlist/' + sentDate1 + "/" + sentDate2,{headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {
                            console.log(data)
                            this.setState({
                                qtaskList: data
                            },()=>{
                                var b = this.state.exerciseTypeList;
                                var c = this.state.userList;
                                var bMap = b.reduce((map, item) => map.set(item.id, item.drillName), new Map);
                                var cMap = c.reduce((map, item) => map.set(item.id, item.firstName, item.lastName), new Map);

                                var result = this.state.qtaskList.map((item) => (Object.assign({
                                    drillName: bMap.get(item.etId)
                                }, item)));
                                var newList = result.map((item) => (Object.assign({
                                    firstName: cMap.get(item.createdBy),
                                    lastName: cMap.get(item.createdBy)
                                }, item)));
                                console.log("newList", newList);
                                //  console.log("newAccList", newAccList)
                                this.setState({
                                    qtaskList: newList
                                });
                            })
                        }
                    })
            } else if (this.state.currentSubPage == 5) {

                var date = new Date();
                var firstday = new Date(date.getFullYear(), 0, 1);
                var lastday = new Date(date.getFullYear() + 1, 0, 0);
                var sentDate1 = firstday.getFullYear() + '-' + (firstday.getMonth() + 1) + '-' + firstday.getDate();
                var sentDate2 = lastday.getFullYear() + '-' + (lastday.getMonth() + 1) + '-' + lastday.getDate();
                console.log(sentDate1, sentDate2)

                const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
                fetch('http://localhost:8092/api/eed/exlist/' + sentDate1 + "/" + sentDate2,{headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {
                            console.log(data)
                            this.setState({
                                qtaskList: data
                            },()=>{
                                var b = this.state.exerciseTypeList;
                                var c = this.state.userList;
                                var bMap = b.reduce((map, item) => map.set(item.id, item.drillName), new Map);
                                var cMap = c.reduce((map, item) => map.set(item.id, item.firstName, item.lastName), new Map);

                                var result = this.state.qtaskList.map((item) => (Object.assign({
                                    drillName: bMap.get(item.etId)
                                }, item)));
                                var newList = result.map((item) => (Object.assign({
                                    firstName: cMap.get(item.createdBy),
                                    lastName: cMap.get(item.createdBy)
                                }, item)));
                                console.log("newList", newList);
                                //  console.log("newAccList", newAccList)
                                this.setState({
                                    qtaskList: newList
                                });
                            })
                        }
                    })
            } else {

            }
        })
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

        fetch('http://localhost:8092/api/eed/getud',{headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    this.setState({
                        userList: data
                    })
                }
            })
            .then(

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
            ).then(
                fetch('http://localhost:8092/api/eed/exdaily',{headers})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data != null) {
                            console.log(data)
                            this.setState({
                                taskList: data
                            }, () => {


                                var b = this.state.exerciseTypeList;
                                var c = this.state.userList;
                                var bMap = b.reduce((map, item) => map.set(item.id, item.drillName), new Map);
                                var cMap = c.reduce((map, item) => map.set(item.id, item.firstName, item.lastName), new Map);

                                var result = this.state.taskList.map((item) => (Object.assign({
                                    drillName: bMap.get(item.etId)
                                }, item)));
                                var newList = result.map((item) => (Object.assign({
                                    firstName: cMap.get(item.createdBy),
                                    lastName: cMap.get(item.createdBy)
                                }, item)));
                                console.log("newList", newList);
                                //  console.log("newAccList", newAccList)
                                this.setState({
                                    taskList: newList
                                });

                            })
                        }
                    })
            )





    }

    renderQuickSearchTaskList(taskList) {
        const { classes } = this.props;
        return (
            <div>
                <center><strong><h4>Search Excercises</h4></strong></center>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="button"
                            color="primary"
                            className={classes.submit}
                            onClick={() => { this.handleQuickSearch(1) }}
                        >
                            Yesterday
                        </Button>
                        <Button
                            type="button"
                            color="primary"
                            className={classes.submit}
                            onClick={() => { this.handleQuickSearch(2) }}
                        >
                            Tommorow
                        </Button>
                        <Button
                            type="button"

                            color="primary"
                            className={classes.submit}
                            onClick={() => { this.handleQuickSearch(3) }}
                        >
                            This Week
                        </Button>
                        <Button
                            type="button"

                            color="primary"
                            className={classes.submit}
                            onClick={() => { this.handleQuickSearch(4) }}
                        >
                            This Month
                        </Button>
                        <Button
                            type="button"

                            color="primary"
                            className={classes.submit}
                            onClick={() => { this.handleQuickSearch(5) }}
                        >
                            This Year
                        </Button>
                    </Grid>
                </Grid>

                <TableContainer  >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Exercise Name</strong></TableCell>
                                <TableCell><strong>Excercise Type</strong></TableCell>
                                <TableCell><strong>Sceduled Date and Time</strong></TableCell>
                                <TableCell><strong>Created Date</strong></TableCell>
                                <TableCell align="right"><strong>View</strong> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(taskList.length == 0) ?
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell> No Data Available</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>

                                </TableRow>

                                : taskList.map((tsk) => (

                                    <TableRow key={tsk.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{tsk.exName}</TableCell>
                                        <TableCell>{tsk.drillName}</TableCell>
                                        <TableCell>{tsk.sceduledDate}</TableCell>
                                        <TableCell>{tsk.createdDate}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete">
                                                <VisibilityIcon onClick={() => { this.handleOpen(tsk) }} />
                                            </IconButton>
                                        </TableCell>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>
        )
    }

    renderTodayTaskList(taskList) {
        const { classes } = this.props;
        return (
            <div>
                <center><strong><h4>Today Excercises</h4></strong></center>
                {(taskList.length == 0) ? <Card>
                    <CardContent>
                        <p>No Today Excersices Scduled.</p>
                    </CardContent>
                </Card>

                    : taskList.map((tsk, index) => (

                        <Card>
                            <CardContent>

                                <TableContainer  >
                                    <Table aria-label="simple table">
                                        <TableRow>
                                            <TableHead><center><strong>{index + 1}.</strong></center></TableHead>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell ><strong>Exercise Name :</strong></TableCell>
                                            <TableCell >{tsk.exName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell ><strong>Exercise Type :</strong></TableCell>
                                            <TableCell >{tsk.drillName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell ><strong>Exercise Purpose :</strong></TableCell>
                                            <TableCell >{tsk.etDescription}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell ><strong>Scenario Description :</strong></TableCell>
                                            <TableCell >{tsk.scenarioDes}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell ><strong>Sceduled Date and Time :</strong></TableCell>
                                            <TableCell >{tsk.sceduledDate}</TableCell>
                                        </TableRow>
                                    </Table>
                                </TableContainer>
                                <br />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={10}>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={() => { this.handleOpen(tsk) }}
                                        >
                                            View
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        )
    }

    renderSearchTaskList(taskList) {
        const { classes } = this.props;
        return (
            <div>

                <center><strong><h4>Excercises</h4></strong></center>


                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                id="date"
                                label="Start Date"
                                type="date"
                                onChange={this.handleChange}
                                name="fromDate"
                                value={this.state.fromDate}
                                // defaultValue={this.state.todayDate}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                id="date"
                                label="End Date"
                                type="date"
                                onChange={this.handleChange}
                                name="toDate"
                                value={this.state.toDate}
                                // defaultValue={this.state.todayDate}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}  >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}

                            >
                                Search
                            </Button>

                        </Grid>
                        <Grid item xs={12} sm={2}>
                        </Grid>
                    </Grid>
                </form>
                <TableContainer  >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Exercise Name</strong></TableCell>
                                <TableCell><strong>Excercise Type</strong></TableCell>
                                <TableCell><strong>Sceduled Date and Time</strong></TableCell>
                                <TableCell><strong>Created Date</strong></TableCell>
                                <TableCell align="right"><strong>View</strong> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(taskList.length == 0) ?
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell> No Data Available</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>

                                </TableRow>

                                : taskList.map((tsk) => (

                                    <TableRow key={tsk.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{tsk.exName}</TableCell>
                                        <TableCell>{tsk.drillName}</TableCell>
                                        <TableCell>{tsk.sceduledDate}</TableCell>
                                        <TableCell>{tsk.createdDate}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete">
                                                <VisibilityIcon onClick={() => { this.handleOpen(tsk) }} />
                                            </IconButton>
                                        </TableCell>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>



            </div>
        )
    }
    render() {
        const { classes } = this.props;
        var todayTaskList = this.renderTodayTaskList(this.state.taskList)
        console.log("qtaskList",this.state.qtaskList)
        var quickSearchTaskLList = this.renderQuickSearchTaskList(this.state.qtaskList)
        var searchTaskLList = this.renderSearchTaskList(this.state.staskList)
        return (
            <div>
                <Card style={{ marginTop: 30 }}>
                    <CardContent>

                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <PlaylistAddCheckIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Exercise Schedule Registry
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button
                                        type="button"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => { this.setState({ currentPage: 1 }) }}
                                    >
                                        Today
                                    </Button>
                                    <Button
                                        type="button"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => { this.setState({ currentPage: 2 }) }}
                                    >
                                        Quick Search
                                    </Button>
                                    <Button
                                        type="button"

                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => { this.setState({ currentPage: 3 }) }}
                                    >
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>

                        </div>

                        <Card style={{ marginTop: 30 }}>
                            <CardContent>

                                <div hidden={this.state.currentPage != 1}>
                                    {todayTaskList}
                                </div>
                                <div hidden={this.state.currentPage != 2}>
                                    {quickSearchTaskLList}
                                </div>
                                <div hidden={this.state.currentPage != 3}>
                                    {searchTaskLList}
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

                <Modal
                    open={this.state.isModalOpen}
                    onClose={() => { this.setState({ isModalOpen: false }) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={style}>
                        <div id="printContent">
                            <Typography component="h1" variant="h5">
                                Exercise Registry
                            </Typography>
                            <TableContainer  >
                                <Table aria-label="simple table">

                                    <TableRow>
                                        <TableCell ><strong>Exercise Name :</strong></TableCell>
                                        <TableCell >{this.state.exName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell ><strong>Exercise Type :</strong></TableCell>
                                        <TableCell >{this.state.drillName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell ><strong>Exercise Purpose :</strong></TableCell>
                                        <TableCell >{this.state.etDescription}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell ><strong>Scenario Description :</strong></TableCell>
                                        <TableCell >{this.state.scenarioDes}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell ><strong>Sceduled Date and Time :</strong></TableCell>
                                        <TableCell >{this.state.sceduledDate}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell ><strong>Created Date :</strong></TableCell>
                                        <TableCell >{this.state.createdDate}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell ><strong>Created by :</strong></TableCell>
                                        <TableCell >{this.state.firstName + ' ' + this.state.lastName}</TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>

                            <List >
                                <ListItem hidden={(this.state.stepOne == "") ? true : false}>
                                    <ListItemText primary={this.state.stepOne} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepTwo == "") ? true : false}>
                                    <ListItemText primary={this.state.stepTwo} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepThree == "") ? true : false}>
                                    <ListItemText primary={this.state.stepThree} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepFour == "") ? true : false}>
                                    <ListItemText primary={this.state.stepFour} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepFive == "") ? true : false}>
                                    <ListItemText primary={this.state.stepFive} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepSix == "") ? true : false}>
                                    <ListItemText primary={this.state.stepSix} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepSeven == "") ? true : false}>
                                    <ListItemText primary={this.state.stepSeven} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepEight == "") ? true : false}>
                                    <ListItemText primary={this.state.stepEight} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepNine == "") ? true : false}>
                                    <ListItemText primary={this.state.stepNine} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepTen == "") ? true : false}>
                                    <ListItemText primary={this.state.stepTen} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepEleven == "") ? true : false}>
                                    <ListItemText primary={this.state.stepEleven} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepTwelve == "") ? true : false}>
                                    <ListItemText primary={this.state.stepTwelve} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepThirteen == "") ? true : false}>
                                    <ListItemText primary={this.state.stepThirteen} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepFourteen == "") ? true : false}>
                                    <ListItemText primary={this.state.stepFourteen} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepFifteen == "") ? true : false}>
                                    <ListItemText primary={this.state.stepFifteen} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepSixteen == "") ? true : false}>
                                    <ListItemText primary={this.state.stepSixteen} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepSeventeen == "") ? true : false}>
                                    <ListItemText primary={this.state.stepSeventeen} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepEighteen == "") ? true : false}>
                                    <ListItemText primary={this.state.stepEighteen} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepNineteen == "") ? true : false}>
                                    <ListItemText primary={this.state.stepNineteen} />
                                </ListItem>
                                <ListItem hidden={(this.state.stepTwenty == "") ? true : false}>
                                    <ListItemText primary={this.state.stepTwenty} />
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

            </div>
        )
    }

} ExersiceDisplay = withStyles(styles)(ExersiceDisplay);
export default withRouter(ExersiceDisplay);