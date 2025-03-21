
import Layout from "@/components/layout/Layout";
import FriendsList from "@/components/social/FriendsList";

const FriendsPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <FriendsList />
      </div>
    </Layout>
  );
};

export default FriendsPage;
