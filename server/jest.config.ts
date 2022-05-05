export default {
  clearMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
};
