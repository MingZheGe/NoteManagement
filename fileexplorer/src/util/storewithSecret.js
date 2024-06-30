const cryptoUtils = {
    generateKey: async function () {
      return await crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
    },
  
    encryptData: async function (key, data) {
      const encodedData = new TextEncoder().encode(JSON.stringify(data));
      const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
  
      const encryptedData = await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        key,
        encodedData
      );
  
      return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encryptedData)),
      };
    },
  
    decryptData: async function (key, encryptedData) {
        console.log(key)
        console.log(encryptedData)
        const { iv, data } = encryptedData;
        console.log(data)
        try {
          const decryptedArray = await crypto.subtle.decrypt(
            {
              name: "AES-GCM",
              iv: new Uint8Array(iv),
            },
            key,
            new Uint8Array(data)
          );
      
          const decryptedString = new TextDecoder().decode(decryptedArray);
          const decryptedData = JSON.parse(decryptedString);
      //    console.log("Decrypted Data:", decryptedData); // 添加调试输出
      
          return decryptedData;
        } catch (error) {
          console.error("Error decrypting data:", error);
          console.error(error)
          throw error; // 抛出错误以便调试
        }
      },
      
  };
  
  const storageUtils = {
    encryptionKey: null, // Holds the encryption key
  
    async init() {
      if (!this.encryptionKey) {
        this.encryptionKey = await cryptoUtils.generateKey();
      }
    },
  
    async store(key, value) {
      await this.init();
      const encryptedData = await cryptoUtils.encryptData(this.encryptionKey, value);
      localStorage.setItem(key, JSON.stringify(encryptedData));
    },
  
    async getStore(key) {
      await this.init();
      const encryptedData = JSON.parse(localStorage.getItem(key));
      if (encryptedData) {
        const decryptedData = await cryptoUtils.decryptData(this.encryptionKey, encryptedData);
        return decryptedData;
      } else {
        return null;
      }
    },
  
    removeStore(key) {
      localStorage.removeItem(key);
    },
  };
  
  
  
  export default storageUtils;
  