import HeroLanding from '@/components/sections/HeroLanding';
import OriginSection from '@/components/sections/OriginSection';
import WorkSection from '@/components/sections/WorkSection';
import StackSection from '@/components/sections/StackSection';
import CollaborateSection from '@/components/sections/CollaborateSection';

export default function Home() {
  return (
    <main>
      <HeroLanding />
      <OriginSection />
      <WorkSection />
      <StackSection />
      <CollaborateSection />
    </main>
  );
}
