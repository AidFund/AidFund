import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import NotAuthorized from "pages/NotAuthorized";
import ProtectedRoute from "components/routing/ProtectedRoute";
import CampaignDetailsAndDonation from './pages/campaign-details-donation';
import HospitalVerificationDashboard from './pages/hospital-verification-dashboard';
import PatientCampaignCreation from './pages/patient-campaign-creation';
import UserProfileWalletManagement from './pages/user-profile-wallet-management';
import CampaignDiscoveryDashboard from './pages/campaign-discovery-dashboard';
import UserRegistrationLogin from './pages/user-registration-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CampaignDetailsAndDonation />} />
        <Route path="/campaign-details-donation" element={<CampaignDetailsAndDonation />} />
        <Route
          path="/hospital-verification-dashboard"
          element={<ProtectedRoute roles={["hospital"]} element={<HospitalVerificationDashboard />} />}
        />
        <Route
          path="/patient-campaign-creation"
          element={<ProtectedRoute roles={["patient"]} element={<PatientCampaignCreation />} />}
        />
        <Route
          path="/user-profile-wallet-management"
          element={<ProtectedRoute roles={["patient","donor","hospital"]} element={<UserProfileWalletManagement />} />}
        />
        <Route
          path="/campaign-discovery-dashboard"
          element={<ProtectedRoute roles={["patient","donor","hospital"]} element={<CampaignDiscoveryDashboard />} />}
        />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
