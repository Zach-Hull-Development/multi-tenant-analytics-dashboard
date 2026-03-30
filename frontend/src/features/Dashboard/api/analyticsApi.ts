
const getAnalyticSummary = async (token: string) => {
    const res = await fetch('http://localhost:3001/analytics/summary', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('Unauthorized');
        }
        throw new Error('Something went wrong...');
    }
    return res.json();
}


const getAnalyticEvents = async (token: string) => {
    const res = await fetch('http://localhost:3001/analytics/events', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('Unauthorized');
        }
        throw new Error('Something went wrong...');
    }
    return res.json();
}

export const AnalyticsApi = {
    getAnalyticEvents,
    getAnalyticSummary
}