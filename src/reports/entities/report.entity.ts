import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { Discount } from "src/discounts/entities/discount.entity";
import { User } from "src/users/entities/user.entity";

export class Discounts{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Discount' })
    discount?: Discount
}

export class UsersInformation{

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user?: User

    @Prop([{type: Discounts}])
    discounts?: Discounts[]

    @Prop({type: Number})
    total?: number
}

@Schema({ virtuals: false, timestamps: true  })
export class Report {

    _id?: ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owner?: User

    @Prop({ type: Number })
    amountPerHour?: number

    @Prop({type: Date})
    dateCreated?: Date

    @Prop([{type: UsersInformation}])
    usersPay?:UsersInformation[]

}

export const ReportSchema = SchemaFactory.createForClass(Report)
