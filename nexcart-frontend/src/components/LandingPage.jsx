import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";
import HowItWorks from "./home/HowItWorks";
import PromoSubscribe from "./home/PromoSubscribe";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <HowItWorks />
      <PromoSubscribe />
    </>
  );
}
