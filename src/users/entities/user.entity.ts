import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { Role } from "src/graphql/graphql";

@Schema({ virtuals: false, timestamps: true })
export class User {
    _id?: ObjectId;

    @Prop({type: String})
    name: string

    @Prop({type: [String]})
    role: Role[]
}
export const UsersSchema = SchemaFactory.createForClass(User);
