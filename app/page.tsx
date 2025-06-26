import Hero from "@/components/saturn/Hero";
import SectionOne from "@/components/saturn/SectionOne";
import SectionTwo from "@/components/saturn/SectionTwo";
import FAQs from '@/components/saturn/FAQs'
import Nav from "@/components/saturn/Nav";
import Header from "@/components/saturn/Header";
import Footer from "@/components/saturn/Footer";

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
