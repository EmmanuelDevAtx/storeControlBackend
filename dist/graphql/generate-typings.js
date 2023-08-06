"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const definitionsFactory = new graphql_1.GraphQLDefinitionsFactory();
definitionsFactory.generate({
    typePaths: ['./src/**/*.gql'],
    path: (0, path_1.join)(process.cwd(), 'src//graphql/graphql.ts'),
    outputAs: 'class',
    defaultScalarType: 'unknown',
    emitTypenameField: true,
    customScalarTypeMapping: {
        Date: 'Date',
        URL: 'string',
    },
});
//# sourceMappingURL=generate-typings.js.map