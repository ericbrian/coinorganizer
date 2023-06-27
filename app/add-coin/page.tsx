"use client";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";

import {
  country as countryDb,
  country_currency as countryCurrencyDb,
  currency as currencyDb,
  engraver as engraverDb,
  mint as mintDb,
  period as periodDb,
  ruler as rulerDb,
  shape as shapeDb,
} from "@prisma/client";

import AddBoxIcon from "@mui/icons-material/AddBox";
import { useEffect, useState } from "react";

import { getCountryList } from "@/http/country";
import { getCurrencyList } from "@/http/currency";
import { getEngraversList } from "@/http/engravers";
import { getMintList } from "@/http/mint";
import { getPeriodList } from "@/http/period";
import { getRulerList } from "@/http/ruler";
import { getShapeList } from "@/http/shape";
import {
  getFilteredCurrencyList,
  getFilteredRulerList,
  getFilteredPeriodList,
  getFilteredMintList,
} from "@/lib/filters";

export default function AddCoin() {
  const [isCountryListLoading, setIsCountryListLoading] =
    useState<boolean>(true);
  const [countryList, setCountryList] = useState<countryDb[] | null>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | "">("");
  const [selectedCountryName, setSelectedCountryName] = useState<string>("");

  const [currencyList, setCurrencyList] = useState<currencyDb[]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<currencyDb[]>(
    []
  );
  const [currency, setCurrency] = useState<currencyDb | null>(null);

  const [rulerList, setRulerList] = useState<rulerDb[]>([]);
  const [filteredRulers, setFilteredRulers] = useState<rulerDb[]>([]);
  const [ruler, setRuler] = useState<rulerDb | null>(null);

  const [periodList, setPeriodList] = useState<periodDb[]>([]);
  const [filteredPeriods, setFilteredPeriods] = useState<periodDb[]>([]);
  const [period, setPeriod] = useState<periodDb | null>(null);

  const [mintList, setMintList] = useState<mintDb[]>([]);
  const [filteredMints, setFilteredMints] = useState<mintDb[]>([]);
  const [mint, setMint] = useState<mintDb | null>(null);

  const [engraversList, setEngraversList] = useState<engraverDb[]>([]);
  const [obverseEngraver, setObverseEngraver] = useState<engraverDb | null>(
    null
  );
  const [reverseEngraver, setReverseEngraver] = useState<engraverDb | null>(
    null
  );

  const [shapeList, setShapeList] = useState<shapeDb[]>([]);
  const [shape, setShape] = useState<shapeDb | null>(null);

  useEffect(() => {
    const promises = [
      getCountryList(),
      getCurrencyList(),
      getEngraversList(),
      getMintList(),
      getPeriodList(),
      getRulerList(),
      getShapeList(),
    ];

    Promise.all(promises)
      .then((res) => {
        setCountryList(res[0]);
        setCurrencyList(res[1]);
        const unsortedEngravers = res[2];
        unsortedEngravers.sort((a: engraverDb, b: engraverDb) => {
          const aParts = a.name.split(" ");
          const bParts = b.name.split(" ");
          return `${aParts.at(-1)} ${aParts.at(0)}`.localeCompare(
            `${bParts.at(-1)} ${bParts.at(0)}`
          );
        });
        setEngraversList(res[2]);
        setMintList(res[3]);
        setPeriodList(res[4]);
        setRulerList(res[5]);
        setShapeList(res[6]);
      })
      .then(() => {
        setIsCountryListLoading(false);
      });
  }, []);

  useEffect(() => {
    if (
      selectedCountryId &&
      currencyList &&
      rulerList &&
      periodList &&
      mintList &&
      shapeList
    ) {
      setFilteredCurrencies(
        getFilteredCurrencyList(currencyList, selectedCountryId)
      );

      // Update Rulers Select Options and Widget
      const rulersRes = getFilteredRulerList(rulerList, selectedCountryId);
      setFilteredRulers(rulersRes);
      if (rulersRes.length === 1) {
        setRuler(rulersRes[0]);
      } else {
        setRuler(null);
      }

      // Update Periods Select Options and Widget
      const periodsRes = getFilteredPeriodList(periodList, selectedCountryId);
      setFilteredPeriods(periodsRes);
      if (periodsRes.length === 1) {
        setPeriod(periodsRes[0]);
      } else {
        setPeriod(null);
      }

      // Update Mints Select Options and Widget
      const mintsRes = getFilteredMintList(mintList, selectedCountryId);
      setFilteredMints(mintsRes);
      if (mintsRes.length === 1) {
        setMint(mintsRes[0]);
      } else {
        setMint(null);
      }
    }
  }, [
    selectedCountryId,
    currencyList,
    rulerList,
    periodList,
    mintList,
    shapeList,
  ]);

  return (
    <>
      <h1 className="mb-4 text-2xl">Add Coin</h1>
      <div>
        {isCountryListLoading && <div>Loading...</div>}
        {!isCountryListLoading && (
          <FormControl fullWidth size="small">
            <table
              id="add-coin-table"
              className="border-separate border-spacing-4"
            >
              <tbody>
                {countryList && countryList.length > 0 && (
                  <tr>
                    <td className="w-1/3 pr-4 text-right">Country:</td>
                    <td>
                      {/* Without renderOption, this will fail due to the way MUI handles options */}
                      <Autocomplete
                        disablePortal
                        id="country-select"
                        options={countryList}
                        onChange={(_e, value) => {
                          if (value) {
                            setSelectedCountryId(value.id);
                            setSelectedCountryName(value.short_name);
                          } else {
                            setSelectedCountryId("");
                            setSelectedCountryName("");
                          }
                        }}
                        sx={{ width: 700 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Country" />
                        )}
                        getOptionLabel={(option) => option.short_name}
                        renderOption={(
                          props: object,
                          option: countryDb,
                          state: object
                        ) => (
                          <div {...props} key={option.id}>
                            {option.short_name}
                          </div>
                        )}
                      />
                    </td>
                  </tr>
                )}
                {selectedCountryId && !isNaN(selectedCountryId) && (
                  <>
                    {filteredCurrencies.length === 0 && (
                      <tr>
                        <td colSpan={2} className="text-center font-bold">
                          There is no currency defined for {selectedCountryName}
                          . To be able to add a coin from {selectedCountryName},
                          you must first define a currency.
                        </td>
                      </tr>
                    )}
                    {filteredCurrencies.length > 0 && (
                      <>
                        <tr className="mt-6">
                          <td className="pr-4 text-right">Currency:</td>
                          <td>
                            {/* Without renderOption, this will fail due to the way MUI handles options */}
                            <Autocomplete
                              disablePortal
                              id="currency-select"
                              options={filteredCurrencies}
                              onChange={(e, value) => {
                                if (value) {
                                  setCurrency(value);
                                } else {
                                  setCurrency(null);
                                }
                              }}
                              sx={{ width: 700 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Currency" />
                              )}
                              getOptionLabel={(option) => option.short_name}
                              renderOption={(
                                props: object,
                                option: currencyDb
                              ) => (
                                <div {...props} key={option.id}>
                                  {option.short_name}
                                </div>
                              )}
                            />
                          </td>
                        </tr>
                        <tr className="mt-6">
                          <td className="pr-4 text-right">Ruler:</td>
                          <td>
                            {/* Without renderOption, this will fail due to the way MUI handles options */}
                            <Autocomplete
                              disablePortal
                              id="ruler-select"
                              options={filteredRulers}
                              value={ruler}
                              defaultValue={ruler}
                              onChange={(e, value) => {
                                if (value) {
                                  setRuler(value);
                                } else {
                                  setRuler(null);
                                }
                              }}
                              sx={{ width: 700 }}
                              renderOption={(
                                props: object,
                                option: rulerDb
                              ) => (
                                <div {...props} key={option.id}>
                                  {`${option.name} ${option.years}`}
                                </div>
                              )}
                              renderInput={(params) => (
                                <TextField {...params} label="Ruler" />
                              )}
                              getOptionLabel={(option) =>
                                `${option.name} (${option.years})`
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Period:</td>
                          <td>
                            {/* Without renderOption, this will fail due to the way MUI handles options */}
                            <Autocomplete
                              disablePortal
                              id="period-select"
                              options={filteredPeriods}
                              value={period}
                              defaultValue={period}
                              onChange={(e, value) => {
                                if (value) {
                                  setPeriod(value);
                                } else {
                                  setPeriod(null);
                                }
                              }}
                              sx={{ width: 700 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Period" />
                              )}
                              getOptionLabel={(option) =>
                                `${option.name} (${option.years})`
                              }
                              renderOption={(
                                props: object,
                                option: periodDb
                              ) => (
                                <div {...props} key={option.id}>
                                  {`${option.name} (${option.years})`}
                                </div>
                              )}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Nominal Value:</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Numeric Value:</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">
                            Series/Theme Name:
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Common Name:</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Obverse:</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Reverse:</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Edge:</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Edge Inscription:</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Year(s):</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
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
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Diameter:</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Weight:</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Mints:</td>
                          <td>
                            <Autocomplete
                              disablePortal
                              id="mint-select"
                              options={filteredMints}
                              sx={{ width: 700 }}
                              value={mint}
                              defaultValue={mint}
                              onChange={(e, value) => {
                                if (value) {
                                  setMint(value);
                                } else {
                                  setMint(null);
                                }
                              }}
                              renderOption={(props: object, option: mintDb) => {
                                let mmark = "";
                                if (option.mark) mmark = ` (${option.mark})`;
                                return (
                                  <div {...props} key={option.id}>
                                    {option.mint} {mmark}
                                  </div>
                                );
                              }}
                              renderInput={(params) => (
                                <TextField {...params} label="Mint" />
                              )}
                              getOptionLabel={(option) => {
                                let mmark = "";
                                if (option.mark) mmark = ` (${option.mark})`;
                                return `${option.mint} ${mmark}`;
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Shape:</td>
                          <td>
                            <Autocomplete
                              disablePortal
                              id="shape-select"
                              options={shapeList}
                              sx={{ width: 700 }}
                              onChange={(e, value) => {
                                if (value) {
                                  setShape(value);
                                } else {
                                  setShape(null);
                                }
                              }}
                              renderOption={(
                                props: object,
                                option: shapeDb
                              ) => (
                                <div {...props} key={option.id}>
                                  {option.name}
                                </div>
                              )}
                              renderInput={(params) => (
                                <TextField {...params} label="Shape" />
                              )}
                              getOptionLabel={(option) => `${option.name}`}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">
                            Obverse Engraver/Designer:
                          </td>
                          <td>
                            <Autocomplete
                              disablePortal
                              id="engraver-o-select"
                              options={engraversList}
                              sx={{ width: 700 }}
                              onChange={(e, value) => {
                                if (value) {
                                  setObverseEngraver(value);
                                } else {
                                  setObverseEngraver(null);
                                }
                              }}
                              renderOption={(
                                props: object,
                                option: engraverDb
                              ) => (
                                <div {...props} key={option.id}>
                                  {option.name}
                                </div>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Obverse Engraver/Designer"
                                />
                              )}
                              getOptionLabel={(option) => `${option.name}`}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">
                            Reverse Engraver/Designer:
                          </td>
                          <td>
                            <Autocomplete
                              disablePortal
                              id="engraver-r-select"
                              options={engraversList}
                              sx={{ width: 700 }}
                              onChange={(e, value) => {
                                if (value) {
                                  setReverseEngraver(value);
                                } else {
                                  setReverseEngraver(null);
                                }
                              }}
                              renderOption={(
                                props: object,
                                option: engraverDb
                              ) => (
                                <div {...props} key={option.id}>
                                  {option.name}
                                </div>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Reverse Engraver/Designer"
                                />
                              )}
                              getOptionLabel={(option) => `${option.name}`}
                            />
                          </td>
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
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-4 text-right">Comment(s):</td>
                          <td>
                            <TextField
                              id="comments"
                              multiline
                              sx={{ width: 700 }}
                            />
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
            {selectedCountryId &&
              !isNaN(selectedCountryId) &&
              filteredCurrencies.length > 0 && (
                <Button variant="outlined" sx={{ width: 700 }}>
                  Save
                </Button>
              )}
          </FormControl>
        )}
      </div>
    </>
  );
}
