import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CreatorStats = () => {
    const data = [
        { name: 'Contest A', participants: 40 },
        { name: 'Contest B', participants: 30 },
        { name: 'Contest C', participants: 20 },
        { name: 'Contest D', participants: 27 },
        { name: 'Contest E', participants: 18 },
    ];

    return (
        <div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">My Contests</div>
                    <div className="stat-value text-primary">12</div>
                </div>
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-title">Total Participants</div>
                    <div className="stat-value text-secondary">345</div>
                </div>
            </div>

            <div className="bg-base-100 p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-4">Participation Overview</h3>
                 <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="participants" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CreatorStats;
