import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";

const CurrencyPicker = ({ selectedValue, onValueChange }) => {
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "CAD",
    "NGN",
    "JPY",
    "AUD",
    "CNY",
    "INR",
    "ZAR",
  ];
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {currencies.map((currency) => (
          <Picker.Item label={currency} value={currency} key={currency} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  picker: {
    width: "100%",
  },
});

export default CurrencyPicker;
