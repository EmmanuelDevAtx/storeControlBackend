import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


export const CurrentUser = createParamDecorator(
    (data: any, context: ExecutionContext )=>{
        const ctx = GqlExecutionContext.create( context );
        const user = ctx.getContext().req.user;
        if( !user) throw new Error('User not found')
        return user;
}) 