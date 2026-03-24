const app = require("./src/app");
const { PORT } = require("./src/config/env.config");

// DB connection is handled inside app.js via mongoose.connect()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});