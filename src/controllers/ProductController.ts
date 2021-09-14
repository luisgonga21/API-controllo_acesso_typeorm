import { Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import ProductRepository from "../repositories/ProductRepository";


class ProductController {
    async create(request: Request, response: Response) {
        const productRepository = getCustomRepository(ProductRepository);  
        const { name, description } = request.body;
        const existProduct = await productRepository.findOne({name});
        if(existProduct) {
            return response.status(400).json({message: "Products already exists!!"});
        }
        const product = productRepository.create({
            name,
            description,
        })
        await productRepository.save(product);
        return response.status(201).json(product);
    }

    async index(request: Request, response: Response){
        const productRepository = getCustomRepository(ProductRepository);  
        const products = await productRepository.find();
        return response.json(products);  
    }

    async show(request: Request, response: Response){
        const productRepository = getCustomRepository(ProductRepository);  
        const { id } = request.params;
        const products = await productRepository.findOne(id);
        
        return  response.json(products);
    }
}


export default new ProductController;
