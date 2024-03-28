export function removeEmpty(data: { [key: string]: any }): {
  [key: string]: any;
} {
  //transform properties into key-values pairs and filter all the empty-values
  const entries = Object.entries(data).filter(
    ([, value]) => value != null && value != '',
  );

  //map through all the remaining properties and check if the value is an object.
  //if value is object, use recursion to remove empty properties
  const clean = entries.map(([key, v]) => {
    const value = typeof v == 'object' ? removeEmpty(v) : v;
    return [key, value];
  });

  //transform the key-value pairs back to an object.
  return Object.fromEntries(clean);
}
