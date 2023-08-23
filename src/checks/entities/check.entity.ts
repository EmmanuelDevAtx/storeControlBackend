import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId, Date } from "mongoose";
import { User } from "src/users/entities/user.entity";

@Schema({ virtuals: false, timestamps: true  })
export class Check {

    _id?: ObjectId
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user?: User

    @Prop({type: Date})
    startTime: Date
    
    @Prop({type: Date})
    endTime: Date

    @Prop({type: Boolean})
    isActive: boolean
}

export const CheckSchema = SchemaFactory.createForClass(Check);

