function fetchData(callback) {
    setTimeout(() => {
      console.log("Data fetched");
      callback(null, { data: "Sample Data" });
    }, 1000);
  }
  
  function processData(data, callback) {
    setTimeout(() => {
      console.log("Data processed");
      callback(null, data.data.toUpperCase());
    }, 1000);
  }
  
  function saveData(data, callback) {
    setTimeout(() => {
      console.log("Data saved");
      callback(null, "Save successful");
    }, 1000);
  }
  
  function handleError(error) {
    console.error("Error:", error);
  }
  
  // Using the callback-based functions
  fetchData((err, data) => {
    if (err) {
      handleError(err);
    } else {
      processData(data, (err, processedData) => {
        if (err) {
          handleError(err);
        } else {
          saveData(processedData, (err, result) => {
            if (err) {
              handleError(err);
            } else {
              console.log(result);
            }
          });
        }
      });
    }
  });
  