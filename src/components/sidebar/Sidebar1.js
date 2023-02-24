// import React, { useState } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import Badge from "@mui/material/Badge";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MoreIcon from "@mui/icons-material/MoreVert";
// import { useNavigate } from "react-router";
// import { Link, NavLink } from "react-router-dom";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import SettingsIcon from "@mui/icons-material/Settings";
// import TreeView from "@mui/lab/TreeView";
// import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
// import PropTypes from "prop-types";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import PriceChangeIcon from "@mui/icons-material/PriceChange";
// import AddCommentIcon from "@mui/icons-material/AddComment";
// import ReportIcon from "@mui/icons-material/Report";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import HelpIcon from "@mui/icons-material/Help";
// import "./sidebar.css";
// import logos1 from "../assets/images/logos1.png";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import PersonIcon from "@mui/icons-material/Person";
// import SecurityIcon from "@mui/icons-material/Security";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
//   background: "linear-gradient(34.54deg, #000046 0%, #1CB5E0 100%)",
//   color: "white",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   background: "linear-gradient(34.54deg, #000046 0%, #1CB5E0 100%)",
//   color: "white",
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//     background: "linear-gradient(34.54deg, #000046 0%, #1CB5E0 100%)",
//     color: "white",
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// function StyledTreeItem(props) {
//   const {
//     bgColor,
//     color,
//     labelIcon: LabelIcon,
//     labelInfo,
//     labelText,
//     ...other
//   } = props;

//   return (
//     <StyledTreeItemRoot
//       label={
//         <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
//           <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
//           <Typography
//             variant="body2"
//             sx={{ fontWeight: "inherit", flexGrow: 1 }}
//           >
//             {labelText}
//           </Typography>
//           <Typography variant="caption" color="inherit">
//             {labelInfo}
//           </Typography>
//         </Box>
//       }
//       style={{
//         "--tree-view-color": color,
//         "--tree-view-bg-color": bgColor,
//       }}
//       {...other}
//     />
//   );
// }

// const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
//   color: theme.palette.text.secondary,
//   [`& .${treeItemClasses.content}`]: {
//     color: theme.palette.text.secondary,
//     borderTopRightRadius: theme.spacing(2),
//     borderBottomRightRadius: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//     fontWeight: theme.typography.fontWeightMedium,
//     "&.Mui-expanded": {
//       fontWeight: theme.typography.fontWeightRegular,
//     },
//     "&:hover": {
//       backgroundColor: theme.palette.action.hover,
//     },
//     "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
//       backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
//       color: "var(--tree-view-color)",
//     },
//     [`& .${treeItemClasses.label}`]: {
//       fontWeight: "inherit",
//       color: "inherit",
//     },
//   },
//   [`& .${treeItemClasses.group}`]: {
//     marginLeft: 0,
//     [`& .${treeItemClasses.content}`]: {
//       paddingLeft: theme.spacing(2),
//     },
//   },
// }));

// StyledTreeItem.propTypes = {
//   bgColor: PropTypes.string,
//   color: PropTypes.string,
//   labelIcon: PropTypes.elementType.isRequired,
//   labelInfo: PropTypes.string,
//   labelText: PropTypes.string.isRequired,
// };

// function Sidebars(props) {
//   let navigate = useNavigate();
//   const handlesession = () => {
//     sessionStorage.clear();
//     localStorage.clear();
//     navigate("/login");
//   };

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       style={{ marginTop: "50px" }}
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <NavLink to="/Profile" className="NavLink">
//         {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
//         <MenuItem>
//           <div className="row" style={{ width: "100%" }}>
//             <div className="col mr-5 pcard" style={{ width: "60%" }}>
//               Profile
//             </div>
//             <div className="col pcard">
//               <div style={{ float: "right" }}>
//                 <PersonIcon />
//               </div>
//             </div>
//           </div>
//         </MenuItem>
//       </NavLink>
//       <NavLink to="/login" className="NavLink">
//         {/* <MenuItem onClick={handlesession}>Log out</MenuItem> */}
//         <MenuItem>
//           <div className="row mt-2" style={{ marginBottom: "-10px" }}>
//             <div className="col" style={{ width: "60%" }}>
//               <p style={{ width: "125px" }}>Log out</p>
//             </div>
//             <div className="col">
//               <ExitToAppIcon />
//             </div>
//           </div>
//         </MenuItem>
//       </NavLink>
//     </Menu>
//   );

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//     setShow(true);
//   };

