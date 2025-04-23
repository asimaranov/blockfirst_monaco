import { object, string } from 'zod';
import * as Yup from 'yup';

export const signInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  email_code: string()
    .min(1, 'Email code is required')
    .min(5, 'Email code must be 5 characters')
    .max(5, 'Email code must be 5 characters')
    .optional(),
  name: string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .max(13, 'Name must be less than 13 characters')
    .optional(),
});

const passwordSchema = (type: 'password' | 'passwordConfirm') => Yup.string()
.required(`Не заполнен пароль`)
.test((value) => {
  let errors = [];

  if (!/^(?=.{8,})/.test(value)) {
    errors.push('8+ символов');
  }

  // if (!/^(?=.*[!@#\$%\^&\*])/.test(value)) {
  //   errors.push("Спец. символ");
  // }

  if (!/^(?=.*[0-9])/.test(value)) {
    errors.push('Цифра');
  }

  if (!/^(?=.*[a-z])/.test(value)) {
    errors.push('Строчная буква');
  }

  if (!/^(?=.*[A-Z])/.test(value)) {
    errors.push('Заглавная буква');
  }
  if (errors.length > 0) {
    throw new Yup.ValidationError(
      errors.join('|'),
      errors,
      type,
      value
    );
  }

  return true;
})

export const frontendSchema = Yup.object({
  username: Yup.string()
    .max(13, 'Не более 13 символов')
    .required('Не заполнено имя'),
  password: passwordSchema('password'),
  passwordConfirm: passwordSchema('passwordConfirm'),
  email: Yup.string()
    .email('Неверный формат почты')
    .required('Не заполнена почта'),
});
