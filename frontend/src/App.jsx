import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import MotorcycleAdventure from './pages/MotorcycleAdventure';
import EventCalendar2025 from './pages/EventCalendar2025';
import NzSouthIsland2025 from './components/events/NzSouthIsland2025';
import EventCalendar2026 from './pages/ventCalendar2026';
import RidgeRider2026 from './components/events/RidgeRider2026';
import NzSouthIsland2026 from './components/events/NzSouthIsland2026';
import MotorcycleHire from './pages/MotorcycleHire';
import Videos from './pages/Videos';

import AuthModal from './components/AuthModal';   // ✅ import modal
import MotorcycleAdventureOnroad from './pages/MotorcycleAdventureOnroad';
import OnroadEventCalendar2025 from './pages/OnroadEventCalendar2025';
import RoadRallye2025Onroad from './components/events/RoadRallye2025Onroad';
import HearingProtection from './pages/HearingProtection';
import EarMoldBooking from './pages/EarMoldBooking';
import TrainingPage from './pages/TrainingPage';
import OffRoadTrainingDetailPage from './pages/OffRoadTrainingDetailPage';
import RegistrationPage from './pages/RegistrationPage';




const App = () => {

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Pass modal control to Navbar */}
        <Navbar onUserClick={() => setIsAuthOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/motorcycle-adventures" element={<MotorcycleAdventure />} />
          <Route path="/motorcycle-adventures-onroad" element={<MotorcycleAdventureOnroad />} />
          <Route path="/event-calendar-2025" element={<EventCalendar2025 />} />
          <Route path="/event-calendar-2026" element={<EventCalendar2026 />} />
          <Route path="/onroad-event-calendar-2025" element={<OnroadEventCalendar2025 />} />
          <Route path="/MotorcycleHire" element={<MotorcycleHire />} />
          <Route path="/mototrekkin-videos" element={<Videos />} />
          <Route path="/hearing-protection" element={<HearingProtection/>} />
          <Route path="/hearing-protection/ear-mold-booking" element={<EarMoldBooking/>} />

          <Route path="/event-calendar-2025/NzSouthIsland2025" element={<NzSouthIsland2025 />} />
          <Route path="/event-calendar-2026/NzSouthIsland2026" element={<NzSouthIsland2026 />} />
          <Route path="/event-calendar-2026/RidgeRider2026" element={<RidgeRider2026 />} />
          <Route path="/onroad-event-calendar-2025/RoadRallye2025Onroad" element={<RoadRallye2025Onroad />} />


          <Route path="/training" element={<TrainingPage />} />
          <Route path="/off-road-training-detail" element={<OffRoadTrainingDetailPage />} />
          <Route path="/registration" element={<RegistrationPage />} />


        </Routes>

        <Footer />

        {/* Auth Modal */}
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </BrowserRouter>
  );
};

export default App;