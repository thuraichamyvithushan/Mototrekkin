import React from 'react'
import ServiceCenter from '../components/ServiceCenter'
import RiderTraining from '../components/RiderTraining'
import MotorcycleTyres from '../components/MotorcycleTyres'
import OffroadEvent from '../components/OffroadEvent'
import OnroadEvent from '../components/OnroadEvent'
import RidingGear from '../components/RidingGear'
import SafetySystem from '../components/SafetySystem'
import RiderHelmet from '../components/RiderHelmet'
import HearingProtectionComponent from '../components/HearingProtectionComponent'
import GearGrid from '../components/GearGrid'
import ProductShowcase from '../components/ProductShowcase'
import CardSlider from '../components/CardSlider'
import HistorySection from '../components/HistorySection'


const Home = () => {
  return (
    <div>
   <ServiceCenter/>
   <RiderTraining/>
   <MotorcycleTyres/>
   <OffroadEvent/>
   <OnroadEvent/>
   <RidingGear/>
   <SafetySystem/>
   <RiderHelmet/>
   <HearingProtectionComponent/>
   <GearGrid/>
   <ProductShowcase/>
   <CardSlider/>
   <HistorySection/>
    </div>
  )
}

export default Home