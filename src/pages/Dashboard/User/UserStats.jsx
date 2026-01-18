import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserStats = () => {
    const data = [
        { name: 'Won', value: 3 },
        { name: 'Lost', value: 7 },
    ];
    const COLORS = ['#00C49F', '#FF8042'];

    return (
        <div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Contests Participated</div>
                    <div className="stat-value text-primary">10</div>
                </div>
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Contests Won</div>
                    <div className="stat-value text-secondary">3</div>
                    <div className="stat-desc">30% Win Rate</div>
                </div>
            </div>

             <div className="bg-base-100 p-6 rounded-xl shadow max-w-md">
                <h3 className="text-xl font-bold mb-4">Win/Loss Ratio</h3>
                 <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default UserStats;
