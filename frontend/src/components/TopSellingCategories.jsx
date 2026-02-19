import React from 'react';

const TopSellingCategories = () => {
    const categories = [
        { name: 'Electronics', percentage: 75, color: 'bg-blue-500' },
        { name: 'Fashion', percentage: 60, color: 'bg-pink-500' },
        { name: 'Home & Garden', percentage: 45, color: 'bg-green-500' },
        { name: 'Sports', percentage: 30, color: 'bg-orange-500' },
        { name: 'Books', percentage: 20, color: 'bg-yellow-500' },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Top Selling Categories</h2>
            <div className="space-y-4">
                {categories.map((category) => (
                    <div key={category.name}>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{category.name}</span>
                            <span className="text-sm font-medium text-gray-700">{category.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`${category.color} h-2.5 rounded-full transition-all duration-500 ease-out`}
                                style={{ width: `${category.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopSellingCategories;
