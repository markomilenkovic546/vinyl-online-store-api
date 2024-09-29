export async function registerUser(request, payload) {
    const response = await request.post('/api/v1/auth/register', {
        data: payload
    });

    if (!response.ok()) {
        throw new Error(`Registration failed: ${response.status()}`);
    }

    return response;
}

export async function login(request, payload) {
    const response = await request.post('/api/v1/auth/login', {
        data: { email: payload.email, password: payload.password }
    });

    if (!response.ok()) {
        throw new Error(`Login failed: ${response.status()}`);
    }

    return response;
}

export async function deleteUser(request, payload) {
    // Login to account
    await login(request, payload);
    const response = await request.delete('/api/v1/user');

    if (!response.ok()) {
        throw new Error(`User delete failed: ${response.status()}`);
    }

    return response;
}
