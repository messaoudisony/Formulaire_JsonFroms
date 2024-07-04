const multiSelectTester = (uischema: { scope: string; }, schema: { type: string; items: { type: string; }; }) => {
  if (
    uischema.scope &&
    uischema.scope.endsWith('pays') &&
    schema.type === 'array' &&
    schema.items &&
    schema.items.type === 'string'
  ) {
    return 10;
  }
  return -1;
};

export default multiSelectTester;
