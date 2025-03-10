import React, { useState } from 'react';

const InvestmentStrategy = () => {
  // State management for form inputs
  const [income, setIncome] = useState('');
  const [financialGoal, setFinancialGoal] = useState('retirement');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [strategy, setStrategy] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call to backend API
      const response = await fetch('/api/investment-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          income: parseFloat(income),
          financialGoal,
          riskTolerance,
          timeHorizon: parseInt(timeHorizon)
        }),
      });
      
      const data = await response.json();
      setStrategy(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching investment strategy:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setIncome('');
    setFinancialGoal('retirement');
    setRiskTolerance('moderate');
    setTimeHorizon('');
    setShowResults(false);
    setStrategy(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Personalized Investment Strategy</h1>
      
      {!showResults ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="mb-4 text-gray-700">Complete the form below to receive tailored investment recommendations based on your financial situation and goals.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income ($)
              </label>
              <input
                type="number"
                id="income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your annual income"
              />
            </div>
            
            <div>
              <label htmlFor="financialGoal" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Financial Goal
              </label>
              <select
                id="financialGoal"
                value={financialGoal}
                onChange={(e) => setFinancialGoal(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="retirement">Retirement</option>
                <option value="homebuying">Home Buying</option>
                <option value="education">Education</option>
                <option value="wealth">Wealth Building</option>
                <option value="emergency">Emergency Fund</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700 mb-1">
                Risk Tolerance
              </label>
              <select
                id="riskTolerance"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
                <option value="very-aggressive">Very Aggressive</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="timeHorizon" className="block text-sm font-medium text-gray-700 mb-1">
                Time Horizon (years)
              </label>
              <input
                type="number"
                id="timeHorizon"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter investment time horizon in years"
                min="1"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Get Strategy'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Your Investment Strategy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Investment Profile</h3>
                <p><span className="font-medium">Income:</span> ${income.toLocaleString()}/year</p>
                <p><span className="font-medium">Goal:</span> {financialGoal.charAt(0).toUpperCase() + financialGoal.slice(1)}</p>
                <p><span className="font-medium">Risk Tolerance:</span> {riskTolerance.charAt(0).toUpperCase() + riskTolerance.slice(1)}</p>
                <p><span className="font-medium">Time Horizon:</span> {timeHorizon} years</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 mb-2">Recommended Allocation</h3>
                {strategy && strategy.allocation && (
                  <div className="space-y-2">
                    {Object.entries(strategy.allocation).map(([asset, percentage]) => (
                      <div key={asset} className="flex justify-between">
                        <span>{asset}:</span>
                        <span className="font-medium">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {strategy && (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Recommended Investment Vehicles</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    {strategy.recommendedVehicles.map((vehicle, index) => (
                      <li key={index}>{vehicle}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Strategy Summary</h3>
                  <p className="text-gray-700">{strategy.strategySummary}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Next Steps</h3>
                  <ol className="list-decimal pl-6 space-y-1">
                    {strategy.nextSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </>
            )}
            
            <div className="mt-8">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentStrategy;