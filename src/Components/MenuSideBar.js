
import AppBar from '@mui/material/AppBar';
import React, { Component } from "react";
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useHistory } from "react-router-dom";
import AccidentTypesDisplay from "./AccidentTypes/AccidentTypesDisplay";
import AddAccidentTypes from "./AccidentTypes/AddAccidentTypes"
import BoltIcon from '@mui/icons-material/Bolt';
import Tooltip from '@mui/material/Tooltip';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import InstructionDisplay from './Instruction/InstructionDisplay'
import AddInstruction from './Instruction/AddInstruction'
import DashBoard from './DashBoard/DashBoard';
import CurrentActivityOfSrc from './DashBoard/CurrentActivityOfSrc';
import AccurateSafetyDistance from './DashBoard/AccurateSafetyDistance';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import DownloadIcon from '@mui/icons-material/Download';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ScheduleIcon from '@mui/icons-material/Schedule';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import MainReport from './Reports/MainReport';
import ExerciseSceduler from './Exercise/ExerciseSceduler';
import ExerciseDisplay from './Exercise/ExerciseDisplay';
import AccidentReport from './AccidentReport/AccidentReport';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

function MenuSideBar() {

    let history = useHistory();
  
    const username = sessionStorage.getItem("username")
    const roleId = sessionStorage.getItem("roleId")
    const userId = sessionStorage.getItem("userId")
    
        console.log("username", username)
        console.log("roleId", roleId)
        console.log("userId", userId)
    return (
        <Router>
            <AppBar position="absolute" color="default" className={useStyles.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Emergency Excercise Instruction Sysytem
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" m={1} p={1} >
                        <Tooltip title="Dashboard">
                            <IconButton aria-label="delete" component={Link} to={'/home'}>
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Emergencies">
                            <IconButton aria-label="delete" component={Link} to={'/acctypes'}>
                                <BoltIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Instructions">
                            <IconButton aria-label="delete" component={Link} to={'/instr'}>
                                <ListIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Exercises">
                            <IconButton aria-label="delete" component={Link} to={'/exercises'}>
                                <DirectionsRunIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Exercise Scheduler">
                            <IconButton aria-label="delete" component={Link} to={'/scheduler'}  disabled = {(roleId !== "1")?true:false}>
                                <ScheduleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Accident Report">
                            <IconButton aria-label="delete" component={Link} to={'/accreport'} >
                                <VaccinesIcon />
                            </IconButton>
                        </Tooltip>
                       
                    </Box>
                </Toolbar>
            </AppBar>

            <br /><br />
            <Card>

            </Card>
            <Switch>
                <Route path="/currentactivity">
                    <CurrentActivityOfSrc />
                </Route>
                <Route path="/safetydis">
                    <AccurateSafetyDistance />
                </Route>
                <Route path="/acctypes">
                    <AccidentTypesDisplay />
                </Route>
                <Route path="/addacc">
                    <AddAccidentTypes />
                </Route>
                <Route path="/instr">
                    <InstructionDisplay />
                </Route>
                <Route path="/addinstr">
                    <AddInstruction />
                </Route>
                <Route path="/scheduler">
                    <ExerciseSceduler />
                </Route>
                <Route path="/exercises">
                    <ExerciseDisplay />
                </Route>
                <Route path="/accreport">
                    <AccidentReport />
                </Route>
                <Route path="/home">
                    <DashBoard />
                </Route>
                
            </Switch>
        </Router>
    )
}
export default MenuSideBar;