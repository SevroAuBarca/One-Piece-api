"mongodb+srv://apiAdmin:<password>@cluster0.eezrvir.mongodb.net/test";

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
  } catch (error) {
    console.log(error);
  }
};