//   const [show, setShow] = useState(true);

//   const handleDrawerClose = () => {
//     setOpen(false);
//     setShow(false);
//   };

//   return (
//     <div>
//       <Box sx={{ display: "flex" }} >
//         <CssBaseline />
//         <AppBar
//           position="fixed"  
//           open={open}
        
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawerOpen}
//               edge="start"
//               sx={{
//                 marginRight: 5,
//                 ...(open && { display: "none" }),
//               }}
//             >
//               <MenuIcon style={{ color: "white" }} />
//             </IconButton>

//             <Typography
//               variant="h6"
//               noWrap
//               component="div"
//               sx={{ display: { xs: "none", sm: "block" } }}
//               style={{ color: "white", fontWeight: "bold" }}
//             ></Typography>

//             <Box sx={{ flexGrow: 1 }} />
//             <Box sx={{ display: { xs: "none", md: "flex" } }}>
//               <IconButton
//                 size="large"
//                 aria-label="show 4 new mails"
//                 color="inherit"
//               ></IconButton>
//               <IconButton size="large" color="inherit">
//                 <Badge color="error">
//                   <NotificationsIcon style={{ color: "white" }} />
//                 </Badge>
//               </IconButton>
//               <IconButton
//                 size="large"
//                 edge="end"
//                 aria-label="account of current user"
//                 aria-controls={menuId}
//                 aria-haspopup="true"
//                 onClick={handleProfileMenuOpen}
//                 color="inherit"
//               >
//                 <AccountCircle style={{ color: "white" }} />
//               </IconButton>
//             </Box>
//             <Box sx={{ display: { xs: "flex", md: "none" } }}>
//               <IconButton
//                 style={{ color: "white" }}
//                 size="large"
//                 aria-label="show more"
//                 aria-controls={mobileMenuId}
//                 aria-haspopup="true"
//                 onClick={handleMobileMenuOpen}
//                 color="inherit"
//               >
//                 <MoreIcon />
//               </IconButton>
//             </Box>
//           </Toolbar>
//         </AppBar>

//         <Drawer
//           variant="permanent"
//           open={open}
//           className="sidebar"
//           id="DrawerDatas"
//         >
//           <DrawerHeader
            
//           >
//             <img
//               src={logos1}
//               width="150px"
//               alt="logo"
//               style={{ marginRight: "15px" }}
//             ></img>
//             <IconButton onClick={handleDrawerClose}>
//               {theme.direction === "rtl" ? (
//                 <ChevronRightIcon />
//               ) : (
//                 <ChevronLeftIcon />
//               )}
//             </IconButton>
//           </DrawerHeader>
//           <Divider />
//           <TreeView
//             id="DrawerDatas"
//             aria-label="gmail"
//             defaultExpanded={["3"]}
//             defaultCollapseIcon={
//               <ArrowDropDownIcon
//                 style={{
//                   display: !show ? "none" : "",
//                 }}
//               />
//             }
//             defaultExpandIcon={
//               <ArrowRightIcon
//                 style={{
//                   display: !show ? "none" : "",
//                 }}
//               />
//             }
//             defaultEndIcon={<div style={{ width: 24 }} />}
//             sx={{ height: 264, flexGrow: 1, maxWidth: 240, overflowY: "auto" }}
//             // style={{ paddingTop: "30px" }}
//           >
//             <Link to="/dashboard" className="zzz">
//               <StyledTreeItem
//                 nodeId="1"
//                 labelText="Dashboard"
//                 labelIcon={DashboardIcon}
//               />
//             </Link>

