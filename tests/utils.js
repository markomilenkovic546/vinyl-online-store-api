
export async function registerUser(request, payload) {
    const response = await request.post(
        '/api/v1/auth/register',
        {
            data: payload
        }
    );

    if (!response.ok()) {
        throw new Error(`Registration failed: ${response.status()}`);
    }

    return response.json()
}
