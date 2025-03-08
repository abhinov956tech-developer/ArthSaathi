import React, { useState } from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  Trophy, 
  BarChart3, 
  BadgeCheck, 
  Search, 
  Clock, 
  TrendingUp,
  GraduationCap,
  Filter,
  Star,
  ChevronRight,
  ChevronDown,
  CircleDollarSign,
  CircleUserRound,
  HandCoins,
  NotebookText,
  Bitcoin,
  CircleArrowLeft,
  CircleArrowRight,
  Users
} from 'lucide-react';

const Learn = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter courses based on search term and active tab
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || course.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Financial Learning Center</h1>
            <p className="text-slate-600 max-w-2xl">
              Expand your financial knowledge with interactive courses, simulations, and expert guidance to make smarter money decisions.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="bg-blue-50 px-3 py-1.5 rounded-full flex items-center space-x-1">
              <Trophy size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">5 courses completed</span>
            </div>
            <div className="bg-emerald-50 px-3 py-1.5 rounded-full flex items-center space-x-1">
              <BadgeCheck size={16} className="text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">2 certificates earned</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:w-3/5">
              <h2 className="text-2xl font-bold mb-2">Investing Fundamentals</h2>
              <p className="mb-4 text-blue-100">Master the basics of investing in just 15 days with our most popular interactive course</p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span className="text-sm">12,342 enrolled</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span className="text-sm">15 days</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-yellow-300" />
                  <span className="text-sm">4.8/5 (324 reviews)</span>
                </div>
              </div>
              <button className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-50 transition duration-200">
                <PlayCircle size={18} />
                <span>Continue Learning</span>
              </button>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg w-44 h-44 flex flex-col items-center justify-center">
                <div className="radial-progress w-20 h-20 mb-3" style={{'--value': 65, '--size': '5rem', '--thickness': '0.5rem'}}>
                  <div className="text-lg font-bold">65%</div>
                </div>
                <span className="text-sm text-blue-100">Your progress</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-start md:items-center mb-8">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search for courses..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-3 w-full md:w-auto">
            <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 flex items-center space-x-2">
              <Filter size={16} />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>
        
        {/* Course categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {learningCategories.map(category => (
            <div 
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.bgColor}`}>
                  {category.icon}
                </div>
                <div className="flex items-center space-x-1 text-slate-500 text-sm">
                  <BookOpen size={14} />
                  <span>{category.courseCount} courses</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{category.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{category.description}</p>
              <button className="flex items-center font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                <span>Explore courses</span>
                <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Latest courses */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {activeTab === 'all' ? 'All Courses' : tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              View all <ChevronRight size={16} />
            </button>
          </div>
          
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <Search size={28} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No courses found</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                We couldn't find any courses matching your search criteria. Try adjusting your filters or search term.
              </p>
              <button 
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                onClick={() => {
                  setSearchTerm('');
                  setActiveTab('all');
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition duration-200">
                  <div className="relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-slate-700">
                      {course.difficulty}
                    </div>
                    {course.new && (
                      <div className="absolute top-3 right-3 bg-blue-600 px-2.5 py-1 rounded-full text-xs font-medium text-white">
                        New
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center space-x-1 mb-2">
                      <span className={`w-2 h-2 rounded-full ${course.interactive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      <span className="text-xs text-slate-600">
                        {course.interactive ? 'Interactive Course' : 'Video Course'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-slate-300'} fill={i < Math.floor(course.rating) ? 'currentColor' : 'none'} />
                        ))}
                        <span className="text-xs text-slate-600">({course.reviewCount})</span>
                      </div>
                    </div>
                    {course.progress ? (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4"></div>
                    )}
                    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-lg font-medium transition duration-200">
                      {course.progress ? 'Continue Learning' : 'Start Learning'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Learning paths */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recommended Learning Paths</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              View all <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map(path => (
              <div key={path.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition duration-200 flex">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${path.bgColor} mr-4 flex-shrink-0`}>
                  {path.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-slate-900 mb-1">{path.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{path.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <BookOpen size={14} />
                        <span>{path.courseCount} courses</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <Clock size={14} />
                        <span>{path.duration}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                      <span>View Path</span>
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Simulations */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Financial Simulations</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              View all <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {simulations.map(simulation => (
              <div key={simulation.id} className={`${simulation.bgColor} rounded-xl p-5 hover:shadow-md transition duration-200`}>
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center backdrop-blur-sm mb-4">
                  {simulation.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{simulation.title}</h3>
                <p className={`${simulation.textColor} text-sm mb-4`}>{simulation.description}</p>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-2 px-4 rounded-lg text-sm font-medium w-full transition duration-200">
                  Start Simulation
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Learn from experts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Learn from Financial Experts</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              View all experts <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Ask Financial Questions</h3>
                <p className="text-slate-600 mb-6">
                  Get personalized advice from certified financial advisors. Submit your questions and get expert insights.
                </p>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <textarea 
                    placeholder="Type your financial question here..." 
                    className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 h-24"
                  />
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 text-sm text-slate-600">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        <span>Make question public</span>
                      </label>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
                      Submit Question
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Financial Advisor"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-medium text-slate-900">Sarah Johnson</h4>
                        <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full ml-2">
                          Certified Advisor
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm">
                        Answered 2 hours ago
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h5 className="font-medium text-slate-900 mb-2">
                      Q: How should I prioritize paying off student loans vs investing in my 401k?
                    </h5>
                    <p className="text-slate-700">
                      It depends on the interest rate of your loans and your employer's 401k match. 
                      As a general rule, first contribute enough to get the full employer match 
                      (that's free money), then focus on paying off high-interest debt (above 6%), 
                      then max out tax-advantaged accounts like 401k and IRA.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <button className="text-slate-600 hover:text-blue-600 flex items-center space-x-1">
                        <Star size={16} />
                        <span>Helpful (23)</span>
                      </button>
                      <button className="text-slate-600 hover:text-blue-600">
                        Share
                      </button>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      View full answer <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Featured Experts</h3>
                
                {experts.map((expert, index) => (
                  <div key={expert.id} className={`flex items-start gap-3 ${index !== experts.length - 1 ? 'mb-5 pb-5 border-b border-slate-200' : ''}`}>
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-slate-900">{expert.name}</h4>
                        {expert.verified && (
                          <span className="ml-1 text-blue-600">
                            <BadgeCheck size={14} />
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm mb-1">{expert.specialty}</p>
                      <div className="flex items-center space-x-1 text-xs text-slate-500 mb-2">
                        <Star size={12} className="text-yellow-400" fill="currentColor" />
                        <span>{expert.rating} ({expert.reviewCount} reviews)</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View profile
                      </button>
                    </div>
                  </div>
                ))}
                
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium mt-2 transition duration-200">
                  View All Experts
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Data 
const tabs = [
  { id: 'all', label: 'All Topics' },
  { id: 'investing', label: 'Investing' },
  { id: 'budgeting', label: 'Budgeting' },
  { id: 'retirement', label: 'Retirement' },
  { id: 'taxes', label: 'Taxes' },
  { id: 'debt', label: 'Debt Management' },
  { id: 'crypto', label: 'Cryptocurrency' },
];

const learningCategories = [
  {
    id: 1,
    title: 'Investing Basics',
    description: 'Learn how to grow your wealth with stocks, bonds, and other investment vehicles',
    icon: <BarChart3 size={24} className="text-blue-600" />,
    bgColor: 'bg-blue-50',
    courseCount: 16
  },
  {
    id: 2,
    title: 'Budget Management',
    description: 'Master techniques to track spending, save money, and achieve financial goals',
    icon: <CircleDollarSign size={24} className="text-emerald-600" />,
    bgColor: 'bg-emerald-50',
    courseCount: 12
  },
  {
    id: 3,
    title: 'Retirement Planning',
    description: 'Prepare for your future with strategies for long-term financial security',
    icon: <TrendingUp size={24} className="text-amber-600" />,
    bgColor: 'bg-amber-50',
    courseCount: 8
  },
  {
    id: 4,
    title: 'Debt Management',
    description: 'Learn effective strategies to manage and eliminate debt',
    icon: <HandCoins size={24} className="text-rose-600" />,
    bgColor: 'bg-rose-50',
    courseCount: 10
  },
  {
    id: 5,
    title: 'Tax Strategies',
    description: 'Understand tax implications and optimize your financial decisions',
    icon: <BookOpen size={24} className="text-indigo-600" />,
    bgColor: 'bg-indigo-50',
    courseCount: 7
  },
  {
    id: 6,
    title: 'Financial Psychology',
    description: 'Understand your relationship with money and develop healthy financial habits',
    icon: <GraduationCap size={24} className="text-purple-600" />,
    bgColor: 'bg-purple-50',
    courseCount: 9
  },
];

const courses = [
  {
    id: 1,
    title: 'Investing 101: Building Your First Portfolio',
    description: 'Learn the fundamentals of investing and how to create a diversified portfolio that aligns with your financial goals.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'investing',
    difficulty: 'Beginner',
    duration: '4 weeks',
    rating: 4.8,
    reviewCount: 1245,
    interactive: true,
    progress: 65,
    new: false
  },
  {
    id: 2,
    title: 'Personal Budgeting Mastery',
    description: 'Take control of your finances with effective budgeting techniques. Learn to track expenses, set goals, and save more.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'budgeting',
    difficulty: 'Beginner',
    duration: '3 weeks',
    rating: 4.7,
    reviewCount: 982,
    interactive: true,
    progress: 30,
    new: false
  },
  {
    id: 3,
    title: 'Retirement Planning Strategies',
    description: 'Prepare for your future with effective retirement planning. Learn about 401(k)s, IRAs, and creating sustainable income.',
    image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'retirement',
    difficulty: 'Intermediate',
    duration: '5 weeks',
    rating: 4.9,
    reviewCount: 745,
    interactive: false,
    progress: 0,
    new: true
  },
  {
    id: 4,
    title: 'Tax Optimization Techniques',
    description: 'Maximize your tax savings with legal strategies and deductions. Understand tax implications for different financial decisions.',
    image: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd29?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'taxes',
    difficulty: 'Advanced',
    duration: '4 weeks',
    rating: 4.6,
    reviewCount: 531,
    interactive: false,
    progress: 0,
    new: false
  },
  {
    id: 5,
    title: 'Debt Freedom Blueprint',
    description: 'Develop a strategic plan to eliminate debt and build a strong financial foundation. Learn various debt payoff methods.',
    image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'debt',
    difficulty: 'Beginner',
    duration: '6 weeks',
    rating: 4.8,
    reviewCount: 1102,
    interactive: true,
    progress: 10,
    new: false
  },
  {
    id: 6,
    title: 'Cryptocurrency Fundamentals',
    description: 'Understand blockchain technology, major cryptocurrencies, and how to safely invest in digital assets.',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'crypto',
    difficulty: 'Intermediate',
    duration: '4 weeks',
    rating: 4.5,
    reviewCount: 876,
    interactive: true,
    progress: 0,
    new: true
  },
];

// Complete the learningPaths array
const learningPaths = [
  {
    id: 1,
    title: 'Financial Independence Journey',
    description: 'A comprehensive path to achieve financial freedom through smart investing and wealth building strategies.',
    icon: <TrendingUp size={24} className="text-blue-600" />,
    bgColor: 'bg-blue-50',
    courseCount: 8,
    duration: '6 months',
    courses: [1, 2, 5]
  },
  {
    id: 2,
    title: 'First-Time Investor Path',
    description: 'Learn the essentials of investing with a beginner-friendly approach to building your first portfolio.',
    icon: <BarChart3 size={24} className="text-emerald-600" />,
    bgColor: 'bg-emerald-50',
    courseCount: 5,
    duration: '3 months',
    courses: [1, 6]
  },
  {
    id: 3,
    title: 'Debt-Free Living',
    description: 'Strategies to eliminate debt, repair credit, and build a solid financial foundation for the future.',
    icon: <BadgeCheck size={24} className="text-rose-600" />,
    bgColor: 'bg-rose-50',
    courseCount: 6,
    duration: '4 months',
    courses: [2, 5]
  },
  {
    id: 4,
    title: 'Retirement Readiness',
    description: 'Prepare for a secure retirement with planning strategies, investment approaches, and income management.',
    icon: <GraduationCap size={24} className="text-amber-600" />,
    bgColor: 'bg-amber-50',
    courseCount: 7,
    duration: '5 months',
    courses: [3, 4]
  }
];

// Create the simulations array
const simulations = [
  {
    id: 1,
    title: 'Stock Market Simulator',
    description: 'Practice investing with $100,000 of virtual money in real market conditions',
    icon: <BarChart3 size={24} className="text-white" />,
    bgColor: 'bg-gradient-to-br from-blue-500 to-blue-700',
    textColor: 'text-blue-100',
    difficulty: 'Intermediate',
    duration: '1-2 hours'
  },
  {
    id: 2,
    title: 'Retirement Calculator',
    description: 'Visualize your retirement savings growth based on different investment strategies',
    icon: <TrendingUp size={24} className="text-white" />,
    bgColor: 'bg-gradient-to-br from-amber-500 to-amber-700',
    textColor: 'text-amber-100',
    difficulty: 'Beginner',
    duration: '30 minutes'
  },
  {
    id: 3,
    title: 'Debt Payoff Planner',
    description: 'Compare different debt payoff methods and create a personalized plan',
    icon: <HandCoins size={24} className="text-white" />,
    bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    textColor: 'text-emerald-100',
    difficulty: 'Beginner',
    duration: '45 minutes'
  }
];

// Create the experts array
const experts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialty: 'Retirement Planning',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    verified: true,
    rating: 4.9,
    reviewCount: 237,
    credentials: 'CFP, ChFC',
    experience: '15+ years'
  },
  {
    id: 2,
    name: 'Michael Chen',
    specialty: 'Investment Strategies',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    verified: true,
    rating: 4.8,
    reviewCount: 189,
    credentials: 'CFA, MBA',
    experience: '12+ years'
  },
  {
    id: 3,
    name: 'Aisha Patel',
    specialty: 'Tax Optimization',
    avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
    verified: true,
    rating: 4.7,
    reviewCount: 156,
    credentials: 'CPA, EA',
    experience: '10+ years'
  },
  {
    id: 4,
    name: 'James Wilson',
    specialty: 'Debt Management',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    verified: false,
    rating: 4.6,
    reviewCount: 128,
    credentials: 'AFC',
    experience: '8+ years'
  }
];

// Optional - Additional features that could be added:
// Certifications and badges that can be earned
const certifications = [
  {
    id: 1,
    title: 'Certified Financial Foundations',
    description: 'Master the basics of personal finance and budgeting',
    requirements: 'Complete 3 core courses and pass the final assessment',
    image: '/badges/financial-foundations.svg',
    courses: [1, 2, 5]
  },
  {
    id: 2,
    title: 'Investment Specialist',
    description: 'Demonstrate advanced knowledge of investment strategies',
    requirements: 'Complete 2 investment courses and the stock market simulation',
    image: '/badges/investment-specialist.svg',
    courses: [1, 3, 6]
  },
  {
    id: 3,
    title: 'Retirement Planner',
    description: 'Show expertise in retirement planning and strategies',
    requirements: 'Complete the retirement course and create a retirement plan',
    image: '/badges/retirement-planner.svg',
    courses: [3]
  }
];

// Quizzes and assessments
const quizzes = [
  {
    id: 1,
    title: 'Investment Knowledge Check',
    description: 'Test your understanding of basic investment concepts',
    questionCount: 10,
    timeLimit: '15 minutes',
    passScore: 70,
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'Retirement Readiness Assessment',
    description: 'Evaluate your retirement preparation and knowledge',
    questionCount: 15,
    timeLimit: '20 minutes',
    passScore: 75,
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'Tax Strategy Mastery',
    description: 'Test your knowledge of tax-efficient investing',
    questionCount: 20,
    timeLimit: '25 minutes',
    passScore: 80,
    difficulty: 'Advanced'
  }
];

// Learning communities or discussion forums
const communities = [
  {
    id: 1,
    title: 'Beginner Investors',
    description: 'A supportive community for those just starting their investment journey',
    memberCount: 2453,
    topics: ['Basics', 'First Steps', 'Common Questions'],
    activeDiscussions: 34
  },
  {
    id: 2,
    title: 'Debt Freedom Seekers',
    description: 'Support and strategies for becoming debt-free',
    memberCount: 1872,
    topics: ['Debt Snowball', 'Credit Repair', 'Success Stories'],
    activeDiscussions: 27
  },
  {
    id: 3,
    title: 'Early Retirement Planning',
    description: 'Discussions about FIRE (Financial Independence, Retire Early)',
    memberCount: 1567,
    topics: ['Investment Strategies', 'Expense Optimization', 'Passive Income'],
    activeDiscussions: 42
  }
];

export default temp1;