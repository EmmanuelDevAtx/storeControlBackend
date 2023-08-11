import { Injectable } from "@nestjs/common";
import { CrudRepository } from "src/core/crud.repository";
import { Discount } from "./entities/discount.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class DiscountRepository extends CrudRepository<Discount>{
    constructor(@InjectModel(Discount.name) readonly model: Model<Discount>){
        super(model, 'Discount')
    }
}