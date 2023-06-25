"use client";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { country as countryDb } from "@prisma/client";

import AddBoxIcon from "@mui/icons-material/AddBox";
import { useEffect, useState } from "react";
import appconfig from "@/appconfig";

type AutocompleteOptionType = {
  label: string;
  id: number;
};

export default async function AddCoin() {
  const [countries, setCountries] = useState<AutocompleteOptionType[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | "">("");

  const getCountryList = async () => {
    const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/countries`;
    try {
      const res = await fetch(endpoint);
      return res.json();
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  useEffect(() => {
    getCountryList()
      .then((countriesData: countryDb[]) => {
        if (countriesData && Array.isArray(countriesData)) {
          const filteredCountries = countriesData
            .filter((country) => !isNaN(country.id) && country.short_name)
            .map((country) => ({
              label: country.short_name ?? country.name,
              id: country.id,
            }));
          setCountries(filteredCountries);
        } else {
          /* Set error */
        }
      })
      .catch(console.error);
  }, []);

  const handleChangeCountry = (event: any) => {
    const selectedCountryId = event.target.value;
    setSelectedCountryId(selectedCountryId);
  };

  return (
    <>
      <h1 className="mb-4 text-2xl">Add Coin</h1>
      <div>
        <FormControl fullWidth size="small">
          <table id="add-coin-table">
            <tbody>
              {countries && countries.length > 0 && (
                <tr>
                  <td className="w-1/3 pr-4 text-right">
                    <InputLabel id="country-select" className="text-right">
                      Countries
                    </InputLabel>
                  </td>
                  <td>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={countries}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Country" />
                      )}
                    />
                  </td>
                </tr>
              )}{" "}
              {selectedCountryId && !isNaN(selectedCountryId) && (
                <>
                  <tr>
                    <td className="pr-4 text-right">Currency:</td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Ruler:</td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Period:</td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Nominal Value:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Numeric Value:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Series/Theme Name:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Common Name:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Obverse:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Reverse:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Edge:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Edge Inscription:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Year(s):</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">
                      Coin is{" "}
                      <span
                        title="Not Intended for Circulation"
                        className="underline decoration-dotted"
                      >
                        NIFC
                      </span>
                      ?
                    </td>
                    <td>
                      <Checkbox />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Coin is Bullion?</td>
                    <td>
                      <Checkbox />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Composition:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Diameter:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Weight:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Shape:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Mints:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Obverse Designer:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Reverse Designer:</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Image(s):</td>
                    <td>
                      <TextField
                        id="outlined-basic"
                        label="Image File Name"
                        variant="outlined"
                      />
                      <AddBoxIcon className="ml-2 mt-3" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Numista Number:</td>
                    <td>
                      <TextField id="outlined-basic" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-right">Comment(s):</td>
                    <td>
                      <TextField id="comments" multiline />
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          {selectedCountryId && !isNaN(selectedCountryId) && (
            <Button variant="outlined">Save</Button>
          )}
        </FormControl>
      </div>
    </>
  );
}
