import { HttpException, HttpStatus } from '@nestjs/common';

export enum DatabaseErrorCodes {
  RETRIEVE_ERROR = 10,
  FIND_ERROR = 11,
  CREATE_ERROR = 12,
  UPDATE_ERROR = 13,
  DELETE_ERROR = 14,
  CREATE_MANY_ERROR = 15,
  UPDATE_MANY_ERROR = 16,
  DELETE_MANY_ERROR = 17,
  UNKNOWN_ERROR = 18,
}

export const ERROR_RETRIEVING_DOCUMENTS = (
  entityName: string,
  reason?: string,
) => ({
  errorCode: DatabaseErrorCodes.RETRIEVE_ERROR,
  message: `Error retrieving ${entityName.toLowerCase()}s${
    !!reason ? ': ' + reason : ''
  }`,
});

export const ERROR_FINDING_DOCUMENT = (
  entityName: string,
  reason?: string,
) => ({
  errorCode: DatabaseErrorCodes.FIND_ERROR,
  message: `Error finding ${entityName.toLowerCase()}${
    !!reason ? ': ' + reason : ''
  }`,
});

export const ERROR_CREATING_DOCUMENT = (
  entityName: string,
  reason?: string,
) => ({
  errorCode: DatabaseErrorCodes.CREATE_ERROR,
  message: `Error creating ${entityName.toLowerCase()}${
    !!reason ? ': ' + reason : ''
  }`,
});

export const ERROR_CREATING_DOCUMENTS = (
  entityName: string,
  reason?: string,
) => ({
  errorCode: DatabaseErrorCodes.CREATE_MANY_ERROR,
  message: `Error creating ${entityName.toLowerCase()}${
    !!reason ? ': ' + reason : ''
  }`,
});

export const ERROR_UPDATING_DOCUMENT = (
  entityName: string,
  reason?: string,
) => ({
  errorCode: DatabaseErrorCodes.UPDATE_ERROR,
  message: `Error updating ${entityName.toLowerCase()}${
    !!reason ? ': ' + reason : ''
  }`,
});

export const ERROR_UPDATING_DOCUMENTS = (
  entityName: string,
  reason?: string,
) => ({
  errorCode: DatabaseErrorCodes.UPDATE_MANY_ERROR,
  message: `Error updating specified ${entityName.toLowerCase()} list${
    !!reason ? ': ' + reason : ''
  }`,
});

export const ERROR_DELETING_DOCUMENT = (
  entityName: string,
  reason?: string,
) => ({
  errorCode: DatabaseErrorCodes.DELETE_ERROR,
  message: `Error deleting ${entityName.toLowerCase()}${
    !!reason ? ': ' + reason : ''
  }`,
});

export const ERROR_DELETING_DOCUMENTS = (
  entityName: string,
  reason?: string,
) => ({
  errorCode: DatabaseErrorCodes.DELETE_MANY_ERROR,
  message: `Error deleting specifed ${entityName.toLowerCase()} list${
    !!reason ? ': ' + reason : ''
  }`,
});

export const UNKNOWN_ERROR_IN_DB = {
  errorCode: DatabaseErrorCodes.UNKNOWN_ERROR,
  message: `Unknown error in database`,
};

export class DatabaseException extends HttpException {
  constructor(response = UNKNOWN_ERROR_IN_DB) {
    super(response, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
