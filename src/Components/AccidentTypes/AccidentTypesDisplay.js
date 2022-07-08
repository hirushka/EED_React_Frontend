import React from "react";
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AccidentTypesTabeDisplay from "./AccidentTypesTabeDisplay";

import Fab from '@mui/material/Fab';
const useStyles = makeStyles({
    root: {

    },

    title: {
        //fontSize: 14,
        fontWeight: 'fontWeightRegular'
    },
    pos: {
        marginBottom: 12,
    },
});

function AccidentTypesDisplay() {
    const history = useHistory();
    const username = sessionStorage.getItem("username")
    const roleId = sessionStorage.getItem("roleId")
    
    return (
        <Card className={useStyles.root}  style={{ marginTop: 20 }}>
            <CardContent>
                <Box sx={{ '& > :not(style)': { m: 1 } }} display="flex" justifyContent="flex-end">
                    <Fab size="small" aria-label="add"  disabled = {(roleId !== "1")?true:false}>
                    <LibraryAddIcon onClick={() => { history.push('/addacc') }} />
                    </Fab>
                    
                </Box>
                <Box marginTop={-8}>
                    <AccidentTypesTabeDisplay />
                </Box>
            </CardContent>
        </Card>
    )
}
export default AccidentTypesDisplay;