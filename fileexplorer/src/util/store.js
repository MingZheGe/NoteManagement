const storageUtils = {
    async store(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    async getStore(key) {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    },
  
    removeStore(key) {
      localStorage.removeItem(key);
    },
  };
  
  export default storageUtils;
  