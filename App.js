import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CurrencyPicker from "./components/CurrencyPicker";
import getExchangeRate from "./services/exchangeRateServices";

const App = () => {
  const [amount, setAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExchangeRate();
  }, [sourceCurrency, targetCurrency]);

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getExchangeRate(sourceCurrency);
      setExchangeRate(data.conversion_rates[targetCurrency]);
    } catch (error) {
      console.error("Error in fetchExchangeRate:", error.message);
      setError("Failed to fetch exchange rates. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amount && exchangeRate) {
      setConvertedAmount((parseFloat(amount) * exchangeRate).toFixed(2));
    } else {
      setConvertedAmount("");
    }
  }, [amount, exchangeRate]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.label}>From</Text>
      <CurrencyPicker
        selectedValue={sourceCurrency}
        onValueChange={setSourceCurrency}
      />
      <Text style={styles.label}>To</Text>
      <CurrencyPicker
        selectedValue={targetCurrency}
        onValueChange={setTargetCurrency}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <Text style={styles.exchangeRate}>
            {exchangeRate
              ? `Exchange Rate: 1 ${sourceCurrency} = ${exchangeRate} ${targetCurrency}`
              : ""}
          </Text>
          <Text style={styles.convertedAmount}>
            Converted Amount: {convertedAmount}
          </Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={fetchExchangeRate}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    marginTop: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  exchangeRate: {
    fontSize: 16,
    marginTop: 16,
    fontStyle: "italic",
  },
  convertedAmount: {
    fontSize: 18,
    marginTop: 24,
    fontWeight: "bold",
  },
  error: {
    fontSize: 16,
    marginTop: 16,
    color: "red",
  },
  button: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default App;

