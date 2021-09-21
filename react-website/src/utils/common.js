
/**
 * 
 * @param {string} path 
 * @returns Module
 */
export const importModule = async (path) => {
  try {
    return await import(path)
  } catch (error) {
    return new Error(error);
  }
}

 