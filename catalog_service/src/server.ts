import expressApp from "./expressApi";

const PORT = process.env.PORT || 8000;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log("Listning the PORT:", PORT);
  });

  process.on("uncaughtException", async (err) => {
    console.log();
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("Sever is up..!");
});
