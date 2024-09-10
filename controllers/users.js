import { getUserById } from '../services/userService.js';
import { GetUserResponseDTO } from '../dtos/users/GetUserResponseDTO.js';

// Controller function to handle the GET /user/:id route
export const getUserHandler = async (req, res) => {
    // Get extracted user id from the access token
    const { id } = req.user;
    try {
        // Get user data by user id from the database
        const user = await getUserById(id);
        // Sanitize data and prepare for response
        const getUserResponseDTO = new GetUserResponseDTO(user);
        // Send response to the client when getting user data process is successful
        res.status(200).json(getUserResponseDTO);
    } catch (error) {
        res.status(404).json({ message: 'No user is found' });
        console.log(error.message);
    }
};
