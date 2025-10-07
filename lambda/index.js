exports.handler = async (event) => {
  console.log("Received:", event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Data received", input: event })
  };
};

