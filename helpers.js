const helpers = {
  safeAsync: async (fn, handleError) => {
    try {
      await fn();
    } catch (error) {
      if (handleError) handleError(error);
      else console.error(err);
    }
  }
}

module.exports = helpers;