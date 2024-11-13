import { CreateReviewRequestDTO } from "../dtos/review/CreateReviewRequestDTO.js"

export const createReviewHandler = async (req, res) => {
    const payload = req.body
    const userId = req.user?.id
    const createReviewRequestDTO = new CreateReviewRequestDTO(payload, userId)
   try {
    
   } catch (error) {
    
   }
}