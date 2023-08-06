import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { BadLoginTypeError, InternalError, InvalidInputError } from '../../graphql/graphql';
import { BadTypeOfLoginException } from '../../users/exceptions/bad-type-of-login-exception';

export function buildGraphqlErrors(e, message?: string) {
  if (e instanceof BadTypeOfLoginException) {
    return Object.assign(new BadLoginTypeError(), {
      message: message || e.message,
    });
  }
  if (e instanceof UnauthorizedException || e instanceof BadRequestException) {
    return Object.assign(new InvalidInputError(), {
      message: message || e.message,
    });
  }
  return Object.assign(new InternalError(), {
    message: message || e.message,
  });
}
