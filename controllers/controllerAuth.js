const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { passwordHased, comparePassword } = require('../utils/password.js');

const generateToken = require('../utils/generateToken.js');

const register = async (req, res, next) => {
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

const login = async (req, res, next) => {
    const error = 'Email o password errati' ;
    try {
        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return res.status(400).json({ status: 400, error: error })
        }

        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: error })
        }

        const token = generateToken({
            email,
            name: user.name
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

module.exports = {
    register,
    login
}