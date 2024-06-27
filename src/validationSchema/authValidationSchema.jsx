import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()._-])[A-Za-z\d@$!%*#?&^()._-]{8,24}$/,
      'Password must contain at least one number and one special character'
    )
    .min(8, 'Password must be at least 8 characters long')
});
const signupValidationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()._-])[A-Za-z\d@$!%*#?&^()._-]{8,24}$/,
      'Password must contain at least one number and one special character'
    )
    .min(8, 'Password must be at least 8 characters long'),
  phoneNumber: yup.string().required(),
  gender: yup.string().oneOf(['Nam', 'Nữ', 'khác'], 'Thông tin không hợp lệ'),
  accountType: yup.string().oneOf(['Giảng viên', 'Học viên'], 'Thông tin không hợp lệ')
});

export const validationSchema = { loginValidationSchema, signupValidationSchema };