//             <StyledTreeItem
//               nodeId="2"
//               labelText="Members"
//               labelIcon={SupervisorAccountIcon}
//             >
//               <Link to="/Newmembers" className="zzz">
//                 <StyledTreeItem nodeId="3" labelText="New Member" />
//               </Link>
//               <Link to="/Managemember" className="zzz">
//                 <StyledTreeItem nodeId="4" labelText="Manage Member" />
//               </Link>
//               <Link to="/Sponcserteam" className="zzz">
//                 <StyledTreeItem nodeId="5" labelText="Sponsor Team" />
//               </Link>
//               <Link to="/Memberverfication" className="zzz">
//                 <StyledTreeItem nodeId="6" labelText="Member Verification" />
//               </Link>
//               <Link to="/Memberlevelview" className="zzz">
//                 <StyledTreeItem nodeId="21" labelText="Member level view " />
//               </Link>
//             </StyledTreeItem>

//             <StyledTreeItem
//               nodeId="8"
//               labelText="E-Wallet"
//               labelIcon={PriceChangeIcon}
//             >
//               <Link to="/Earning" className="zzz">
//                 <StyledTreeItem nodeId="9" labelText="wallet fund" />
//               </Link>
//               <Link to="/Makepayments" className="zzz">
//                 <StyledTreeItem nodeId="10" labelText="Wallet Request" />
//               </Link>
//               <Link to="/Holdpayments" className="zzz">
//                 <StyledTreeItem nodeId="11" labelText="Wallet Hold" />
//               </Link>
//               <Link to="/WalletTransfer" className="zzz">
//                 <StyledTreeItem nodeId="22" labelText="Wallet Transfer" />
//               </Link>
//             </StyledTreeItem>

//             <StyledTreeItem
//               nodeId="12"
//               labelText="Ads"
//               labelIcon={AddCommentIcon}
//             >
//               <Link to="/Ads" className="zzz">
//                 <StyledTreeItem nodeId="13" labelText="Ads" />
//               </Link>
//               <Link to="/Addtypes" className="zzz">
//                 <StyledTreeItem nodeId="13" labelText="Ads Types" />
//               </Link>
//               <Link to="/Addcategories" className="zzz">
//                 <StyledTreeItem nodeId="14" labelText="Ads categories" />
//               </Link>
//             </StyledTreeItem>
//             <StyledTreeItem
//               nodeId="15"
//               labelText="Settings"
//               labelIcon={SettingsIcon}
//             >
//               <Link to="/Coins" className="zzz">
//                 <StyledTreeItem nodeId="16" labelText="Coins" />
//               </Link>
//               <Link to="/Transations" className="zzz">
//                 <StyledTreeItem nodeId="17" labelText="Transaction" />
//               </Link>
//               <Link to="/States" className="zzz">
//                 <StyledTreeItem nodeId="18" labelText="States" />
//               </Link>
//               <Link to="/Banks" className="zzz">
//                 <StyledTreeItem nodeId="19" labelText="Banks" />
//               </Link>
//               <Link to="/Notifications" className="zzz">
//                 <StyledTreeItem nodeId="20" labelText="Notifications" />
//               </Link>
//             </StyledTreeItem>
//             <Link to="/MemberAccess" className="zzz">
//               <StyledTreeItem
//                 nodeId="23"
//                 labelText="Roles & premission"
//                 labelIcon={SecurityIcon}
//               />
//             </Link>
//             <Link to="/Reports" className="zzz">
//               <StyledTreeItem
//                 nodeId="24"
//                 labelText="Reports"
//                 labelIcon={ReportIcon}
//               />
//             </Link>
//             <Link to="/Support" className="zzz">
//               <StyledTreeItem
//                 nodeId="14"
//                 labelText="Support"
//                 labelIcon={HelpIcon}
//               />
//             </Link>
//           </TreeView>
//         </Drawer>
//         {/* <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
//           <DrawerHeader />
//           <Router />
//         </Box> */}
//         {renderMobileMenu}
//         {renderMenu}
//       </Box>
//     </div>
//   );
// }

// export default Sidebars;
