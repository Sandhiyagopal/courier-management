import { Routes, Route } from "react-router-dom";
import Layout from "../../components/layout/Layout";

import Home from "../Home";
import Login from "../auth/Login";
import TrackCourier from "../user/TrackCourier";
import Branches from "../user/Branches";
import AboutUs from "../user/AboutUs";
import Complaints from "../user/Complaints";
import Contact from "../user/Contact";

import AdminDashboard from "../admin/AdminDashboard";
import ManageBranches from "../admin/ManageBranches";
import ManageStaff from "../admin/ManageStaff";
import ViewCouriers from "../admin/ViewCouriers";
import ManageComplaints from "../admin/ManageComplaints";
import ViewEnquiries from "../admin/ViewEnquiries";
import UpdatePages from "../admin/UpdatePages";
import Reports from "../admin/Reports";

import StaffDashboard from "../staff/StaffDashboard";
import AddCourier from "../staff/AddCourier";
import UpdateStatus from "../staff/UpdateStatus";
import SearchCourier from "../staff/SearchCourier";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../../components/layout/AdminLayout";
import StaffLayout from "../../components/layout/StaffLayout";
import CourierDetails from "../staff/CourierDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with public Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="track" element={<TrackCourier />} />
        <Route path="branches" element={<Branches />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Admin routes with AdminLayout (sidebar + top bar) */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="branches" element={<ManageBranches />} />
        <Route path="staff" element={<ManageStaff />} />
        <Route path="couriers" element={<ViewCouriers />} />
        <Route path="complaints" element={<ManageComplaints />} />
        <Route path="enquiries" element={<ViewEnquiries />} />
        <Route path="pages" element={<UpdatePages />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route
        path="/staff"
        element={
          <PrivateRoute allowedRoles={['staff']}>
            <StaffLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<StaffDashboard />} />
        <Route path="add-courier" element={<AddCourier />} />
        <Route path="update-status" element={<UpdateStatus />} />
        <Route path="search" element={<SearchCourier />} />
        <Route path="courier-details/:id" element={<CourierDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;