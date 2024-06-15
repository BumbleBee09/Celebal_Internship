function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Data fetched");
        resolve({ data: "Sample Data" });
      }, 1000);
    });
  }
  
  function processData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Data processed");
        resolve(data.data.toUpperCase());
      }, 1000);
    });
  }
  
  function saveData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Data saved");
        resolve("Save successful");
      }, 1000);
    });
  }

  // fetching data using Async / Await

  async function performAsyncOperations() {
    try {
      const data = await fetchData();
      const processedData = await processData(data);
      const result = await saveData(processedData);
      console.log(result);
    } catch (err) {
      console.error("Error:", err);
    }
  }
  
  performAsyncOperations();
  