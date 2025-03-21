
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingUp, UserPlus, History } from "lucide-react";

const MerchantDashboard = () => {
  // In a real app these would come from API
  const stats = {
    totalCommission: 245,
    activeTags: 12,
    totalSales: 3250,
    pendingTransfers: 2
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-2 rounded">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-muted-foreground text-sm">This Month</span>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">Commission Earned</p>
              <h3 className="text-2xl font-bold">{stats.totalCommission} Credits</h3>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-xs flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-2 rounded">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-muted-foreground text-sm">Active</span>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">Tagged Customers</p>
              <h3 className="text-2xl font-bold">{stats.activeTags}</h3>
            </div>
            <div className="mt-4">
              <span className="text-blue-600 text-xs flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3 new this month
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-2 rounded">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-muted-foreground text-sm">Lifetime</span>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">Total Sales</p>
              <h3 className="text-2xl font-bold">{stats.totalSales} Credits</h3>
            </div>
            <div className="mt-4">
              <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                View sales history
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-100 p-2 rounded">
                <History className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-muted-foreground text-sm">Pending</span>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">Credit Transfers</p>
              <h3 className="text-2xl font-bold">{stats.pendingTransfers}</h3>
            </div>
            <div className="mt-4">
              <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                Complete transfers
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Track your sales and commissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem 
                  type="commission"
                  username="alexgamer92"
                  amount={25}
                  time="2 hours ago"
                />
                <ActivityItem 
                  type="transfer"
                  username="coolcat55"
                  amount={200}
                  time="Yesterday"
                />
                <ActivityItem 
                  type="commission"
                  username="sunnysmiles"
                  amount={15}
                  time="2 days ago"
                />
                <ActivityItem 
                  type="referral"
                  username="newmerchant1"
                  amount={10}
                  time="5 days ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Merchant Status</CardTitle>
              <CardDescription>Your current performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Commission Rate:</span>
                  <span className="font-medium text-green-600">10%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Merchant Level:</span>
                  <span className="font-medium">Silver</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Since:</span>
                  <span className="font-medium">March 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Next Level At:</span>
                  <span className="font-medium">5,000 Credits</span>
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">View Merchant Perks</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  type: 'commission' | 'transfer' | 'referral';
  username: string;
  amount: number;
  time: string;
}

const ActivityItem = ({ type, username, amount, time }: ActivityItemProps) => {
  const getTypeDetails = () => {
    switch (type) {
      case 'commission':
        return {
          icon: <TrendingUp className="h-4 w-4 text-green-500" />,
          label: "Commission earned",
          description: `${username} spent credits`
        };
      case 'transfer':
        return {
          icon: <CreditCard className="h-4 w-4 text-blue-500" />,
          label: "Credit transfer",
          description: `Transferred to ${username}`
        };
      case 'referral':
        return {
          icon: <UserPlus className="h-4 w-4 text-purple-500" />,
          label: "Referral bonus",
          description: `From sub-merchant ${username}`
        };
    }
  };

  const details = getTypeDetails();

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20">
      <div className="flex items-center gap-3">
        <div className="bg-muted p-2 rounded-full">
          {details.icon}
        </div>
        <div>
          <p className="font-medium text-sm">{details.label}</p>
          <p className="text-xs text-muted-foreground">{details.description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{amount} Credits</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
};

export default MerchantDashboard;
