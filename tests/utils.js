export async function registerUser(request, payload) {
    const response = await request.post('/api/v1/auth/register', {
        data: payload
      
    });
    const responseBody = await response.json();
    if (!response.ok()) {
        throw new Error(`Registration failed: ${responseBody.error}}`);
    }

    return response;
}

export async function login(request, payload) {
    const response = await request.post('/api/v1/auth/login', {
        data: { email: payload.email, password: payload.password },
    });
    const responseBody = await response.json();

    if (!response.ok()) {
        throw new Error(`Login failed: ${responseBody.error}`);
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

export async function getUser(request) {
    const response = await request.get('/api/v1/user');

    if (!response.ok()) {
        throw new Error(`Error for user retrieval: ${response.status()}`);
    }

    return response;
}

export async function logout(request, payload) {
    // Login to account
    await login(request, payload);
    const response = await request.post('/api/v1/auth/logout');

    if (!response.ok()) {
        throw new Error(`Logout failed: ${response.status()}`);
    }

    return response;
}

export async function createAddress(request, payload) {
    // Send a request to create an address
    const response = await request.post('/api/v1/user/addresses', {
        data: payload
    });
    if (!response.ok()) {
        throw new Error(`Address creation failed: ${response.status()}`);
    }

    return response;
}
