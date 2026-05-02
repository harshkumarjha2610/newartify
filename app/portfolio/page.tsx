import PortfolioSection from "@/components/PortfolioSection";
import IndustriesSection from "@/components/IndustriesSection";
import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/lib/models/Portfolio";
import Category from "@/lib/models/Category";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortfolioPage() {
  await connectToDatabase();
  let projectData: any[] = [];
  let categoryData: any[] = [];
  try {
    const [categories, portfolios] = await Promise.all([
      Category.find({}).sort({ createdAt: -1 }).lean(),
      Portfolio.find({}).populate("categoryId").sort({ createdAt: -1 }).lean()
    ]);
    categoryData = categories.map((c: any) => ({ ...c, _id: c._id.toString(), id: c._id.toString() }));
    // Populate maps categoryId to the document. We need its _id, or just pass the full string.
    projectData = portfolios.map((p: any) => ({
      ...p,
      _id: p._id.toString(),
      id: p._id.toString(),
      categoryId: p.categoryId ? p.categoryId._id.toString() : null,
      categoryName: p.categoryId ? p.categoryId.name : "Uncategorized",
    }));
  } catch(e) {
    console.error("Error fetching portfolio data", e);
  }

  return (
    <div className="pt-20">
      <section className="py-32 bg-gradient-to-b from-primary/10 to-background text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground">Portfolio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
            Check out some of our latest projects and the industries we serve.
          </p>
        </div>
      </section>

      <PortfolioSection initialCategories={categoryData} initialProjects={projectData} />
      <IndustriesSection />
    </div>
  );
}
