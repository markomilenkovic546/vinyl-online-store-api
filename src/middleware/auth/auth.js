import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized' });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        if (error.message === 'invalid signature') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.status(500).json({ error: error.message });

        console.error(error.message);
    }
};
