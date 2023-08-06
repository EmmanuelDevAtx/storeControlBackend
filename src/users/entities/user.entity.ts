import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

@Schema({ virtuals: false, timestamps: true })
export class User {
    _id?: ObjectId;

    @Prop({type: String})
    name: string

    @Prop({type: String})
    role: string
}
export const UsersSchema = SchemaFactory.createForClass(User);
