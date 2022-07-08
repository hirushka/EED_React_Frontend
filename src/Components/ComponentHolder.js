import * as React from 'react';
import Grid from '@mui/material/Grid';
import MenuSideBar from "./MenuSideBar";
import DashBoard  from './DashBoard/DashBoard';

class ComponentHolder extends  React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(

          <div>          
            <MenuSideBar/> 
            
          </div>
        )
    }
}
export default ComponentHolder;