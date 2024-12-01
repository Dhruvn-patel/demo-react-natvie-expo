import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CountryPicker, {
  CountryCode,
  DARK_THEME,
} from "react-native-country-picker-modal";

interface CountryPickerProps {
  countryCode?: CountryCode;
  withFlag?: boolean;
  withCallingCode?: boolean;
  withFilter?: boolean;
  withEmoji?: boolean;
  onSelect: (country: any) => void;
}

const CountryPickerItem: React.FC<CountryPickerProps> = ({
  countryCode = "IN",
  withFlag = true,
  withCallingCode = true,
  withFilter = true,
  withEmoji = true,
  onSelect,
}) => {
  const handleSelectCountry = (country: any) => {
    onSelect(country);
  };

  return (
    <View style={styles.container}>
      <CountryPicker
        countryCode={countryCode}
        withFlag={withFlag}
        withCallingCode={withCallingCode}
        withFilter={withFilter}
        withEmoji={withEmoji}
        onSelect={handleSelectCountry}
        theme={DARK_THEME}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
});

export default CountryPickerItem;
