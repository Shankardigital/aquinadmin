import React, { useState,useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
// import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";
// import Box from '@mui/material/Box';
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
// import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import avatar from "../assets/images/users/user-1.jpg";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assets/images/logo1.png";

import { NavLink, Link } from "react-router-dom";

import "./sidebar.css";
import logos1 from "../assets/images/logos1.png";

import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ReportIcon from "@mui/icons-material/Report";

import HelpIcon from "@mui/icons-material/Help";
import SecurityIcon from "@mui/icons-material/Security";
import "./sidebar.css";
import PaymentIcon from '@mui/icons-material/Payment';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
     
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
       
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
 
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} sx={{ mr: 1, color: "white" }} st />
          <Typography
            variant="body2"
            // sx={{ fontWeight: "inherit", flexGrow: 1 }}
            style={{ color: "white"  }}
            sx={{
              flexGrow: 1,
              fontSize: "13.3px",
              fontFamily: "Poppins",
              color: "white",textDecoration:"none"
            }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" style={{ color: "white" }}>
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      // backgroundColor: `#232323, ${theme.palette.action.selected})`,
      color: "white",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "#f5f5f5",
      color: "#f5f5f5",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};
function Sidebarres() {

  let navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cleardata = () => {
    sessionStorage.clear();
    handleClose();
    // navigate('/');
    window.location.href = "/";
  };

  const [show, setShow] = useState(true);

  const [user, setuser] = useState([]);
  console.log(user);

  const myprofile = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/aquin/getadminprofile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setuser(res.data.adminProfile);
        }
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message);
        }else if (error.response && error.response.status === 401){
          toast(error.response.data.message);
          navigate("/login");
        }
      }
      );
  };

  useEffect(() => {
    myprofile();
  }, []);



  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}

        <AppBar
          position="fixed"
          open={open}
          id="zzzs"
        >
          <Toolbar>
            {/* <Typography variant="h6" noWrap component="div">
              Aquin 
            </Typography> */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon  style={{color:'black'}}/>
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge color="error">
                    {/* <Link to="/Notifications">
                      <NotificationsIcon
                        className=""
                        style={{ color: "black" }}
                      />
                    </Link> */}
                  </Badge>
                </IconButton>
                {/* <p>Notifications</p> */}

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <img
                  className=" rounded-circle avatar-lg img-thumbnail ml-3 mr-5"
                  style={{ width: "42px" }}
                  src={"http://aquinapi.aquin.us" + "/" + user.profilePicture}
                />
                </IconButton>
                {/* <MenuItem>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <p>Notifications</p>
                </MenuItem> */}
                <Menu
                  style={{ marginTop: "50px" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <NavLink to="/Profile">
                    <MenuItem onClick={handleClose}>
                      <div className="row" style={{ width: "100%" }}>
                        <div
                          className="col mr-5 pcard"
                          style={{ width: "60%" }}
                        >
                          {" "}
                          Profile
                        </div>
                        <div className="col pcard">
                          <div style={{ float: "right" }}>
                            <PersonIcon />
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                  </NavLink>
                  <NavLink>
                    <MenuItem onClick={cleardata}>
                      <div
                        className="row mt-2"
                        style={{ marginBottom: "-10px" }}
                      >
                        <div className="col" style={{ width: "60%" }}>
                          {" "}
                          <p style={{ width: "125px" }}>Log out</p>
                        </div>
                        <div className="col">
                          <ExitToAppIcon />
                        </div>
                      </div>
                    </MenuItem>
                  </NavLink>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background:" linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
              color:'white'
            },
          }}
         
          anchor="left"
          open={open}
          id="yyys"
        >
          <DrawerHeader
           
          >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon style={{color:"white"}}/>
              ) : (
                <ChevronRightIcon  style={{color:"white"}}/>
              )}
            </IconButton>
          </DrawerHeader>
          <Drawer
            variant="permanent"
            open={open}
           id="yyys"
          >
            <DrawerHeader>
              {/* <h5 className='text-white mt-2'>Aquin Members</h5> */}
              <img src={logo} style={{ width: "150px" }} />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon style={{color:"white"}}/>
                ) : (
                  <ChevronLeftIcon style={{color:"white"}}/>
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <TreeView
            
              aria-label="gmail"
              defaultExpanded={["3"]}
              defaultCollapseIcon={
                <ArrowDropDownIcon
                  style={{
                    display: !show ? "none" : "",
                  }}
                />
              }
              defaultExpandIcon={
                <ArrowRightIcon
                  style={{
                    display: !show ? "none" : "",
                  }}
                />
              }
              defaultEndIcon={<div style={{ width: 24 }} />}
              sx={{
                height: 264,
                flexGrow: 1,
                maxWidth: 240,
                overflowY: "auto",
              }}
              // style={{ paddingTop: "30px" }}
            >
          <Link
              to="/dashboard"
              className="zzz"
              style={{ color: "white", textDecoration: "none" }}
            >
              <StyledTreeItem
                nodeId="1"
                labelText="Dashboard"
                labelIcon={DashboardIcon}
                style={{ color: "white", textDecoration: "none" }}
              />
            </Link>

            <StyledTreeItem
              nodeId="2"
              labelText="Members"
              labelIcon={SupervisorAccountIcon}
            >
              <Link
                to="/Newmembers"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="3"
                  labelText="Add Member"
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/Managemember"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem nodeId="4" labelText="Manage Member" />
              </Link>
              {/* <Link
                to="/Sponcserteam"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="5"
                  labelText="Sponsor Team"
                  style={{ color: "white" }}
                />
              </Link> */}
              <Link
                to="/Memberverfication"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="6"
                  labelText="Member Kyc Verification"
                  style={{ color: "white" }}
                />
              </Link>
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="8"
              labelText="E-Wallet"
              labelIcon={PriceChangeIcon}
            >
              <Link
                to="/wallet-coins"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="9"
                  labelText="Manage wallet Coins"
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/Makepayments"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="10"
                  labelText="Transfer Coins"
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/WithdrawRequest"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="11"
                  labelText="Withdraw Coins"
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/earnings"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="11"
                  labelText="Earnings"
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/makePayment"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="11"
                  labelText="Make Payments"
                  style={{ color: "white" }}
                />
              </Link>
              {/* <Link
                to="/WalletTransfer"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="22"
                  labelText="Withdraw Report"
                  style={{ color: "white" }}
                />
              </Link> */}
            </StyledTreeItem>

            <Link
              to="/Payments"
              className="zzz"
              style={{ color: "white", textDecoration: "none" }}
            >
              <StyledTreeItem
                nodeId="14"
                labelText="Payments"
                labelIcon={PaymentIcon}
                style={{ color: "white" }}
              />
            </Link>

            <StyledTreeItem
              nodeId="12"
              labelText="Ads"
              labelIcon={AddCommentIcon}
            >
              <Link
                to="/Addtypes"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="13"
                  labelText="Ads Categories"
                  style={{ color: "white" }}
                />
              </Link>

              <Link
                to="/Addcategories"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="14"
                  labelText="Ads Sub Categories"
                  style={{ color: "white" }}
                />
              </Link>

              <Link
                to="/Ads"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="13"
                  labelText="Ads"
                  style={{ color: "white" }}
                />
              </Link>
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="15"
              labelText="Settings"
              labelIcon={SettingsIcon}
            >
              <Link
                to="/Coins"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="16"
                  labelText="Coins"
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/Memberlevelview"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="21"
                  labelText="Level wise Coins "
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/Transations"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="17"
                  labelText="Transaction"
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/States"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="18"
                  labelText="States"
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/Banks"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="19"
                  labelText="Banks"
                  style={{ color: "white" }}
                />
              </Link>
              <Link
                to="/qrcode"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="16"
                  labelText="Qr Code"
                  style={{ color: "white" }}
                />
              </Link>
              {/* <Link
                to="/Notifications"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="20"
                  labelText="Notifications"
                  style={{ color: "white" }}
                />
              </Link> */}
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="24"
              labelText="Reports"
              labelIcon={ReportIcon}
            >
              <Link
                to="/Walletreport"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="25"
                  labelText="Withdraw Report"
                  style={{ color: "white" }}
                />
              </Link>
              {/* <Link
                to="/Withdrawreport"
                className="zzz"
                style={{ color: "white", textDecoration: "none" }}
              >
                <StyledTreeItem
                  nodeId="36"
                  labelText="Payout Report"
                  style={{ color: "white" }}
                />
              </Link> */}
            </StyledTreeItem>

            <Link
              to="/Support"
              className="zzz"
              style={{ color: "white", textDecoration: "none" }}
            >
              <StyledTreeItem
                nodeId="14"
                labelText="Support"
                labelIcon={HelpIcon}
                style={{ color: "white" }}
              />
            </Link>

            </TreeView>

            <Divider />
          </Drawer>
        </Drawer>
        <ToastContainer/>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </div>
  );
}

export default Sidebarres;
