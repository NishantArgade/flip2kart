import { app } from "./app.js";
import { dbConnection } from "./connections/db.js";
const PORT = process.env.PORT || 6000;

dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
