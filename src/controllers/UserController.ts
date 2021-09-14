import { Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import { hash} from "bcrypt";
import UserRepository from "../repositories/UserRepository";
import RoleRepository from "../repositories/RoleRepository";


class UserController {
    async index(request: Request, response: Response){
        const userRepository = getCustomRepository(UserRepository);  
        const users = await userRepository.find();
        return response.json(users);  
    }

    async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository); 
        const roleRepository = getCustomRepository(RoleRepository); 
        const { name, username, password, roles } = request.body;
        const existUser = await userRepository.findOne({username});
        if(existUser) {
            return response.status(400).json({message: "User already exists!!"});
        }
        const passwordHashed = await hash(password, 8);
        const existsRoles = await roleRepository.findByIds(roles);
        if(!existsRoles) {
            return response.status(400).json({message: "Roles not exists!!"})
        }
        const user = userRepository.create({
            name,
            username,
            password: passwordHashed,
            roles: existsRoles,
        })
        await userRepository.save(user);
        return response.status(201).json(user);
    }
}


export default new UserController;

