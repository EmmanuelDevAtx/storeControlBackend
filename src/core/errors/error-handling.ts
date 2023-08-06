import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { BadLoginTypeError, InternalError, InvalidInputError } from '../../graphql/graphql';

export function buildGraphqlErrors(e, message?: string) {

  if (e instanceof UnauthorizedException || e instanceof BadRequestException) {
    return Object.assign(new InvalidInputError(), {
      message: message || e.message,
    });
  }
  return Object.assign(new InternalError(), {
    message: message || e.message,
  });
}
