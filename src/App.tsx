import { useState } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ScrollytellingSection } from './components/ScrollytellingSection'
import { PainSection } from './components/PainSection'
import { MetricsSection } from './components/MetricsSection'
import { PricingSection, type PlanId } from './components/PricingSection'
import { LeadFormSection } from './components/LeadFormSection'
import { Footer } from './components/Footer'

function App() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('base')

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ScrollytellingSection />
        <PainSection />
        <MetricsSection />
        <PricingSection onSelectPlan={setSelectedPlan} />
        <LeadFormSection selectedPlan={selectedPlan} />
      </main>
      <Footer />
    </>
  )
}

export default App
