import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { getQuackSeverity } from "../../utils/getQuackSeverity";

const EarthquakeCharts = ({ quakes, isDark }) => {
    // 1. Prepare Magnitude Data for Bar Chart
    const magGroups = quakes.reduce((acc, q) => {
        const mag = Math.floor(q.properties.mag);
        const label = `${mag}.0+`;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});

    const barData = Object.keys(magGroups)
        .sort()
        .map((label) => ({
            name: label,
            count: magGroups[label],
        }));

    // 2. Prepare Severity Data for Pie Chart
    const severityGroups = quakes.reduce((acc, q) => {
        const severity = getQuackSeverity(q.properties.mag);
        acc[severity.label] = (acc[severity.label] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.keys(severityGroups).map((label) => ({
        name: label,
        value: severityGroups[label],
        color:
            label === "SEVERE" ? "#f43f5e" : // Rose/Red
                label === "MODERATE" ? "#f59e0b" : // Amber/Orange
                    "#10b981", // Emerald/Green for LOW
    }));

    const textColor = isDark ? "#94a3b8" : "#475569";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Magnitude Distribution Bar Chart */}
            <div
                className={`p-6 rounded-md border transition-all duration-300 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-md"
                    }`}
            >
                <h3 className={`text-sm font-semibold mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Magnitude Distribution
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#e2e8f0"} />
                            <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                                    borderColor: isDark ? "#334155" : "#e2e8f0",
                                    borderRadius: "8px",
                                    color: isDark ? "#f8fafc" : "#1e293b",
                                }}
                            />
                            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Severity Pie Chart */}
            <div
                className={`p-6 rounded-md border transition-all duration-300 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-md"
                    }`}
            >
                <h3 className={`text-sm font-semibold mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Severity Distribution
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                                    borderColor: isDark ? "#334155" : "#e2e8f0",
                                    borderRadius: "8px",
                                }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EarthquakeCharts;
