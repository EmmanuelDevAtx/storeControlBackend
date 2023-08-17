
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { User } from "src/users/entities/user.entity";

@Schema({ virtuals: false, timestamps: true  })
export class Discount {
    _id? : ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user?: User

    @Prop({ type: String })
    description: string;

    @Prop({ type : Number })
    amount: number
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);