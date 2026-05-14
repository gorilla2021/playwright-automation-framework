export const Users = {
  STANDARD:    { username: 'standard_user',        password: 'secret_sauce' },
  LOCKED:      { username: 'locked_out_user',       password: 'secret_sauce' },
  PROBLEM:     { username: 'problem_user',          password: 'secret_sauce' },
  INVALID:     { username: 'fake_user',             password: 'wrong_password' },
};

export const Products = {
  BACKPACK:       'Sauce Labs Backpack',
  BIKE_LIGHT:     'Sauce Labs Bike Light',
  BOLT_SHIRT:     'Sauce Labs Bolt T-Shirt',
  FLEECE_JACKET:  'Sauce Labs Fleece Jacket',
  ONESIE:         'Sauce Labs Onesie',
  RED_SHIRT:      'Test.allTheThings() T-Shirt (Red)',
};

export const ErrorMessages = {
  MISSING_USERNAME:    'Epic sadface: Username is required',
  MISSING_PASSWORD:    'Epic sadface: Password is required',
  LOCKED_USER:         'Epic sadface: Sorry, this user has been locked out',
};

export const SortOptions = {
  A_TO_Z:         'az',
  Z_TO_A:         'za',
  PRICE_LOW_HIGH: 'lohi',
  PRICE_HIGH_LOW: 'hilo',
} as const;
