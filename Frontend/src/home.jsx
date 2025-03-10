import * as React from "react";
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Legend, 
  Line, 
  LineChart, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PieChart, 
  BarChart2, 
  ExternalLink,
  Clock,
  RefreshCw
} from "lucide-react";

// API service functions
const api = {
  // Base URL for the API
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.yourdomain.com',
  
  // Helper method for making API requests
  async fetchData(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          ...options.headers
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },
  
  // Dashboard data endpoints
  async getDashboardSummary() {
    return this.fetchData('/dashboard/summary');
  },
  
  async getFinancialData(period = 'quarterly') {
    return this.fetchData(`/financial/overview?period=${period}`);
  },
  
  async getRecentTransactions(limit = 5) {
    return this.fetchData(`/transactions/recent?limit=${limit}`);
  },
  
  async getFinancialNews(limit = 5) {
    return this.fetchData(`/news/financial?limit=${limit}`);
  },
  
  async getExpenseBreakdown() {
    return this.fetchData('/expenses/breakdown');
  },
  
  async getInvestmentPortfolio() {
    return this.fetchData('/investments/portfolio');
  },
  
  async getUserProfile() {
    return this.fetchData('/user/profile');
  }
};

const Dashboard = () => {
  // State management for all data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartPeriod, setChartPeriod] = useState("quarterly");
  const [chartType, setChartType] = useState("bar");
  const [dashboardData, setDashboardData] = useState({
    userProfile: { name: "" },
    summaryCards: [],
    financialData: { quarterly: [], detailed: [] },
    recentTransactions: [],
    financialNews: [],
    expenseBreakdown: [],
    investmentPortfolio: []
  });
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }));

  // Fetch all data when component mounts
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch data when chart period changes
  useEffect(() => {
    fetchFinancialData();
  }, [chartPeriod]);

  // Function to fetch all dashboard data
  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [
        userProfile,
        summaryData,
        financialData,
        transactions,
        news,
        expenses,
        investments
      ] = await Promise.all([
        api.getUserProfile(),
        api.getDashboardSummary(),
        api.getFinancialData(chartPeriod),
        api.getRecentTransactions(),
        api.getFinancialNews(),
        api.getExpenseBreakdown(),
        api.getInvestmentPortfolio()
      ]);
      
      setDashboardData({
        userProfile,
        summaryCards: summaryData,
        financialData: {
          [chartPeriod]: financialData,
          // Keep the other period data if we have it
          ...dashboardData.financialData
        },
        recentTransactions: transactions,
        financialNews: news,
        expenseBreakdown: expenses,
        investmentPortfolio: investments
      });
      
      setLastUpdated(new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }));
    } catch (err) {
      setError("Failed to load dashboard data. Please try again later.");
      console.error("Dashboard data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch just the financial data when period changes
  const fetchFinancialData = async () => {
    if (dashboardData.financialData[chartPeriod]?.length > 0) {
      // Already have this data, no need to fetch
      return;
    }
    
    try {
      const financialData = await api.getFinancialData(chartPeriod);
      setDashboardData(prevData => ({
        ...prevData,
        financialData: {
          ...prevData.financialData,
          [chartPeriod]: financialData
        }
      }));
    } catch (err) {
      console.error("Financial data fetch error:", err);
    }
  };

  // Handle data refetching
  const handleRefresh = () => {
    fetchDashboardData();
  };

  // Fallback data in case API is not available
  const fallbackData = {
    summaryCards: [
      {
        id: 1,
        title: "Total Balance",
        value: "₹1,00,000",
        change: 10,
        trend: "up",
        icon: <DollarSign className="h-6 w-6" />,
        color: "bg-blue-50 text-blue-700",
        iconColor: "bg-blue-100"
      },
      {
        id: 2,
        title: "Monthly Expenses",
        value: "₹1,00,000",
        change: -2.5,
        trend: "down",
        icon: <CreditCard className="h-6 w-6" />,
        color: "bg-rose-50 text-rose-700",
        iconColor: "bg-rose-100"
      },
      {
        id: 3,
        title: "Monthly Investment",
        value: "₹1,00,000",
        change: 15.8,
        trend: "up",
        icon: <PieChart className="h-6 w-6" />,
        color: "bg-green-50 text-green-700",
        iconColor: "bg-green-100"
      },
      {
        id: 4,
        title: "Swing Rate",
        value: "₹1,00,000",
        change: 20.5,
        trend: "up",
        icon: <BarChart2 className="h-6 w-6" />,
        color: "bg-purple-50 text-purple-700",
        iconColor: "bg-purple-100"
      }
    ],
    financialData: {
      quarterly: [
        { date: "Apr", investment: 7500, expense: 5800 },
        { date: "May", investment: 8200, expense: 6200 },
        { date: "Jun", investment: 9100, expense: 5900 }
      ],
      detailed: [
        { date: "Apr 1-10", investment: 2400, expense: 1750 },
        { date: "Apr 11-20", investment: 2500, expense: 1800 },
        { date: "Apr 21-30", investment: 2400, expense: 1850 },
        { date: "May 1-10", investment: 2600, expense: 1900 },
        { date: "May 11-20", investment: 2800, expense: 2300 },
        { date: "May 21-31", investment: 2600, expense: 1800 },
        { date: "Jun 1-10", investment: 3000, expense: 2100 },
        { date: "Jun 11-20", investment: 3100, expense: 1750 },
        { date: "Jun 21-30", investment: 2900, expense: 1850 }
      ]
    }
  };

  // Get the current financial data based on period
  const getCurrentFinancialData = () => {
    return dashboardData.financialData[chartPeriod]?.length > 0 
      ? dashboardData.financialData[chartPeriod] 
      : fallbackData.financialData[chartPeriod];
  };

  // Render the appropriate chart based on selected type
  const renderChart = () => {
    const data = getCurrentFinancialData();
    
    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#fff", 
                borderRadius: "8px", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none"
              }} 
            />
            <Legend />
            <Bar dataKey="investment" name="Investment" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name="Expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#fff", 
                borderRadius: "8px", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none"
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="investment" name="Investment" stroke="#4F46E5" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" name="Expense" stroke="#EF4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#fff", 
                borderRadius: "8px", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none"
              }} 
            />
            <Legend />
            <Area type="monotone" dataKey="investment" name="Investment" fill="#4F46E580" stroke="#4F46E5" />
            <Area type="monotone" dataKey="expense" name="Expense" fill="#EF444480" stroke="#EF4444" />
          </AreaChart>
        </ResponsiveContainer>
      );
    }
  };

  // Loading state UI
 // This should be changed to only check loading state
