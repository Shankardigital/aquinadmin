import React from "react";
// import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/modules/Dashboard";
import Newmembers from "./components/modules/Members/Newmembers";
import Memberverfication from "./components/modules/Members/Memberverfication";
import Managemember from "./components/modules/Members/Managemember";
import Sponcserteam from "./components/modules/Members/Sponcserteam";
import Addtyps from "./components/modules/Ads/Addtyps";
import Addcategories from "./components/modules/Ads/Addcategories";
import Earning from "./components/modules/earning-payouts/Earning";
import Holdpayments from "./components/modules/earning-payouts/Holdpayments";
import Makepayments from "./components/modules/earning-payouts/Makepayments";
import WithdrawRequest from "./components/modules/ewallet/WithdrawRequest";
import Withdrawfund from "./components/modules/ewallet/Withdrawfund";
import Coins from "./components/modules/settings/Coins";
import Notifications from "./components/modules/settings/Notifications";
import States from "./components/modules/settings/States";
import Banks from "./components/modules/settings/Banks";
import Support from "./components/modules/Support/Support";
import MemberAccess from "./components/modules/Members/MemberAccess";
import Reports from "./components/modules/Reports/Reports";
import Transations from "./components/modules/settings/Transations";
import Ads from "./components/modules/Ads/Ads";
import Profile from "./components/modules/Profile";
// import Login from "./components/sign in/Login";
import Forgot from "./components/sign in/Forgot";
import Memberlevelview from "./components/modules/Members/Memberlevelview";
import WalletTransfer from "./components/modules/ewallet/WalletTransfer";

function Router() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} /> */}
        <Route path="/Memberlevelview" element={<Memberlevelview />} />
        <Route path="/WalletTransfer" element={<WalletTransfer />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Newmembers" element={<Newmembers />} />
        <Route path="/MemberAccess" element={<MemberAccess />} />
        <Route path="/Managemember" element={<Managemember />} />
        <Route path="/Sponcserteam" element={<Sponcserteam />} />
        <Route path="/Earning" element={<Earning />} />
        <Route path="/Holdpayments" element={<Holdpayments />} />
        <Route path="/Makepayments" element={<Makepayments />} />
        <Route path="/WithdrawRequest" element={<WithdrawRequest />} />
        <Route path="/Withdrawfund" element={<Withdrawfund />} />
        <Route path="/Coins" element={<Coins />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/States" element={<States />} />
        <Route path="/Banks" element={<Banks />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/Transations" element={<Transations />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/MemberAccess" element={<MemberAccess />} />
        <Route path="/Addtypes" element={<Addtyps />} />
        <Route path="/Addcategories" element={<Addcategories />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Newmembers" element={<Newmembers />} />
        <Route path="/Memberverfication" element={<Memberverfication />} />
        <Route path="/Ads" element={<Ads />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default Router;
