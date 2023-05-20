// /users/:id

// regex e uma expressao regular
//const test = /\/users\/([0-9a-z-_]+)/;

export function biuldRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(routeParametersRegex, "([0-9a-z-_]+)");

  const pathRegex = new RegExp(`^${pathWithParams}`);
  return pathRegex;

  //console.log(Array.from(path.matchAll(routeParametersRegex)));
}
