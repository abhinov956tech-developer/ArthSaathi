import { useNavigate } from "react-router-dom";
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
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { accountAtom } from "@/Atom/Atoms";
import toast from "react-hot-toast";

function BudgetList() {
    const navigate = useNavigate();
    const [accounts] = useRecoilState(accountAtom);
    const [budgetList, setBudgetList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all'); // Add this line
    const [budgetToEdit, setBudgetToEdit] = useState(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  // ... other state declarations remain the same ...

  // Map accounts data to budget format
  const mapAccountsToBudgets = useCallback(() => {
    if (!accounts) return [];
    
    return [
      { id: 1, name: "Groceries", amount: accounts.Groceries || 0 },
      { id: 2, name: "Transport", amount: accounts.Transport || 0 },
      { id: 3, name: "Eating Out", amount: accounts.Eating_Out || 0 },
      { id: 4, name: "Entertainment", amount: accounts.Entertainment || 0 },
      { id: 5, name: "Utilities", amount: accounts.Utilities || 0 },
      { id: 6, name: "Healthcare", amount: accounts.Healthcare || 0 },
      { id: 7, name: "Education", amount: accounts.Education || 0 },
      { id: 8, name: "Miscellaneous", amount: accounts.Miscellaneous || 0 }
    ];
  }, [accounts]);

  const getBudgetList = useCallback(async () => {
    setLoading(true);
    try {
      // Use mapped accounts data instead of API call
      const mappedBudgets = mapAccountsToBudgets();
      setBudgetList(mappedBudgets);
    } catch (error) {
      toast.error('Failed to load budgets');
      setBudgetList([]);
    } finally {
      setLoading(false);
    }
  }, [mapAccountsToBudgets]);

  useEffect(() => {
    getBudgetList();
  }, [getBudgetList, accounts]); // Refresh when accounts change

  // Update summary calculations to use accounts data directly
  const totalBudgeted = Object.values({
    Groceries: accounts?.Groceries || 0,
    Transport: accounts?.Transport || 0,
    Eating_Out: accounts?.Eating_Out || 0,
    Entertainment: accounts?.Entertainment || 0,
    Utilities: accounts?.Utilities || 0,
    Healthcare: accounts?.Healthcare || 0,
    Education: accounts?.Education || 0,
    Miscellaneous: accounts?.Miscellaneous || 0
  }).reduce((sum, val) => sum + val, 0);

  const totalSpent = accounts ? 
    accounts.Income - accounts.Disposable_Income - accounts.Desired_Savings : 0;

  const overBudgetCount = budgetList.filter(budget => {
    const spent = (budget.amount / totalBudgeted) * totalSpent;
    return spent > budget.amount;
  }).length;

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
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Income</p>
          <p className="text-2xl font-bold dark:text-white">₹{accounts?.Income?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Disposable Income</p>
          <p className="text-2xl font-bold dark:text-white">₹{accounts?.Disposable_Income?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Desired Savings</p>
          <p className="text-2xl font-bold dark:text-white">₹{accounts?.Desired_Savings?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Remaining Balance</p>
          <p className="text-2xl font-bold dark:text-white">
            ₹{(accounts?.Disposable_Income - totalBudgeted)?.toLocaleString() || 0}
          </p>
        </div>
      </div>

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