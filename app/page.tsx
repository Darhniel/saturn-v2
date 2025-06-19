import Hero from "@/components/Hero";
import SectionOne from "@/components/SectionOne";
import SectionTwo from "@/components/SectionTwo";
import FAQs from '@/components/FAQs'
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Header />
        <Hero />
        <SectionOne />
        <SectionTwo />
        <FAQs />
        <Footer />
      </main>
    </>
  );
}
