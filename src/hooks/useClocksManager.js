import { useState, useEffect } from 'react';
import { generate } from 'shortid';

const LOCAL_STORAGE_KEY = 'custom_clocks_v1';

const LOCAL_CLOCK_INIT = {
    title: "My Local Clock",
    timezone: "",
    offset: 0,
};

/**
 * Custom hook to manage custom clocks state and persistence.
 */
export const useClocksManager = () => {
    const [localClock, setLocalClock] = useState(() => {
        const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_local`);
        return saved ? JSON.parse(saved) : { ...LOCAL_CLOCK_INIT };
    });

    const [clocks, setClocks] = useState(() => {
        const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_list`);
        return saved ? JSON.parse(saved) : [];
    });

    // Persist states to localStorage
    useEffect(() => {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_local`, JSON.stringify(localClock));
    }, [localClock]);

    useEffect(() => {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_list`, JSON.stringify(clocks));
    }, [clocks]);

    const updateLocalClock = (data) => {
        setLocalClock((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const createClock = (clock) => {
        const newClock = {
            ...clock,
            id: generate(),
            createdAt: new Date().toISOString(),
        };
        setClocks((prev) => [...prev, newClock]);
    };

    const updateClock = (updatedClock) => {
        setClocks((prev) =>
            prev.map((clock) => (clock.id === updatedClock.id ? updatedClock : clock))
        );
    };

    const deleteClock = (id) => {
        setClocks((prev) => prev.filter((clock) => clock.id !== id));
    };

    return {
        localClock,
        clocks,
        updateLocalClock,
        createClock,
        updateClock,
        deleteClock,
    };
};
