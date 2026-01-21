import { useEffect, useState } from "react";
import { getCityContext } from "../utils/getCityContext";

const CityInfoModal = ({ city, onClose, isDark }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getCityContext(city);
            setData(result);
            setLoading(false);
        };
        if (city) fetchData();
    }, [city]);

    if (!city) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className={`relative w-full max-w-lg rounded-md overflow-hidden shadow-md transition-all duration-500 transform scale-95 animate-in zoom-in-95 duration-300 ${isDark ? "bg-gray-900 border border-gray-800 text-white" : "bg-white text-gray-800"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-500/10 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8">
                    <header className="mb-8">
                        <h2 className={`text-3xl font-black mb-1 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
                            {city}
                        </h2>
                        {data && <p className="text-sm opacity-50 font-medium uppercase tracking-widest">{data.country}</p>}
                    </header>

                    {loading ? (
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse flex flex-col gap-2">
                                    <div className={`h-4 w-3/4 rounded ${isDark ? "bg-gray-800" : "bg-gray-100"}`}></div>
                                    <div className={`h-3 w-1/2 rounded ${isDark ? "bg-gray-800" : "bg-gray-100"}`}></div>
                                </div>
                            ))}
                        </div>
                    ) : data ? (
                        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {/* HOLIDAYS SECTION */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4 flex items-center gap-2">
                                    <span>📅</span> Upcoming Holidays
                                </h3>
                                <div className="space-y-3">
                                    {data.holidays.length > 0 ? (
                                        data.holidays.map((h, i) => (
                                            <div key={i} className={`p-4 rounded-md border ${isDark ? "bg-gray-800/40 border-gray-800" : "bg-gray-50 border-gray-100"}`}>
                                                <p className="font-bold text-sm mb-1">{h.name}</p>
                                                <p className="text-xs opacity-50">{new Date(h.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm opacity-50 italic">No upcoming holidays found.</p>
                                    )}
                                </div>
                            </section>

                            {/* NEWS SECTION */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
                                    <span>📰</span> Top Headlines
                                </h3>
                                <div className="space-y-4">
                                    {data.news.length > 0 ? (
                                        data.news.map((n, i) => (
                                            <a
                                                key={i}
                                                href={n.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`block p-4 rounded-md border transition-all hover:scale-[1.02] ${isDark ? "bg-gray-800/40 border-gray-800 hover:bg-gray-800" : "bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md"
                                                    }`}
                                            >
                                                <p className="font-bold text-sm leading-tight mb-2 line-clamp-2">{n.title}</p>
                                                <div className="flex justify-between items-center opacity-50 text-[10px]">
                                                    <span className="font-bold uppercase tracking-tighter">{n.source.name}</span>
                                                    <span>{new Date(n.publishedAt).toLocaleDateString()}</span>
                                                </div>
                                            </a>
                                        ))
                                    ) : (
                                        <p className="text-sm opacity-50 italic">Local news unavailable for this region.</p>
                                    )}
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="text-center py-10 opacity-50">
                            <p>Unable to retrieve city details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CityInfoModal;
