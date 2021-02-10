export const rules = {
  name: {
    regEx: /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
    error:
      'Only alphabetic letters are allowed with spaces only in between words.',
  },
  email: {
    regEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'Invalid email address.',
  },
  phone: {
    regEx: /^\d+$/,
    error: 'Enter a valid phone number without a + sign.',
  },
  password: {
    regEx: /(?=^.{8,16}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    error:
      'Password must be minimum length 8 and maximum length 16 characters (with at least a lowercase letter and uppercase letter, a number and special character.',
  },
  numeric: {
    regEx: /^\d+$/,
    error: 'Only numeric digits allowed.',
  },
  float: {
    regEx: /^-?\d*(\.\d+)?$/,
    error: 'Only numeric digits allowed.',
  },
};
