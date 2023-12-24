const path = require("path");

/**
 *
 * @param {string} path
 * @returns
 */
const checkIsRelativeImport = (path) => {
  return path.startsWith("../");
};

const getAbsolutePath = (rootDir, currentModulePath, importedModulePath) => {
  const absolutePath = path.join(currentModulePath, importedModulePath);
  const projectRelatedAbsolutePath = absolutePath.replace(`${rootDir}/`, "");

  return projectRelatedAbsolutePath;
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
          fix(fixer) {
            const absolutePath = getAbsolutePath(
              context.getCwd(),
              context.getPhysicalFilename(),
              path
            );

            const replacementRange = [
              node.source.start + 1,
              node.source.end - 1,
            ]; // this range of the path without quotes

            return fixer.replaceTextRange(replacementRange, absolutePath);
          },
        });
      },
    };
  },
};
