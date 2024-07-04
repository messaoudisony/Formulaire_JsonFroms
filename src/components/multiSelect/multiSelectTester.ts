import { RankedTester, UISchemaElement, JsonSchema } from '@jsonforms/core';

const multiSelectTester: RankedTester = (
  uischema: UISchemaElement,
  schema: JsonSchema,
) => {
  if (
    uischema &&
    typeof uischema === 'object' &&
    'scope' in uischema &&
    typeof uischema.scope === 'string' &&
    uischema.scope.endsWith('pays') &&
    schema &&
    typeof schema === 'object' &&
    'type' in schema &&
    schema.type === 'array' &&
    schema.items &&
    typeof schema.items === 'object' &&
    'type' in schema.items &&
    schema.items.type === 'string'
  ) {
    return 10;
  }
  return -1;
};

export default multiSelectTester;
