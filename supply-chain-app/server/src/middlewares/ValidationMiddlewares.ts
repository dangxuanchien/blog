import { MessagesValidation } from '../common/constants/MessagesConstants';
import { body } from 'express-validator';

export const validateLogin = () => {
  return [
    body('loginId', MessagesValidation.LOGINID_PASSWORD_REQUIRED).notEmpty(), 
    body('password', MessagesValidation.LOGINID_PASSWORD_REQUIRED).notEmpty()
  ];
};