import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AddCommentIcon from "@mui/icons-material/AddComment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";

export const menu = [
  {
    icon: <DashboardIcon  style={{ color: "white" }} fontSize="small"/>,
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: <SupervisorAccountIcon  style={{ color: "white" }} fontSize="small"/>,
    title: "Members",
    items: [
      {
        title: "New Member",
        to: "/Newmembers",
      },
      {
        title: "Manage Member",
        to: "/Managemember",
      },
      {
        title: "Sponsor Team",
        to: "/Managemember",
      },
      {
        title: "Member Verification",
        to: "/Memberverfication",
      },
      {
        title: "Member access",
        to: "/MemberAccess",
      },
    ],
  },

  {
    icon: <AccountBalanceWalletIcon style={{ color: "white" }} fontSize="small" />,
    title: "E-wallet",
    items: [
      {
        title: "Withdraw Fund",
        to: "/WithdrawRequest",
      },
      {
        title: "Withdraw Report",
        to: "/Withdrawfund",
      },
    ],
  },
  {
    icon: <PriceChangeIcon style={{ color: "white" }} fontSize="small" />,
    title: "Earning & payout",
    items: [
      {
        title: "Earnings",
        to: "/Earning",
      },
      {
        title: "Make Payment",
        to: "/Makepayments",
      },
      {
        title: "Hold payments",
        to: "/Holdpayments",
      },
    ],
  },
  {
    icon: <AddCommentIcon style={{ color: "white" }} fontSize="small"/>,
    title: "Ads",
    items: [
      {
        title: "Adds Types",
        to: "/Addtyps",
      },
      {
        title: "Adds categories",
        to: "/Addcategories",
      },
    ],
  },
  {
    icon: <SupportAgentIcon style={{ color: "white" }} fontSize="small" />,
    title: "Support",
    items: [
      {
        title: "Support",
        to: "/Support",
      },
    ],
  },
  {
    icon: <ReportIcon style={{ color: "white" }} fontSize="small"/>,
    title: "Reports",
    items: [
      {
        title: "Reports",
        to: "/Reports",
      },
    ],
  },

  {
    icon: <SettingsIcon style={{ color: "white" }}fontSize="small"/>,
    title: "Settings",
    items: [
      {
        title: "Coins",
        to: "/Coins",
      },
      {
        title: "Transaction",
        to: "/Transations",
      },
      {
        title: "States",
        to: "/States",
      },

      {
        title: "Banks",
        to: "/Banks",
      },
      {
        title: "Notifications",
        to: "/Notifications",
      },
    ],
  },
];
