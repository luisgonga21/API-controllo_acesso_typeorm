import { Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import { compare, hash} from "bcrypt";
import UserRepository from "../repositories/UserRepository";
import User from "../models/User";
import { sign } from "jsonwebtoken";

class SessionController {
    async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);  
        const { username, password } = request.body;
        const existUser = await userRepository.findOne({username});
        if(!existUser) {
            return response.status(400).json({message: "User does not exists!!"});
        }
        const matchPassword = await compare(password, existUser.password);
        if(!matchPassword) {
            return response.status(400).json({message: "User or password incorrect!!"});
        }
        const token = sign({}, "cc232c-3cd2342-2cwddw33-fdfdfed3-frg4effd", {
            subject: existUser.id,
            expiresIn: "2d"
        })

        return response.status(200).json({
            token,
            existUser,
        })
    }
}


export default new SessionController;