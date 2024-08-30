import axios from "axios";

const API_KEY = "b08970934b062d5489ea017b";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;
// const BASE_URL = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;
const GetExchangeRate = async (baseCurrency) => {
  try {
    console.log("seen");
    console.log(baseCurrency, "base currency");
    const response = await axios.get(`${BASE_URL}${baseCurrency}`);
    console.log(response, "response");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch exchange rates");
  }
};

export default GetExchangeRate;
