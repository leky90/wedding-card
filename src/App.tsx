import { Cover } from "@/components/Cover";
import { FloatingButtons } from "@/components/FloatingButtons";
import { Countdown } from "@/components/sections/Countdown";
import { Couple } from "@/components/sections/Couple";
import { Events } from "@/components/sections/Events";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Guestbook } from "@/components/sections/Guestbook";
import { Hero } from "@/components/sections/Hero";
import { Rsvp } from "@/components/sections/Rsvp";
import { Story } from "@/components/sections/Story";
import { Petals } from "@/components/ui/Petals";

export default function App() {
  return (
    <>
      <Cover />
      <Petals />
      <main>
        <Hero />
        <Countdown />
        <Couple />
        <Story />
        <Gallery />
        <Events />
        <Rsvp />
        <Guestbook />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
