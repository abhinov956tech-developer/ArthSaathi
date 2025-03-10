import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  BarChart2, 
  PiggyBank, 
  BookOpen, 
  Users, 
  Shield, 
  TrendingUp, 
  ArrowRight, 
  Play,
  CheckCircle,
  ExternalLink
} from "lucide-react";

// Modern Feature Card component with hover effects
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
      {/* Gradient background effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-emerald-500/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
      
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 p-4 rounded-xl mb-6 w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

// Modern animated statistic card with counter
const StatisticCard = ({ value, label }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.substring(0, value.length - 1));
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start > end) start = end;
      setCount(Math.floor(start));
      if (start === end) clearInterval(timer);
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700">
        <div className="text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">{count}{value.slice(-1)}</div>
        <div className="text-lg font-medium text-gray-900 dark:text-white">{label}</div>
      </div>
    </div>
  );
};

// Testimonial component
const Testimonial = ({ image, quote, name, title }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Quote mark in the background */}
      <div className="absolute -right-4 -bottom-4 text-9xl text-gray-100 dark:text-gray-700 opacity-80 font-serif z-0">
        "
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-100 dark:border-gray-700 shadow-md">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">{quote}</p>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">{name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Landingpage = () => {
  const features = [
    {
      icon: BarChart2,
      title: "Expense Tracking & Analytics",
      description: "Track your spending with smart categorization and get detailed insights through intuitive visualizations."
    },
    {
      icon: PiggyBank,
      title: "Budget Management",
      description: "Create and maintain customized budgets that adapt to your family's changing financial needs and goals."
    },
    {
      icon: BookOpen,
      title: "Financial Education",
      description: "Access interactive learning resources that help every family member understand key financial concepts."
    },
    {
      icon: Users,
      title: "Family-Focused Design",
      description: "Features designed specifically for middle-class families to address their unique financial challenges."
    },
    {
      icon: Shield,
      title: "Data-Driven Insights",
      description: "Receive personalized recommendations based on your spending patterns and financial behaviors."
    },
    {
      icon: TrendingUp,
      title: "Long-term Planning",
      description: "Set and track long-term financial goals with dedicated tools for savings, investments, and future planning."
    }
  ];

  const statistics = [
    { value: "65%", label: "Reduction in financial stress" },
    { value: "40%", label: "Increase in savings rate" },
    { value: "3x", label: "Financial literacy improvement" },
    { value: "85%", label: "User satisfaction" }
  ];
  
  const impactStats = [
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      value: "94%",
      label: "Cost Reduction",
      description: "Compared to traditional financial services"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>,
      value: "2.5x",
      label: "ROI Increase",
      description: "For families using our platform"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>,
      value: "10K+",
      label: "Active Families",
      description: "Across 5+ Districts"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden -z-5">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 0 L 40 0 40 40 0 40 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)"/>
            </svg>
          </div>
          
          {/* Floating circles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-600/5 to-emerald-600/5"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%)`,
                animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium text-sm shadow-sm">
                Redefining Family Finance
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 leading-tight tracking-tight">
                Financial Wellness for Every Family
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Empowering middle-class families with data-driven insights and personalized strategies for financial security and growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#signup" 
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] group"
                >
                  Sign Up for Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-8 py-4 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group"
                >
                  Learn More
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="max-w-5xl mx-auto relative mt-16">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur-md opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Browser mockup header */}
                <div className="w-full h-12 bg-gray-100 dark:bg-gray-700 flex items-center px-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="mx-auto bg-gray-200 dark:bg-gray-600 rounded-full h-6 w-64 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                    app.financialwellness.io
                  </div>
                </div>
                
                {/* Dashboard mockup */}
                <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-gray-800">
                  {/* Main content area */}
                  <div className="col-span-2">
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-4 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <div className="w-48 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-md"></div>
                        <div className="flex space-x-2">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-md"></div>
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-md"></div>
                        </div>
                      </div>
                      <div className="h-52 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-lg flex items-center justify-center">
                        <div className="w-3/4 h-36 bg-white dark:bg-gray-800 shadow-md rounded-lg"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                        <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                        <div className="w-3/4 h-8 bg-blue-200 dark:bg-blue-800 rounded mb-3"></div>
                        <div className="w-full h-28 bg-gray-100 dark:bg-gray-600 rounded"></div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                        <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                        <div className="w-3/4 h-8 bg-green-200 dark:bg-green-800 rounded mb-3"></div>
                        <div className="w-full h-28 bg-gray-100 dark:bg-gray-600 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="col-span-1 space-y-4">
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                      <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                      <div className="space-y-2">
                        <div className="flex items-center rounded-md p-2 bg-primary/10">
                          <div className="w-6 h-6 bg-primary rounded-full mr-3"></div>
                          <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center p-2">
                            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full mr-3"></div>
                            <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                      <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                      <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex justify-between p-2 border-b border-gray-100 dark:border-gray-600">
                            <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                            <div className="w-1/4 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 w-full h-8 bg-primary/20 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Trust badges */}
              <div className="flex justify-center mt-8 gap-6">
                {['Secure', 'Privacy-First', 'Data Protection'].map((badge, index) => (
                  <div key={index} className="flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            className="w-full h-16 text-white dark:text-gray-800"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium text-sm">
                Results That Matter
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
                Making a Real Difference
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our platform delivers measurable improvements in financial wellbeing for families across the country
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statistics.map((stat, index) => (
                <StatisticCard 
                  key={index} 
                  value={stat.value} 
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About/Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden" id="about">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-full h-full">
            <svg className="absolute top-0 right-0 h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="80" cy="20" r="20" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="95" cy="60" r="30" fill="rgba(16, 185, 129, 0.3)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side mission content */}
              <div>
                <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium text-sm">
                  Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
                  Addressing Financial Challenges
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  Our platform is designed to address the unique financial challenges faced by middle-class families today, providing tools and resources that promote financial well-being and stability.
                </p>
                
                <div className="space-y-5 mb-8">
                  {[
                    "Comprehensive financial education modules",
                    "Data-driven personalized recommendations",
                    "Goal-based savings and investment planning",
                    "Interactive budgeting and expense tracking",
                    "Family-focused financial wellness metrics"
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500/20 to-emerald-500/20 flex items-center justify-center mr-3">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="#learn-more" 
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Learn more about our approach
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
              
              {/* Right side image/illustration */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* Image mockup */}
                  <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-emerald-500/10 p-8 relative">
                    {/* Financial chart mockup */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4">
                        <div className="w-1/3 h-6 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
                        <div className="h-3/4 flex items-end space-x-3">
                          {[40, 60, 50, 80, 60, 85, 70, 90].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-gradient-to-t from-blue-500 to-emerald-500 rounded-t-sm" 
                                style={{height: `${height}%`}}
                              ></div>
                              <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 mt-2"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Features list */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Key Benefits</h3>
                    <div className="space-y-3">
                      {[
                        "Reduces financial anxiety by 65%",
                        "Increases average household savings by 40%",
                        "Improves financial literacy across all family members",
                        "Customized roadmaps for long-term financial goals"
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Features Section */}
<section className="py-20 relative overflow-hidden" id="features">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-emerald-50/50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
  
  {/* Pattern overlay */}
  <div className="absolute inset-0 opacity-10 -z-5">
    <svg width="100%" height="100%">
      <pattern id="hexagons" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
        <path d="M25,0 L50,15 L50,40 L25,55 L0,40 L0,15 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#hexagons)"/>
    </svg>
  </div>
  
  {/* Floating Elements - Static version without animations */}
  {[...Array(6)].map((_, i) => (
    <div
      key={i}
      className="absolute rounded-full bg-gradient-to-r from-blue-600/10 to-emerald-600/10"
      style={{
        width: Math.random() * 120 + 50,
        height: Math.random() * 120 + 50,
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ))}

  <div className="container mx-auto px-4 relative z-10">
    <div 
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm">
        Features
      </div>
      <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
        Key Platform Features
      </h2>
      <p className="text-muted-foreground text-lg dark:text-gray-300">
        Our comprehensive suite of tools is designed to address every aspect of family financial management
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <FeatureCard 
          key={index} 
          icon={feature.icon} 
          title={feature.title} 
          description={feature.description} 
          delay={0.1 * index}
        />
      ))}
    </div>
    
    {/* Feature showcase */}
    <div 
      className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left side - Feature details */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-6">
            <BarChart2 className="w-6 h-6" />
          </div>
          
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
            Advanced Analytics Dashboard
          </h3>
          
          <p className="text-muted-foreground mb-6">
            Our intuitive analytics dashboard provides comprehensive insights into your financial health. Track spending patterns, monitor budget adherence, and identify opportunities for improvement.
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "Real-time expense categorization",
              "Visual budget tracking",
              "Personalized savings recommendations",
              "Financial trend analysis"
            ].map((item, index) => (
              <li 
                key={index} 
                className="flex items-center"
              >
                <ChevronRight className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <a 
            href="/features/analytics" 
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Learn more about our analytics
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        
        {/* Right side - Feature preview */}
        <div className="relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 mix-blend-overlay"></div>
          
          {/* Feature image or mockup */}
          <div className="h-full bg-gray-100 dark:bg-gray-700 p-8 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="h-8 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center px-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="p-4">
                <div className="h-6 bg-blue-100 dark:bg-blue-900 rounded-md w-1/3 mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="h-24 bg-blue-50 dark:bg-blue-900/30 rounded-md"></div>
                  <div className="h-24 bg-emerald-50 dark:bg-emerald-900/30 rounded-md"></div>
                </div>
                <div className="h-32 bg-gray-50 dark:bg-gray-700 rounded-md mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-blue-500 rounded-md w-1/4"></div>
                  <div className="h-8 bg-emerald-500 rounded-md w-1/4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-md w-1/4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-md w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
);
};

export default Landingpage;