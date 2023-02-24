import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import PropTypes from "prop-types";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ReportIcon from "@mui/icons-material/Report";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import "./sidebar.css";
import logos1 from "../assets/images/logos1.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentIcon from "@mui/icons-material/Payment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: " linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
  color: "white",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  background: " linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
  color: "white",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
    background: " linear-gradient(119.54deg,#000046 0%,#1CB5E0 100%)",
    color: "white",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
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
          <Box component={LabelIcon} sx={{ mr: 2, color: "white" }} />
          <Typography
            sx={{
              flexGrow: 1,
              fontSize: "13.3px",
              fontFamily: "Poppins",
              color: "white",
              textDecoration: "none",
            }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption">{labelInfo}</Typography>
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
    // borderTopRightRadius: theme.spacing(2),
    // borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
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

function Sidebar(props) {
  let navigate = useNavigate();
  const handlesession = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
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
    window.location.href = "/login";
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      style={{ marginTop: "50px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NavLink to="/Profile" className="NavLink">
        {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
        <MenuItem>
          <div className="row" style={{ width: "100%" }}>
            <div className="col mr-5 pcard" style={{ width: "60%" }}>
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
      <NavLink className="NavLink">
        {/* <MenuItem onClick={handlesession}>Log out</MenuItem> */}
        <MenuItem onClick={cleardata} className="text-danger">
          <div className="row mt-2" style={{ marginBottom: "-10px" }}>
            <div className="col" style={{ width: "60%" }}>
              <p style={{ width: "125px" }}>Log out</p>
            </div>
            <div className="col">
              <ExitToAppIcon />
            </div>
          </div>
        </MenuItem>
      </NavLink>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    setShow(true);
  };

  const [show, setShow] = useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
    setShow(false);
  };

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
        <AppBar
          position="fixed"
          open={open}
          style={{
            background: "white",
          }}
          id="zzzs"
        >
          <Toolbar>
            <IconButton
              // color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon style={{ color: "black" }} />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              style={{ color: "black", fontWeight: "bold" }}
            ></Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              ></IconButton> */}
              <IconButton size="large" color="inherit">
                <Badge color="error">
                  <Link to="/Notifications">
                    <NotificationsIcon
                      className=""
                      style={{ color: "black" }}
                    />
                  </Link>
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle style={{ color: "black" }} /> */}
                <img
                  className=" rounded-circle avatar-lg img-thumbnail ml-3 mr-5"
                  style={{ width: "42px" }}
                  src={"http://aquinapi.aquin.us" + "/" + user.profilePicture}
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                style={{ color: "black" }}
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={open}
          className="sidebar"
          id="DrawerDatas"
        >
          <DrawerHeader>
            <img
              src={logos1}
              width="150px"
              alt="logo"
              style={{ marginRight: "15px" }}
            ></img>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: "white" }} />
              ) : (
                <ChevronLeftIcon style={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider style={{ color: "white" }} />
          <TreeView
          style={{color:"whit"}}
            id="DrawerDatas"
            aria-label="gmail"
            defaultExpanded={["3"]}
            // defaultCollapseIcon={
            //   <ArrowDropDownIcon
            //   sx={{ float:'right'}}
            //     style={{
            //       display: !show ? "none" : "",
            //     }}
            //   />
            // }
            // defaultExpandIcon={
            //   <ArrowRightIcon
            //     style={{
            //       display: !show ? "none" : "",
            //     }}
            //   />
            // }
            // defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{
              height: 264,
              flexGrow: 2,
              maxWidth: 240,
              overflowY: "auto",
              paddingTop: "15px",
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

            {/* <Link
              to="/MemberAccess"
              className="zzz"
              style={{ color: "white", textDecoration: "none" }}
            >
              <StyledTreeItem
                nodeId="23"
                labelText="Roles & premission"
                labelIcon={SecurityIcon}
                style={{ color: "white" }}
              />
            </Link> */}
          </TreeView>
      
        </Drawer>
        <ToastContainer/>
        {/* <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <DrawerHeader />
          <Router />
        </Box> */}
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </div>
  );
}

export default Sidebar;
