import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseFactory } from './core/db/databaseFactory';
import { DiscountsModule } from './discounts/discounts.module';
import { AuthModule } from './auth/auth.module';
import { ChecksModule } from './checks/checks.module';
import { ReportsModule } from './reports/reports.module';
import { upperDirectiveTransformer } from './core/directives/upper-case.directive';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground:true,
      typePaths: ['./**/*.gql'],
      introspection: true,
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      context: (context) => {
        if (context?.extra?.request) {
          return {
            req: {
              ...context?.extra?.request,
              headers: {
                ...context?.extra?.request?.headers,
                ...context?.connectionParams?.headers,
              },
            },
          };
        }

        return { req: context?.req };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseFactory,
      inject: [ConfigService],
    }),
    UsersModule,
    DiscountsModule,
    AuthModule,
    ChecksModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

