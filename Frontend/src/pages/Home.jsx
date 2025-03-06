import { useState } from "react"; // Import useState for managing state
import { Progress } from "@/components/ui/progress";
import {  ListTodo, StickyNote } from "lucide-react";
import { BsCircle } from "react-icons/bs";
import { GoGoal } from "react-icons/go";

const Home = () => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(true);



  const goals = [
    {
      title: "Learn New Language",
      date: "12/22/2024",
      progress: 50,
      priority: "high",
      tasksCompleted: 3,
      totalTasks: 5,
      type: "Yearly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam libero excepturi, omnis aliquam similique cumque facere porro officia quos at voluptate, nulla dolorem esse iusto odio maiores! Odio, tempora earum.",
    },
    {
      title: "Achieve Fitness Goals",
      date: "11/15/2024",
      progress: 10,
      priority: "medium",
      tasksCompleted: 1,
      totalTasks: 5,
      type: "Monthly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam libero excepturi, omnis aliquam similique cumque facere porro officia quos at voluptate, nulla dolorem esse iusto odio maiores! Odio, tempora earum.",
    },
    {
      title: "Complete Project",
      date: "10/30/2024",
      progress: 75,
      priority: "high",
      tasksCompleted: 7,
      totalTasks: 5,
      type: "Weekly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam libero excepturi, omnis aliquam similique cumque facere porro officia quos at voluptate, nulla dolorem esse iusto odio maiores! Odio, tempora earum.",
    },
  ];

  return (
    <div className="p-4">
      {/* Greeting Section */}
      <div className="flex flex-col items-start gap-1">
        <p className="text-[24px] font-medium text-[#393939]">
          Hello Sourabh Ghosh!
        </p>
        <p className="text-[16px] text-[#4B4B4B]">
          Every small step brings you closer to your big dreams.
        </p>
      </div>

      {/* Let's Get Started Card */}
      {isWidgetVisible && ( // Conditionally render the widget
        <div className="bg-white rounded-md mt-4 p-4 shadow-md">
          <div className="border-b border-gray-300 pb-2">
            <h1 className="text-black text-[20px] font-semibold">
              Let's Get Started!
            </h1>
          </div>
          <div className="flex flex-row gap-2 mt-2">
            <Progress />
            <Progress />
            <Progress />
          </div>

          {/* Create Todo */}
          <div className="flex items-center border border-gray-300 rounded-md mt-4 px-4 py-2 bg-white shadow-sm hover:shadow-md transition-shadow">
            <ListTodo className="w-6 h-6 text-gray-600 mr-4" />
            <h1 className="text-gray-700 font-medium text-md">Create Todo</h1>
            <div className="ml-auto">
              <BsCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          {/* Create Goal */}
          <div className="flex items-center border border-gray-300 rounded-md mt-4 px-4 py-2 bg-white shadow-sm hover:shadow-md transition-shadow">
            <GoGoal className="w-6 h-6 text-gray-600 mr-4" />
            <h1 className="text-gray-700 font-medium text-md">Create Goal</h1>
            <div className="ml-auto">
              <BsCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          {/* Create Memory */}
          <div className="flex items-center border border-gray-300 rounded-md mt-4 px-4 py-2 bg-white shadow-sm hover:shadow-md transition-shadow">
            <StickyNote className="w-6 h-6 text-gray-600 mr-4" />
            <h1 className="text-gray-700 font-medium text-md">Create Memory</h1>
            <div className="ml-auto">
              <BsCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          <button
            className="mt-4 text-blue-500 hover:underline"
            onClick={() => setIsWidgetVisible(false)} // Hide widget on button click
          >
            Hide this Widget
          </button>
        </div>
      )}

      {/* Pending Todo, Complete Todos, Complete Goal Card */}
      <div className="flex lg:flex-row flex-col gap-4 mt-8">
        {/* Pending Todos Card */}
        <div className="flex flex-col bg-white rounded-lg shadow-md lg:w-1/3 h-[160px]">
          <h1 className="text-[24px] font-semibold ml-4 mt-2 text-gray-800">
            Pending Todos
          </h1>
          <p className="text-[48px] ml-4 font-bold text-gray-900">20</p>
          <p className="text-[14px] ml-4 text-blue-500">-10 from last month</p>
        </div>

        {/* Complete Todos Card */}
        <div className="flex flex-col bg-white rounded-lg shadow-md lg:w-1/3 h-[160px]">
          <h1 className="text-[24px] font-semibold ml-4 mt-2 text-gray-800">
            Completed Todos
          </h1>
          <p className="text-[48px] ml-4 font-bold text-gray-900">09</p>
          <p className="text-[14px] ml-4 text-blue-500">+2 from last month</p>
        </div>

        {/* Completed Goals Card */}
        <div className="flex flex-col bg-white rounded-lg shadow-md lg:w-1/3 h-[160px]">
          <h1 className="text-[24px] font-semibold ml-4 mt-2 text-gray-800">
            Completed Goals
          </h1>
          <p className="text-[48px] font-bold ml-4 text-gray-900">18</p>
          <p className="text-[14px] text-blue-500 ml-4">+11 from last month</p>
        </div>
      </div>
    </div>
  );
};

export default Home;