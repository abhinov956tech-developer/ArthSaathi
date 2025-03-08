

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    if (!budget?.amount || budget?.amount === 0) return 0;
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  return (
    <div className="p-5 border rounded-2xl hover:shadow-md cursor-pointer h-[170px] bg-slate-200">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          {/* Budget Icon */}
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget?.icon || "💰"}
          </h2>

          <div>
            {/* Budget Name */}
            <h2 className="font-bold">{budget?.name || "Untitled Budget"}</h2>
            {/* Total Items */}
            <h2 className="text-sm text-gray-500">
              {budget?.totalItem || 0} Items
            </h2>
          </div>
        </div>

        {/* Budget Amount */}
        <h2 className="font-bold text-primary text-lg">
          ${budget?.amount?.toLocaleString() || "0"}
        </h2>
      </div>

      <div className="mt-5">
        {/* Spending & Remaining Amount */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-slate-400">
            ${budget?.totalSpend?.toLocaleString() || "0"} Spent
          </h2>
          <h2 className="text-xs text-slate-400">
            ${((budget?.amount || 0) - (budget?.totalSpend || 0)).toLocaleString()} Remaining
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{
              width: `${calculateProgressPerc()}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default BudgetItem;