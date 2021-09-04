const config = require("../utils/config");
const app = require("./app");

app.listen(config.port, () => {
  console.log(`Server listening on the port::${config.port}`);
});
