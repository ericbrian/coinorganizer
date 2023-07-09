"use client";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import { MenuItem, Stack } from "@mui/material";

import {
  coin as coinDb,
  currency as currencyDb,
  mint as mintDb,
} from "@prisma/client";

import { CollectionInput, SparseCountryListType } from "@/global";
import { getCountriesWithCoinsList } from "@/http/country";
import { getCurrencyList } from "@/http/currency";
import { getCoinsForCountry } from "@/http/coin";
import { getPossibleMints, range } from "@/lib/utils";
import { saveCoinInCollection } from "@/http/collection";

export default function AddCoin() {
  const [isCountryListLoading, setIsCountryListLoading] = useState(true);
  const [countryList, setCountryList] = useState<SparseCountryListType[]>([]);
  const [country, setCountry] = useState<SparseCountryListType | null>(null);

  const [coinsList, setCoinsList] = useState<coinDb[]>([]);
  const [coin, setCoin] = useState<coinDb | null>(null);

  const [year, setYear] = useState<string>("");
  const [minYear, setMinYear] = useState<number>(1);
  const [maxYear, setMaxYear] = useState<number>(1);
  const [yearRange, setYearRange] = useState<number[]>([]);

  const [mint, setMint] = useState<mintDb | null>(null);

  const [currenciesList, setCurrenciesList] = useState<currencyDb[]>([]);
  const [paidCurrency, setPaidCurrency] = useState<currencyDb | null>(null);
  const [paidAmount, setPaidAmount] = useState<number | null>(null);

  const [sourcedFrom, setSourcedFrom] = useState<string>("");
  const [sourcedWhen, setSourcedWhen] = useState<Dayjs | null>(
    dayjs(new Date())
  );

  const [condition, setCondition] = useState<string>("");
  const [storage, setStorage] = useState<string>("");
  const [isCleaned, setIsCleaned] = useState(false);
  const [isProof, setIsProof] = useState(false);

  useEffect(() => {
    const promises = [getCountriesWithCoinsList(), getCurrencyList()];
    Promise.all(promises)
      .then((res) => {
        setCountryList(res[0]);
        setCurrenciesList(res[1]);
      })
      .then(() => {
        setIsCountryListLoading(false);
      });
  }, []);

  useEffect(() => {
    if (country) {
      getCoinsForCountry(country.id).then((coins) => setCoinsList(coins));
    }
  }, [country]);

  useEffect(() => {
    if (coin) {
      setMinAndMaxYears();
    }
  }, [coin]);

  const setMinAndMaxYears = () => {
    const min = coin?.year_start ? +coin?.year_start : 1;
    setMinYear(min);
    const max = coin?.year_end ? +coin.year_end : min;
    setMaxYear(max);
    setYearRange(range(min, max));
  };

  const availableMints = (): mintDb[] => {
    if (coin) {
      return getPossibleMints(coin);
    }
    return [];
  };

  const getPayload = (): CollectionInput => ({
    coin,
    collectableType: "coin",
    year,
    mint,
    paidCurrency,
    paidAmount: paidAmount ? +paidAmount : 0,
    sourcedFrom,
    sourcedWhen: sourcedWhen
      ? sourcedWhen.toISOString()
      : new Date().toISOString(),
    condition,
    storage,
    isCleaned,
    isProof,
  });

  const saveForm = () => {
    const payload = getPayload();
    saveCoinInCollection(payload)
      .then((res) => {
        clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearForm = () => {
    setCountry(null);
    setCoin(null);
    setCoinsList([]);
    setYear("");
    setMinYear(1);
    setMaxYear(1);
    setYearRange([]);
    setMint(null);
    setPaidCurrency(null);
    setPaidAmount(null);
    setSourcedFrom("");
    setSourcedWhen(dayjs(new Date()));
    setCondition("");
    setStorage("");
    setIsCleaned(false);
    setIsProof(false);
  };

  if (isCountryListLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1 className="mb-4 text-2xl">Add Coin to Collection</h1>
        <FormControl fullWidth size="small">
          <table className="w-full table-auto border-separate border-spacing-y-2 rounded">
            <tbody>
              <tr>
                <td className="w-1/3 pr-4 text-right">
                  <label className="mr-2">
                    Select country/territory:
                    <br />
                    This list contains only countries for which there have been
                    coins added.
                  </label>
                </td>
                <td>
                  <Autocomplete
                    disablePortal
                    id="country-select"
                    value={country}
                    defaultValue={country}
                    options={countryList}
                    onChange={(_e, value) => {
                      if (value) {
                        setCountry(value);
                      } else {
                        setCountry(null);
                      }
                    }}
                    sx={{ width: 700 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Country" />
                    )}
                    getOptionLabel={(option) => option.short_name}
                    renderOption={(
                      props: object,
                      option: SparseCountryListType,
                      state: object
                    ) => (
                      <div {...props} key={option.id}>
                        {option.short_name}
                      </div>
                    )}
                  />
                </td>
              </tr>
              {coinsList &&
                Array.isArray(coinsList) &&
                coinsList.length > 0 && (
                  <tr>
                    <td className="w-80 text-right align-top">
                      <label className="mr-2">Select a Coin to add:</label>
                    </td>
                    <td className="pb-2">
                      <Autocomplete
                        disablePortal
                        id="coin-select"
                        value={coin}
                        defaultValue={coin}
                        options={coinsList}
                        onChange={(_e, value) => {
                          if (value) {
                            setCoin(value);
                          } else {
                            setCoin(null);
                          }
                        }}
                        sx={{ width: 700 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Coin" />
                        )}
                        getOptionLabel={(option) =>
                          `${option.pretty_face_value}, ${
                            option.common_name
                          }, ${option.year_start}${
                            option.year_end ? " - " + option.year_end : ""
                          }`
                        }
                        renderOption={(
                          props: object,
                          option: coinDb,
                          state: object
                        ) => (
                          <div {...props} key={option.id}>
                            {option.pretty_face_value}, {option.common_name},
                            {option.year_start}
                            {option.year_end ? " - " + option.year_end : ""}
                          </div>
                        )}
                      />
                    </td>
                  </tr>
                )}
              {coin && (
                <>
                  <tr>
                    <td className="w-80 text-right">
                      <label className="mr-2">Year:</label>
                    </td>
                    <td>
                      <Select
                        id="select-year"
                        value={year}
                        label="Year"
                        sx={{ width: 700 }}
                        onChange={(e) => setYear(e.target.value)}
                        required
                      >
                        {yearRange.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                      <br />
                      <small>
                        Years this coin was available: {minYear}
                        {maxYear > minYear && <>- {maxYear}</>}
                      </small>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">
                      <label className="mr-2">Mint:</label>
                    </td>
                    <td>
                      <Autocomplete
                        disablePortal
                        id="mint-select"
                        value={mint}
                        defaultValue={mint}
                        options={availableMints()}
                        onChange={(_e, value) => {
                          if (value) {
                            setMint(value);
                          } else {
                            setMint(null);
                          }
                        }}
                        sx={{ width: 700 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Mint" />
                        )}
                        getOptionLabel={(option) =>
                          `${option.mint}${
                            option.mark_description
                              ? ", " + option.mark_description
                              : ""
                          }${option.mark ? " (" + option.mark + ")" : ""}`
                        }
                        renderOption={(
                          props: object,
                          option: mintDb,
                          state: object
                        ) => (
                          <div {...props} key={option.id}>
                            {option.mint}, {option.mark_description}
                          </div>
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">
                      <label className="mr-2">Paid Amount:</label>
                    </td>
                    <td>
                      <Stack direction="row">
                        <Autocomplete
                          id="currency-payment"
                          label="Currency of Payment"
                          required
                          value={paidCurrency}
                          defaultValue={paidCurrency}
                          options={currenciesList.filter(
                            (cur) => !cur.demonitized_date
                          )}
                          sx={{ width: 200 }}
                          onChange={(_e, value) => {
                            if (value) {
                              setPaidCurrency(value);
                            } else {
                              setPaidCurrency(null);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Currency of Payment"
                            />
                          )}
                          getOptionLabel={(option) =>
                            `${option.name} (${option.short_name})`
                          }
                          renderOption={(
                            props: object,
                            option: currencyDb,
                            state: object
                          ) => (
                            <div {...props} key={option.id}>
                              {option.name} ({option.short_name})
                            </div>
                          )}
                        />
                        &nbsp;
                        <TextField
                          id="paid-amount"
                          variant="outlined"
                          label="Paid Amount"
                          value={paidAmount}
                          onChange={(e: any) => setPaidAmount(e.target.value)}
                        />
                      </Stack>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">
                      <label className="mr-2">Sourced:</label>
                    </td>
                    <td>
                      <Stack direction="row">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="When"
                            value={sourcedWhen}
                            onChange={(value) => setSourcedWhen(value)}
                          />
                          &nbsp;
                          <TextField
                            id="sourced-from"
                            variant="outlined"
                            label="From"
                            value={sourcedFrom}
                            onChange={(e: any) =>
                              setSourcedFrom(e.target.value)
                            }
                          />
                        </LocalizationProvider>
                      </Stack>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">
                      <label className="mr-2">Condition:</label>
                    </td>
                    <td>
                      <TextField
                        id="condition"
                        variant="outlined"
                        label="Condition"
                        value={condition}
                        sx={{ width: 700 }}
                        onChange={(e: any) => setCondition(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">
                      <label className="mr-2">Stored Where:</label>
                    </td>
                    <td>
                      <TextField
                        id="stored-where"
                        variant="outlined"
                        label="Stored Where"
                        value={storage}
                        sx={{ width: 700 }}
                        onChange={(e: any) => setStorage(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">
                      <label className="mr-2">Was the coin cleaned?</label>
                    </td>
                    <td>
                      <Checkbox
                        checked={isCleaned}
                        onChange={() => setIsCleaned(!isCleaned)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">
                      <label className="mr-2">Is this a Proof coin?</label>
                    </td>
                    <td>
                      <Checkbox
                        checked={isProof}
                        onChange={() => setIsProof(!isProof)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <Button
                        variant="contained"
                        sx={{ width: 700 }}
                        onClick={saveForm}
                        disabled={
                          coin == null ||
                          year === "" ||
                          paidAmount === 0 ||
                          paidCurrency == null ||
                          sourcedFrom === "" ||
                          sourcedWhen === null
                        }
                      >
                        <SaveIcon className="pr-2" />
                        Save
                      </Button>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </FormControl>
      </>
    );
  }
}
