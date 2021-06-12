import React from 'react';
import clsx from 'clsx';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AppBar from '@material-ui/core/AppBar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Toolbar from '@material-ui/core/Toolbar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import List from '@material-ui/core/List';
import QueueIcon from '@material-ui/icons/Queue';
import CssBaseline from '@material-ui/core/CssBaseline';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import StorageIcon from '@material-ui/icons/Storage';
import {NavLink} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {     Button } from "@material-ui/core";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  paper: {
    background: 'black',
    color: 'white'
  },
  drawer: {
     
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    // background: 'black',
    // color:'white',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
  
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  visibleClose: {
    visibility: "hidden",
  },
  visibleOpen: {
    visibility: "visible",
  },
  
  toolbar: {
  
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
  
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
     
        variant="permanent"
       
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Button
            className={clsx({
              [classes.visibleOpen]: open,
              [classes.visibleClose]: !open,
            })}
            onClick={handleDrawerClose}
          >
            <div className="donut-title">
            <MenuOpenIcon></MenuOpenIcon>
            </div>
          </Button>

          <Button
            className={clsx({
              [classes.visibleClose]: open,
              [classes.visibleOpen]: !open,
            })}
            onClick={handleDrawerOpen}
          >
          <MenuOpenIcon></MenuOpenIcon>
          </Button>
        </div>

        <Divider />
        <List>


        <ListItem button>
        <NavLink to="/wms" className="link">
        <ListItemIcon> <DashboardIcon /></ListItemIcon>
          <b>Dashboard</b>
        </NavLink>
      </ListItem>
    

      <ListItem button>
      <NavLink to="/wms/storage" className="link">
      <ListItemIcon> <StorageIcon /></ListItemIcon>
        <b>Storage</b>
      </NavLink>
    </ListItem>

    <ListItem button>
    <NavLink to="/wms/booking" className="link">
    <ListItemIcon> <ShoppingCartIcon /></ListItemIcon>
      <b>Booking</b>
    </NavLink>
  </ListItem>

  <ListItem button>
  <NavLink to="/wms/shipping" className="link">
  <ListItemIcon> <LocalShippingIcon /></ListItemIcon>
    <b>Shipping Status handler</b>
  </NavLink>
</ListItem>

  <ListItem button>
  <NavLink to="/wms/grn" className="link">
  <ListItemIcon> <QueueIcon /></ListItemIcon>
    <b>Good Receipt Note</b>
  </NavLink>
</ListItem>

<ListItem button>
<NavLink to="/wms/picklist" className="link">
<ListItemIcon> <FormatListBulletedIcon /></ListItemIcon>
  <b>Pick List</b>
</NavLink>
</ListItem>

<ListItem button>
<NavLink to="/wms/excelupload" className="link">
<ListItemIcon> <CloudUploadIcon /></ListItemIcon>
  <b>Excel Upload</b>
</NavLink>
</ListItem>

 
      
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    
    </div>
  );
}
