"use client";

import React, { useEffect, useState, useCallback } from "react";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);

  /**
   * Function to fetch budget list (replace with actual API call)
   */
  const getBudgetList = useCallback(async () => {
    // Simulated data (Replace with actual API call or database fetching logic)
    const result = [
      {
        id: 1,
        name: "Groceries",
        amount: 500,
        totalSpend: 250,
        totalItem: 5,
        icon: "🛒",
      },
      {
        id: 2,
        name: "Entertainment",
        amount: 300,
        totalSpend: 120,
        totalItem: 3,
        icon: "🎬",
      },
    ];

    setBudgetList(result);
  }, []);

  // Fetch budget list on component mount
  useEffect(() => {
    getBudgetList();
  }, [getBudgetList]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Create Budget Button */}
        <CreateBudget refreshData={getBudgetList} />

        {/* Budget List */}
        {budgetList.length > 0 ? (
          budgetList.map((budget) => <BudgetItem budget={budget} key={budget.id} />)
        ) : (
          // Skeleton Loaders (when data is empty)
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetList;
