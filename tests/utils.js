export async function registerUser(request, payload) {
    const response = await request.post('/api/v1/auth/register', {
        data: payload
    });

    if (!response.ok()) {
        throw new Error(`Registration failed: ${response.status()}`);
    }

    return response.json();
}

export async function deleteUser(request, payload) {
    const response = await request.delete('/api/v1/user');

    if (!response.ok()) {
        throw new Error(`Registration failed: ${response.status()}`);
    }

    return response.json();
}
