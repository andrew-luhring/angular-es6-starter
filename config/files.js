module.exports = [
  'public/lib/angular/angular.js',
  'public/lib/angular-mocks/angular-mocks.js',
  'public/lib/angular-ui-router/release/angular-ui-router.js',
  'public/lib/jquery/dist/jquery.js',
  'public/lib/lodash/dist/lodash.js',
  {pattern: 'public/js/*.js', included: false},
  {pattern: 'tests/unit/_*.js', included: false},
];
