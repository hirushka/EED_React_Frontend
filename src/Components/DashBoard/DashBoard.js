import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles, withStyles } from '@mui/styles';
import CurrentActivityOfSrc from './CurrentActivityOfSrc';
import AccidentTypesDisplay from "../AccidentTypes/AccidentTypesDisplay"
import Fab from '@mui/material/Fab';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Box from '@mui/material/Box';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import AnimationR1 from '../../assets/r1.gif';
import AnimationR5 from '../../assets/r5.gif';
import AnimationR6 from '../../assets/r6.gif';

const styles = theme => ({
    paper: {
        marginTop: 20,
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
        justifyContent: 'right',

    },
    select: {
        width: '100%'
    }
});

class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:"",
            roleId:"",
            userId:""
        }
    }

    componentDidUpdate(){

        var username = sessionStorage.getItem("username")
        var roleId = sessionStorage.getItem("roleId")
        var userId = sessionStorage.getItem("userId")
        this.setState({
            username:username,
            roleId:roleId,
            userId:userId
        },()=>{
            console.log("username", this.state.username)
            console.log("roleId", this.state.roleId)
            console.log("userId", this.state.userId)
        })
    }
    render() {
        const { classes } = this.props;

        return (

            <div marginTop={55} >
                <Card>
                    <Grid marginTop={5} marginBottom={5} container spacing={10}>
                        <Grid item xs={12} sm={1}>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Card>
                                <CardActionArea component={Link} to={'/currentactivity'}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={AnimationR6}
                                        alt="green iguana"
                                    />

                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Current Activity Of The Source
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Card>
                                <CardActionArea component={Link} to={'/safetydis'}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={AnimationR1}
                                        alt="green iguana"
                                    />

                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Accuarate Safety Distance
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                        </Grid>
                    </Grid>

                </Card>


            </div>



        )
    }
}
DashBoard = withStyles(styles)(DashBoard);
export default withRouter(DashBoard);
