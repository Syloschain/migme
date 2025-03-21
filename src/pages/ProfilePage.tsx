
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <UserProfile />
      </div>
    </Layout>
  );
};

export default ProfilePage;
