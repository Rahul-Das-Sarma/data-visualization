import axios from "axios";

const getTables = async () => {
  try {
    const response = await axios.get("http://localhost:8000");
    return response?.data;
  } catch (err) {
    return err;
  }
};

export { getTables };
