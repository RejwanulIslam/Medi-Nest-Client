import Hero7 from "@/components/hero7";
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
    <div className="grid gap-0">
      {/* Hero Section */}
      <Hero7 />

      {/* Featured Medicines */}
      <section className="max-w-6xl mx-auto w-full px-4 py-12">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 mb-3">
            Popular Medicines
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            Best Selling Products
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
            Trusted by thousands of customers across the country.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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