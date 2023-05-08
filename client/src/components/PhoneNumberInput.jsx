import React, { useState } from "react";
import countries from "../assets/countries.json";

function PhoneNumberInput() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  function handleCountryChange(event) {
    const countryCode = event.target.value;
    const selectedCountry = countries.find((country) => country.code === countryCode);
    setSelectedCountry(selectedCountry);
  }

  return (
    <div>
      <select onChange={handleCountryChange} value={selectedCountry.code}>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name} (+{country.phoneCode})
          </option>
        ))}
      </select>
      <input type="tel" />
    </div>
  );
}

export default PhoneNumberInput;