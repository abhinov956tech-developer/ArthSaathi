"use client";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// API service functions
const budgetService = {
  async getBudgets() {
    try {
      const response = await fetch('/api/budgets');
      if (!response.ok) {
        throw new Error('Failed to fetch budgets');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching budgets:', error);
      throw error;
    }
  },

  async deleteBudget(id) {
    try {
      const response = await fetch(`/api/budgets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete budget');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting budget:', error);
      throw error;
    }
  },

  async createBudget(budgetData) {
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
      });
      if (!response.ok) {
        throw new Error('Failed to create budget');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating budget:', error);
      throw error;
    }
  },

  async updateBudget(id, budgetData) {
    try {
      const response = await fetch(`/api/budgets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
      });
      if (!response.ok) {
        throw new Error('Failed to update budget');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating budget:', error);
      throw error;
    }
  }
};

function BudgetList() {
  const navigate = useNavigate();
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [budgetToEdit, setBudgetToEdit] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  // const { theme } = useTheme();
  const [theme, setTheme] = useState('light');

  const getBudgetList = useCallback(async () => {
    setLoading(true);
    try {
      const data = await budgetService.getBudgets();
      setBudgetList(data);
    } catch (error) {
      toast.error('Failed to load budgets');
      // Fallback to demo data for development/preview
      setBudgetList([
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
        {
          id: 3,
          name: "Transportation",
          amount: 200,
          totalSpend: 180,
          totalItem: 2,
          icon: "🚗",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBudgetList();
  }, [getBudgetList]);

  const handleDeleteBudget = async (id) => {
    try {
      await budgetService.deleteBudget(id);
      setBudgetList(prevList => prevList.filter(budget => budget.id !== id));
      toast.success('Budget deleted successfully');
    } catch (error) {
      toast.error('Failed to delete budget');
    }
  };

  const handleEditBudget = (budget) => {
    setBudgetToEdit(budget);
    setIsCreateDialogOpen(true);
  };

  const handleCreateOrUpdateBudget = async (budgetData, isEdit) => {
    try {
      if (isEdit && budgetToEdit) {
        await budgetService.updateBudget(budgetToEdit.id, budgetData);
        setBudgetList(prevList =>
          prevList.map(item => item.id === budgetToEdit.id ? { ...item, ...budgetData } : item)
        );
        toast.success('Budget updated successfully');
      } else {
        const newBudget = await budgetService.createBudget(budgetData);
        setBudgetList(prevList => [...prevList, newBudget]);
        toast.success('Budget created successfully');
      }
      setIsCreateDialogOpen(false);
      setBudgetToEdit(null);
    } catch (error) {
      toast.error(isEdit ? 'Failed to update budget' : 'Failed to create budget');
    }
  };

  const handleViewBudgetDetails = (budgetId) => {
    navigate(`/budgets/${budgetId}`);
  };

  const filteredBudgets = budgetList.filter(budget => {
    const matchesSearch = budget.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (selectedFilter) {
      case 'over':
        return matchesSearch && budget.totalSpend > budget.amount;
      case 'under':
        return matchesSearch && budget.totalSpend <= budget.amount;
      default:
        return matchesSearch;
    }
  });

  // Calculate summary statistics
  const totalBudgeted = budgetList.reduce((sum, budget) => sum + (budget.amount || 0), 0);
  const totalSpent = budgetList.reduce((sum, budget) => sum + (budget.totalSpend || 0), 0);
  const overBudgetCount = budgetList.filter(budget => budget.totalSpend > budget.amount).length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Budgeted</p>
          <p className="text-2xl font-bold dark:text-white">${totalBudgeted.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Spent</p>
          <p className="text-2xl font-bold dark:text-white">${totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Over Budget Items</p>
          <p className="text-2xl font-bold dark:text-white">{overBudgetCount}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Search budgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-slate-800"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                {selectedFilter === 'all' ? 'All Budgets' : 
                 selectedFilter === 'over' ? 'Over Budget' : 'Under Budget'}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedFilter('all')}>
                All Budgets
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('over')}>
                Over Budget
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter('under')}>
                Under Budget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Create Budget Card */}
        <CreateBudget 
          open={isCreateDialogOpen}
          setOpen={setIsCreateDialogOpen}
          onSave={handleCreateOrUpdateBudget}
          budgetToEdit={budgetToEdit}
          clearBudgetToEdit={() => setBudgetToEdit(null)}
        />

        {/* Budget List */}
        {loading ? (
          // Skeleton loaders
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-2 w-full mt-4" />
              <div className="flex justify-between pt-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))
        ) : filteredBudgets.length > 0 ? (
          filteredBudgets.map((budget) => (
            <BudgetItem
              key={budget.id}
              budget={budget}
              onDelete={handleDeleteBudget}
              onEdit={handleEditBudget}
              onViewDetails={handleViewBudgetDetails}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-slate-500 dark:text-slate-400">
              {searchTerm || selectedFilter !== 'all' 
                ? "No budgets match your search criteria" 
                : "No budgets created yet. Create your first budget!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetList;