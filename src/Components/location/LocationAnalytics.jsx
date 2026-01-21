import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useLocation } from "../../context/location-context";

const LocationAnalytics = ({ isDark }) => {
    const { history } = useLocation();

    if (!history || history.length < 2) {
        return (
            <div className={`p-8 text-center rounded-md border ${isDark ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-white border-gray-100 text-gray-400 shadow-md"}`}>
                <p>Collecting data points for live analytics...</p>
            </div>
        );
    }

    const textColor = isDark ? "#94a3b8" : "#475569";

    return (
        <div className={`p-6 rounded-md border transition-all duration-300 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-md"}`}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                        Live Movement Analytics
                    </h3>
                    <p className="text-sm opacity-60">Speed & Signal Accuracy over time</p>
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history}>
                        <defs>
                            <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#e2e8f0"} />
                        <XAxis
                            dataKey="timeLabel"
                            stroke={textColor}
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={30}
                        />
                        <YAxis stroke={textColor} fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? "#1e293b" : "#ffffff",
                                borderColor: isDark ? "#334155" : "#e2e8f0",
                                borderRadius: "12px",
                                fontSize: "12px",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="speed"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSpeed)"
                            name="Speed (m/s)"
                        />
                        <Area
                            type="monotone"
                            dataKey="accuracy"
                            stroke="#10b981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorAccuracy)"
                            name="Accuracy (m)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LocationAnalytics;
