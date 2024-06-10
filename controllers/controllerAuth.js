const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const passwordHased = require('../utils/passwordHased.js');

const generateToken = require('../utils/generateToken.js');

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
    
        const data = {
            email,
            password: await passwordHased(password),
            name
        }

    
        const user = await prisma.user.create({ data });

        const token = generateToken({
            email,
            name
        });
    
        res.json({
            name: user.name,
            email: user.email,
            token
        });
        
    } catch (error) {
        next(error);
    }
}

const login = () => {
    
}

module.exports = {
    register,
    login
}