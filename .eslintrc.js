module.exports = {
  root: true,
  extends: [
    // basic
    '@mizdra/mizdra',
    '@mizdra/mizdra/+typescript',
    '@mizdra/mizdra/+react',
  ],
  rules: {
    'import/no-unresolved': 0,
  }
};
