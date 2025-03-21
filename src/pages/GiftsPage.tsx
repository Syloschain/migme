
import Layout from "@/components/layout/Layout";
import GiftStore from "@/components/gifts/GiftStore";

const GiftsPage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <GiftStore />
      </div>
    </Layout>
  );
};

export default GiftsPage;
