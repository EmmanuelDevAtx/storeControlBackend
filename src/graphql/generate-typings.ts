import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.gql'],
  path: join(process.cwd(), 'src//graphql/graphql.ts'),
  outputAs: 'class',
  defaultScalarType: 'unknown',
  emitTypenameField: true,
  customScalarTypeMapping: {
    Date: 'Date',
    URL: 'string',
  },
});
