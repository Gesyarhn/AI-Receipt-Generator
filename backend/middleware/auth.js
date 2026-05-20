import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        //get token from header
        const token = req.headers.authorization ?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'No authentication token, access denied.' 
            });
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //add user info to request 
        req.user = {
            id: decoded.id,
            email: decoded.email
        }

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ 
            success: false,
            message: 'Token is not valid.' 
        });
    }
};

export default authMiddleware;