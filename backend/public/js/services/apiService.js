export const API_BASE_URL = "https://chinsanparty-backend.onrender.com";

export async function fetchJson(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
        'Content-Type': 'application/json'
    };
    
    const config = {
        ...options,
        headers: { ...defaultHeaders, ...options.headers }
    };

    try {
        const res = await fetch(url, config);
        const result = await res.json();
        
        if (!res.ok) {
            throw new Error(result.error || result.message || `Error ${res.status}`);
        }
        return result;
    } catch (err) {
        throw new Error(err.message || 'Network error');
    }
}
