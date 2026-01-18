import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminStats = () => {
    // Mock Data for demonstration - in real app, fetch from API
    const data = [
      { name: 'Jan', users: 400, contests: 240 },
      { name: 'Feb', users: 300, contests: 139 },
      { name: 'Mar', users: 200, contests: 980 },
      { name: 'Apr', users: 278, contests: 390 },
      { name: 'May', users: 189, contests: 480 },
    ];

    const pieData = [
        { name: 'Approved', value: 400 },
        { name: 'Pending', value: 300 },
        { name: 'Rejected', value: 100 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-primary">1,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Total Contests</div>
                    <div className="stat-value text-secondary">350</div>
                    <div className="stat-desc">↗︎ 90 (14%)</div>
                </div>
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value">5.2k</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-base-100 p-6 rounded-xl shadow">
                    <h3 className="text-xl font-bold mb-4">User Growth</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="users" fill="#8884d8" />
                                <Bar dataKey="contests" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-base-100 p-6 rounded-xl shadow">
                    <h3 className="text-xl font-bold mb-4">Contest Status</h3>
                    <div className="h-[300px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
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
        </div>
    );
};

export default AdminStats;
