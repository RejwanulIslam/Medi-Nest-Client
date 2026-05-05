import HeroSection from "@/components/HeroSection";
import AIRecommendations from "@/components/ai/AIRecommendations";
import HowItWorks from "@/components/homeComponent/Howitworks";
import WhyChooseUs from "@/components/homeComponent/Whychooseus";
import HomeFooters from "@/components/HomeFooters";
import MedicineHomeCard from "@/components/MedecineHomeCard";
import { medicineService } from "@/service/medicine.service";

export default async function Home() {
  const meddata = await medicineService.getMedicine()
  let slicemeddata = []
  if (meddata.data?.length >= 6) {
    slicemeddata = meddata?.data?.slice(0, 6)
  }
  if (meddata.data?.length < 6) {
    slicemeddata = meddata?.data
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Medicines */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <AIRecommendations context="MediNest medicines and healthcare products" />
        
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white dark:from-slate-900 to-transparent pointer-events-none" />
        
        <div className="relative text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 backdrop-blur-sm">
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Popular Medicines
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Best Selling</span> Products
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover our most trusted and frequently purchased healthcare products. Quality you can rely on, delivered right to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {slicemeddata?.map((item: any) => (
            <MedicineHomeCard key={item.id} sixdata={item} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* How It Works + Testimonials */}
      <HowItWorks />

      {/* Footer */}
      <HomeFooters />
    </div>
  );
}