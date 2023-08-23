import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { Check } from "src/checks/entities/check.entity";
import { Discount } from "src/discounts/entities/discount.entity";
import { User } from "src/users/entities/user.entity";

export class Discounts{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Discount' })
    discount?: Discount
}

export class Checks{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Check' })
    check?: Check
}

export class UsersInformation{
    
    _id?: ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user?: User

    @Prop({type: Number})
    hoursWorked?: number

    @Prop({type: Number})
    totalPay?: number

    @Prop([{type: Discounts}])
    discounts?: Discounts[]

    @Prop([{type: Checks}])
    checks?: Checks[]


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
