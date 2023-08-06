import { IsOptional, IsNumberString, isString, isNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllQuery {

  @ApiProperty({
    example: '15',
    required: false,
    description: 'skips the specified number of elements, useful for paging',
  })
  @IsOptional()
  skip?: number;

  @ApiProperty({
    example: {limit: 4,cursor: '64758798f5ba34e542569dfb'},
    required: false,
    description: 'Its to get items greater than _id and get the cursor',
  })
  @IsOptional()
  pagination?: {limit?: number, cursor?: string};

  @ApiProperty({
    example: 'property1,property2,property3',
    required: false,
    description:
      'specifies which fields to project the resulting elements into, useful for formatting',
  })
  @IsOptional()
  fields?: string[];

  @ApiProperty({
    example: 'nestedproperty1,nestedproperty2',
    required: false,
    description:
      'specifies which document refs to populate prior to returning the result, useful for retrieving nested information',
  })
  @IsOptional()
  populate?: string[];

  @ApiProperty({
    example: '_id: -1  => descending  or _id: 1  => ascend',
    required: false,
    description:
      'Determinate the order data ascend or descending',
  })
  @IsOptional()
  sort?: {};

  [x: string]: any;
}
