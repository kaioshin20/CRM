import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { ListSubheader, Avatar } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import CustomScrollbars from './CustomScrollbars';
import { logoutUser } from '../../actions/authActions';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getAllContacts, getAllCompanies, getAllDeals, getAllTickets, getAllActivities } from '../../actions/crmActions';


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
  appBarbg:{
    // background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(7,121,222,1) 0%, rgba(20,72,140,1) 90% );
    
    background: "rgba(20,72,140,1) 90%",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to right, rgba(7,121,222,1) 0%, rgba(20,72,140,1) 90%)",  /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to right, rgba(7,121,222,1) 0%, rgba(20,72,140,1) 90%)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  },
  // menuButton: {
  //   marginRight: 36,
  // },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbar_h1:{
    marginRight: 'auto',
    marginLeft: 'auto'


  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function SideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = useState([])
  const dispatch = useDispatch();

  useEffect( () => {
      dispatch(getAllContacts());
      dispatch(getAllCompanies());
      dispatch(getAllDeals())
      dispatch(getAllActivities());
      dispatch(getAllTickets());
      
  },[dispatch]);


  useEffect(() => {
    const tempNotifications = [];
    axios.get('/api/meetings/all')
          .then(meetings => {
              meetings.data.map(meeting => {

                var d = new Date(meeting.startTime);
                var d1 = new Date();
                var x = new Date(d-d1)
                var diff = parseInt(x/1000/60/60)
                if(diff >= 0 && diff <= 24 && d-d1 != 0){
                  tempNotifications.push(meeting)
                }
              })            
              console.log(tempNotifications)
              setNotifications(tempNotifications)
          }).catch(err => console.log(err))
  })

  const handleDrawerOpen = () => {
    setOpen(true);
    document.getElementById("nested-list1-subheader").style.opacity = 1
    document.getElementById("nested-list2-subheader").style.opacity = 1
    document.getElementById("nested-list3-subheader").style.opacity = 1
  };

  const handleDrawerClose = () => {
    setOpen(false);
    document.getElementById("nested-list1-subheader").style.opacity = 0
    document.getElementById("nested-list2-subheader").style.opacity = 0
    document.getElementById("nested-list3-subheader").style.opacity = 0
  };

  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(notificationAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const notificationMenuId = 'primary-notification-menu';
  const renderNotificationMenu = (
    <Menu
      anchorEl={notificationAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={notificationMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationOpen}
      onClose={handleNotificationClose}
    >
      {
        notifications.map(ele => {
          console.log(notifications)
          return <MenuItem onClick={handleMenuClose}> {ele.subject} </MenuItem>

        })
      }
      <MenuItem onClick={handleMenuClose}>Notification 2</MenuItem>
      <MenuItem onClick={handleLogout}>Notification 3</MenuItem>
    </Menu>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleNotificationOpen}>
        <IconButton 
          aria-label="show 11 new notifications" 
          aria-controls="primary-notification-menu"
          aria-haspopup="true"
          color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        }, classes.appBarbg)}
      >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Quloi
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" aria-controls={notificationMenuId}
              edge="center"
              aria-haspopup="true" 
              onClick={handleNotificationOpen} color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderNotificationMenu}
      {renderMenu}
      <Drawer
        variant="permanent"
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
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
        <CustomScrollbars className=" scrollbar">
        <div className={classes.toolbar}>
          {/* <h1 className={classes.toolbar_h1}>CRM</h1> */}
          <img src={require("./../CRM/Common/quloi_logo.png")} style={{ width: "120px", margin: "auto"}} />
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        
        <List
          subheader={
            <ListSubheader style={{opacity:"0"}} component="div" id="nested-list1-subheader">
              DASHBOARD
            </ListSubheader>
          }
          // className={classes.root}
        >
          <ListItem button component={Link} to="/crm/contacts">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItem>
          <ListItem button component={Link} to="/crm/companies">
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Company" />
          </ListItem>
          <ListItem button component={Link} to="/crm/deals">
            <ListItemIcon>
              <LocalOfferIcon />
            </ListItemIcon>
            <ListItemText primary="Deals" />
          </ListItem>
          <ListItem button component={Link} to="/crm/tickets">
            <ListItemIcon>
              <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItem>
          <ListItem button component={Link} to="/crm/activities">
            <ListItemIcon>
              <LocalActivityIcon />
            </ListItemIcon>
            <ListItemText primary="Activities" />
          </ListItem>
          
        </List>

        <Divider />
        <List
          subheader={
            <ListSubheader style={{opacity:"0"}} component="div" id="nested-list2-subheader">
              ADMIN PANEL
            </ListSubheader>
          }
          // className={classes.root}
        >
          {['Manage Access', 'View Sales', 'Billing'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <List
          subheader={
            <ListSubheader style={{opacity:"0"}} component="div" id="nested-list3-subheader">
              MANAGE ACCOUNT
            </ListSubheader>
          }
          // className={classes.root}
        >
          {['Change Password', 'Forgot Pasword', 'Logout'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </CustomScrollbars>
      </Drawer>
    </div>
  );
}

export default  withRouter(withStyles(useStyles)(SideBar))