if (isLoading) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <RefreshCw className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-medium text-gray-900">Loading your dashboard...</h2>
        <p className="text-gray-500 mt-2">Please wait while we fetch your financial data</p>
      </div>
    </div>
  );
}

// Similarly, only check error state
if (error) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-rose-600">Error Loading Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{error}</p>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Try Again
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

  // Use real data if available, otherwise use fallback
  const summaryCards = dashboardData.summaryCards.length > 0 
    ? dashboardData.summaryCards 
    : fallbackData.summaryCards;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hello, {dashboardData.userProfile?.name || "Sourabh Ghosh"}!
            </h1>
            <p className="text-gray-600 mt-1">Every small step brings you closer to your big dreams.</p>
          </div>
          <div className="text-right flex items-center">
            <button 
              onClick={handleRefresh} 
              className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-lg font-medium text-gray-900">{lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card) => (
          <Card key={card.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                  <div className="flex items-center mt-2">
                    {card.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-rose-600 mr-1" />
                    )}
                    <span className={card.trend === "up" ? "text-green-600 text-sm" : "text-rose-600 text-sm"}>
                      {card.change > 0 ? "+" : ""}{card.change}% 
                      <span className="text-gray-500"> from last month</span>
                    </span>
                  </div>
                </div>
                <div className={`${card.iconColor} p-2 rounded-lg`}>
                  {card.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Overview */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Track your expenses and investments</CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="bg-gray-100 rounded-lg p-1">
                  <button 
                    className={`p-1 rounded ${chartType === 'bar' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setChartType("bar")}
                    aria-label="Bar chart"
                  >
                    <BarChart2 className="h-4 w-4" />
                  </button>
                  <button 
                    className={`p-1 rounded ${chartType === 'line' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setChartType("line")}
                    aria-label="Line chart"
                  >
                    <TrendingUp className="h-4 w-4" />
                  </button>
                  <button 
                    className={`p-1 rounded ${chartType === 'area' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setChartType("area")}
                    aria-label="Area chart"
                  >
                    <PieChart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="quarterly" className="mb-4">
              <TabsList className="grid w-64 grid-cols-2">
                <TabsTrigger 
                  value="quarterly" 
                  onClick={() => setChartPeriod("quarterly")}
                >
                  Quarterly
                </TabsTrigger>
                <TabsTrigger 
                  value="detailed" 
                  onClick={() => setChartPeriod("detailed")}
                >
                  Detailed
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {renderChart()}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your last 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(dashboardData.recentTransactions.length > 0 
                ? dashboardData.recentTransactions 
                : [
                    { id: 1, title: "Grocery Shopping", amount: "₹2,500", date: "Today", category: "Expense" },
                    { id: 2, title: "Salary Deposit", amount: "₹80,000", date: "Mar 5", category: "Income" },
                    { id: 3, title: "Stock Investment", amount: "₹15,000", date: "Mar 3", category: "Investment" },
                    { id: 4, title: "Electricity Bill", amount: "₹1,200", date: "Mar 2", category: "Expense" },
                    { id: 5, title: "Dividend Income", amount: "₹3,200", date: "Mar 1", category: "Income" }
                  ]
              ).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{transaction.title}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={
                      transaction.category === "Income" ? "text-green-600 font-medium" : 
                      transaction.category === "Expense" ? "text-rose-600 font-medium" : 
                      "text-blue-600 font-medium"
                    }>
                      {transaction.category === "Income" ? "+" : transaction.category === "Expense" ? "-" : ""}
                      {transaction.amount}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial News Section */}
      <div className="mt-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Financial News</CardTitle>
                <CardDescription>Latest updates affecting your portfolio</CardDescription>
              </div>
              <button className="text-sm text-blue-600 hover:underline flex items-center">
                View all <ExternalLink className="h-3 w-3 ml-1" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(dashboardData.financialNews.length > 0 
                ? dashboardData.financialNews
                : [
                    {
                      id: 1,
                      title: "RBI Holds Interest Rates Steady for Third Consecutive Meeting",
                      source: "Economic Times",
                      time: "2 hours ago",
                      category: "Policy",
                      impact: "neutral"
                    },
                    {
                      id: 2,
                      title: "Sensex Surges 500 Points on Strong Global Cues",
                      source: "Business Standard",
                      time: "3 hours ago",
                      category: "Markets",
                      impact: "positive"
                    },
                    {
                      id: 3,
                      title: "Rupee Gains 15 Paise Against US Dollar",
                      source: "Mint",
                      time: "5 hours ago",
                      category: "Currency",
                      impact: "positive"
                    },
                    {
                      id: 4,
                      title: "Inflation Edges Higher to 5.2% in February",
                      source: "Financial Express",
                      time: "Yesterday",
                      category: "Economy",
                      impact: "negative"
                    },
                    {
                      id: 5,
                      title: "New Tax Rules for Mutual Fund Investors from April 1",
                      source: "MoneyControl",
                      time: "Yesterday",
                      category: "Tax",
                      impact: "neutral"
                    }
                  ]
              ).map((news) => (
                <div key={news.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{news.title}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      news.impact === "positive" ? "bg-green-100 text-green-800" :
                      news.impact === "negative" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {news.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{news.source}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {news.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid - Expense and Investment Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Expense Breakdown */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Where your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(dashboardData.expenseBreakdown.length > 0 
                ? dashboardData.expenseBreakdown
                : [
                    { category: "Housing", amount: "₹40,000", percentage: 40 },
                    { category: "Food", amount: "₹25,000", percentage: 25 },
                    { category: "Transportation", amount: "₹15,000", percentage: 15 },
                    { category: "Entertainment", amount: "₹10,000", percentage: 10 },
                    { category: "Others", amount: "₹10,000", percentage: 10 }
                  ]
              ).map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-medium">{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Portfolio */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Investment Portfolio</CardTitle>
            <CardDescription>Current allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(dashboardData.investmentPortfolio.length > 0
                ? dashboardData.investmentPortfolio
                : [
                    { category: "Stocks", amount: "₹50,000", percentage: 50, color: "bg-blue-500" },
                    { category: "Mutual Funds", amount: "₹30,000", percentage: 30, color: "bg-green-500" },
                    { category: "Fixed Deposits", amount: "₹10,000", percentage: 10, color: "bg-yellow-500" },
                    { category: "Gold", amount: "₹5,000", percentage: 5, color: "bg-purple-500" },
                    { category: "Others", amount: "₹5,000", percentage: 5, color: "bg-gray-500" }
                  ]
              ).map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-medium">{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;