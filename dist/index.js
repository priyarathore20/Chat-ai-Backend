import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.status(200).json({ message: "homepage" });
});
connectToDatabase()
    .then(() => app.listen(PORT, () => console.log("App connected to port", 8000)))
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map