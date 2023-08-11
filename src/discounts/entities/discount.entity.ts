
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

@Schema({ virtuals: false, timestamps: true  })
export class Discount {
    _id? : ObjectId;

    @Prop({ type: String })
    description: string;

    @Prop({ type : Number })
    amount: number
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);

