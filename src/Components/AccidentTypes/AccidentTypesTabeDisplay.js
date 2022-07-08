import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { makeStyles, withStyles } from '@mui/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import InputLabel from '@mui/material/InputLabel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TextField from '@mui/material/TextField';

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
class AccidentTypesTabeDisplay extends React.Component {


    constructor() {
        super()
        this.state = {
            accList: [],
            tcId: -1,
            lvId: -1,
            lcId: -1,
            emegencyLevelList: [],
            locationList: [],
            threatcatList: [],
            instructionList: [],
            isErrorAlertOpen: false,
            isModalOpen: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleOpen = this.handleOpen.bind(this)

    }
    handleOpen = (row) => {
        console.log(row)

        this.setState({
            isModalOpen: true,
            accName: row.accName,
            accDescription: row.accDescription,
            tcId: row.tcId,
            lcId: row.lcId,
            lvId: row.lvId
        })
    }
    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }
    handleCloseModal = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleSubmit = (event) => {
        const headers = { 'Content-Type': 'application/json' ,
                            'Authorization': 'Bearer ' + this.state.accessToken,
                          }
        let queryString = "/" + this.state.tcId + "/" + this.state.lvId + "/" + this.state.lcId
        fetch('http://localhost:8092/api/eed/acc' + queryString , {headers})
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
                        console.log("newList",newList);
                      //  console.log("newAccList", newAccList)
                      this.setState({
                          accList: newList
                      })
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

        event.preventDefault();
    }
    handleClose = () => {
        this.setState({
            isErrorAlertOpen: false
        })
    }
    clearAllFields = () => {
        this.setState({
            tcId: -1,
            lvId: -1,
            lcId: -1,

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

    fetch('http://localhost:8092/api/eed/location', {headers})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data != null) {
                this.setState({
                    locationList: data
                })
            }
        })

    fetch('http://localhost:8092/api/eed/threatcat', {headers})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data != null) {
                this.setState({
                    threatcatList: data
                })
            }
        })


        fetch('http://localhost:8092/api/eed/getallacc', {headers})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null) {
                    this.setState({
                        accList: data
                    },()=>{
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
                        console.log("newList",newList);
                      //  console.log("newAccList", newAccList)
                      this.setState({
                          accList: newList
                      })
                    })
                }
            })

       
    }

    render() {
        const { classes } = this.props;

        return (

            <div>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LibraryBooksIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Emergency Registry
                    </Typography>
                </div>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
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
                        <Grid item xs={12} sm={3}>
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
                        </Grid>
                        <Grid item xs={12} sm={3}>
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
                        </Grid>
                        <Grid item xs={12} sm={3} marginTop={4} >
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


                <div>
                    <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Accident Name</strong></TableCell>
                                    <TableCell align="right"><strong>Accident Description</strong></TableCell>
                                    <TableCell align="right"><strong>Threat Category</strong></TableCell>
                                    <TableCell align="right"><strong>Emergency Level</strong></TableCell>
                                    <TableCell align="right"><strong>Location</strong></TableCell>
                                    <TableCell align="right"><strong>View</strong> </TableCell>
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
                                        <TableCell align="right">{row.tcName}</TableCell>
                                        <TableCell align="right">{row.lvName}</TableCell>
                                        <TableCell align="right">{row.lcName}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete">
                                                <VisibilityIcon onClick={() => { this.handleOpen(row) }} />
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

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

                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Emergency
                        </Typography>
                        <form className={classes.form} noValidate >
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
                                        disabled
                                    />
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
                                        disabled
                                    />
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
                                        disabled
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
                                        disabled
                                    >
                                        <MenuItem value={-1}>-- Please Select an Emergency Level --</MenuItem>
                                        {this.state.emegencyLevelList.map((em) => (
                                            <MenuItem value={em.id}>{em.levelName}</MenuItem>
                                        ))}
                                    </Select>
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
                                        disabled
                                    >
                                        <MenuItem value={-1}>-- Please Select a Location Type --</MenuItem>
                                        {this.state.locationList.map((lc) => (
                                            <MenuItem value={lc.id}>{lc.locationName}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>


                            </Grid>



                        </form>
                    </Box>
                </Modal>
            </div>
        );
    }

} AccidentTypesTabeDisplay = withStyles(styles)(AccidentTypesTabeDisplay);
export default withRouter(AccidentTypesTabeDisplay);