import { Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import PermissionRepository from "../repositories/PermissionRepository";
import RoleRepository from "../repositories/RoleRepository";


class RoleController {
    async index(request: Request, response: Response){
        const roleRepository = getCustomRepository(RoleRepository);  
        const roles = await roleRepository.find();
        return response.json(roles);  
    }

    async create(request: Request, response: Response) {
        const roleRepository = getCustomRepository(RoleRepository);  
        const permissionRepository = getCustomRepository(PermissionRepository);  
        const { name, description, permissions } = request.body;
        const existRole = await roleRepository.findOne({name});
        if(existRole) {
            return response.status(400).json({message: "Role already exists!!"});
        }
        const existPermissions = await permissionRepository.findByIds(permissions)
        const role = roleRepository.create({
            name,
            description,
            permission: existPermissions,
        })
        await roleRepository.save(role);
        return response.status(201).json(role);
    }
}


export default new RoleController;
