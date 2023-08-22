import { Injectable } from "@nestjs/common";
import { CrudRepository } from "src/core/crud.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Report } from "./entities/report.entity";


@Injectable()
export class ReportsRepository extends CrudRepository<Report>{
    constructor(@InjectModel(Report.name) readonly model: Model<Report>){
        super(model, 'Report')
    }
}