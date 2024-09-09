import { getUserById } from '../services/userService.js';
import { GetUserResponseDTO } from '../dtos/users/GetUserResponseDTO.js';

// Controller function to handle the GET /user/:id route
export const getUserHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        const getUserResponseDTO = new GetUserResponseDTO(user)
        res.status(200).json(getUserResponseDTO);
    } catch (error) {
        res.status(404).json({ message: 'No user is found' });
        console.log(error.message);
    }
};
