
/**
 * 
 * @param {string} path 
 * @returns 
 */
const checkIsRelativeImport = (path) => {
  return path.startsWith("../");
};

module.exports = {
  meta: {
    type: "problem",
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const path = node.source.value;
        const isRelativeImport = checkIsRelativeImport(path);

        if (!isRelativeImport) {
          // juste return if it is not relative import
          return;
        }

        // report the error
        context.report({
          node,
          message: "Relative import are not allowed",
        });
      },
    };
  },
};
