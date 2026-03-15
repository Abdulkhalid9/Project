require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

console.log('Starting server on...',PORT);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
