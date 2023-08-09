'use client';

import { getCoinsForCountry } from '@/http/coin';
import { getCountriesWithCoinsList } from '@/http/country';
import {
  Container,
  Box,
  Typography,
  Snackbar,
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  Link,
  TextField,
  Grid,
} from '@mui/material';
import {
  country as CountryType,
  coin as CoinType,
  mint as MintType,
  coin_mint as CoinMintType,
  currency as CurrencyType,
  enumCollectionsCollectableType,
} from '@prisma/client';
import { useState, useEffect } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getCurrencyList } from '@/http/currency';
import { CurrencyNameSort } from '@/sorts';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SaveIcon from '@mui/icons-material/Save';
import { saveCoinInCollection } from '@/http/collection';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddCoin() {
  const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);
  const [error, setError] = useState<string>('');

  const [isCountryListLoading, setIsCountryListLoading] = useState(true);
  const [allListsPopulated, setAllListsPopulated] = useState(false);

  const [countryList, setCountryList] = useState<CountryType[]>([]);
  const [country, setCountry] = useState<CountryType | null>(null);

  const [coinList, setCoinList] = useState<CoinType[]>([]);
  const [coin, setCoin] = useState<CoinType | null>(null);

  const [currencyList, setCurrencyList] = useState<CurrencyType[]>([]);

  const [yearRange, setYearRange] = useState<number[]>([]);
  const [year, setYear] = useState<number | null>(null);

  const [mintList, setMintList] = useState<MintType[]>([]);
  const [mint, setMint] = useState<MintType | null>(null);

  const [isProof, setIsProof] = useState<boolean>(false);
  const [isCleaned, setIsCleaned] = useState<boolean>(false);
  const [paidAmount, setPaidAmount] = useState<string>('');
  const [paidCurrency, setPaidCurrency] = useState<CurrencyType | null>(null);
  const [sourcedFrom, setSourcedFrom] = useState<string>('');
  const [sourcedWhen, setSourcedWhen] = useState<Dayjs | null>(dayjs());
  const [condition, setCondition] = useState<string>('');
  const [storage, setStorage] = useState<string>('');

  const getPayload = () => {
    return {
      coin,
      collectableType: enumCollectionsCollectableType.coin,
      year,
      mint,
      paidCurrency,
      paidAmount,
      sourcedFrom,
      sourcedWhen,
      condition,
      storage,
      isCleaned,
      isProof,
    };
  };

  useEffect(() => {
    getCountriesWithCoinsList().then((data) => {
      setCountryList(data);
      setIsCountryListLoading(false);
    });
  }, []);

  useEffect(() => {
    if (country) {
      getCoinsForCountry(country.id).then((data) => {
        setCoinList(data);
      });
      getCurrencyList().then((data) => {
        setCurrencyList(data.sort(CurrencyNameSort));
      });
    }
  }, [country]);

  const getYearRange = (startYear: number, endYearAny: any) => {
    let endYear = startYear;
    if (!isNaN(endYearAny)) {
      if (typeof endYearAny === 'string') {
        endYear = +(endYearAny as string);
      }
      if (typeof endYearAny === 'number') {
        endYear = endYearAny as number;
      }
    }
    const range = [];
    for (let i = startYear; i <= endYear; i++) {
      range.push(i);
    }
    return range;
  };

  useEffect(() => {
    if (coin) {
      setYearRange(getYearRange(+(coin.year_start as string), coin.year_end));

      if (coin.coin_mint.length === 0) {
        setError(
          'No mints found for this coin! Cannot continue adding this coin to your collection. Try a different coin',
        );
        return;
      }
      const mints = coin.coin_mint.map((cm: CoinMintType) => cm.mint);
      setMintList(mints);
      setAllListsPopulated(true);
    }
  }, [coin]);

  const resetForm = () => {
    setCountry(null);
    setCoin(null);
    setYear(null);
    setMint(null);
    setIsProof(false);
    setIsCleaned(false);
    setPaidAmount('');
    setPaidCurrency(null);
    setSourcedFrom('');
    setSourcedWhen(dayjs());
    setCondition('');
    setStorage('');
  };

  const saveForm = () => {
    saveCoinInCollection(getPayload()).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSnackbarAlertOpen(true);
        resetForm();
      }
    });
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }} gutterBottom>
          Add Coin to your Collection
        </Typography>
        {error && (
          <Typography variant="h6" style={{ fontWeight: 'bold', color: 'red' }} gutterBottom>
            {error}
          </Typography>
        )}
        {isCountryListLoading && <div>Loading...</div>}
        {!isCountryListLoading && (
          <FormControl fullWidth size="small">
            {countryList && countryList.length > 0 && (
              <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                    Country/Former Country:
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Autocomplete
                    disablePortal
                    id="country-select"
                    options={countryList}
                    value={country}
                    defaultValue={country}
                    onChange={(_e, value) => {
                      if (value) {
                        setCountry(value);
                      } else {
                        setCountry(null);
                      }
                    }}
                    sx={{ width: 700 }}
                    renderInput={(params) => <TextField {...params} label="Country" />}
                    getOptionLabel={(option) => option.short_name}
                    renderOption={(props: object, option: CountryType, state: object) => (
                      <div {...props} key={option.id}>
                        {option.short_name}
                      </div>
                    )}
                  />
                  <small>
                    <i>Note that only those countries with coins are listed in this selection box!</i>
                  </small>
                </Grid>

                {country && (
                  <>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Coins for Country:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Autocomplete
                        disablePortal
                        id="coin-select"
                        options={coinList}
                        value={coin}
                        defaultValue={coin}
                        onChange={(_e, value) => {
                          if (value) {
                            setCoin(value);
                          } else {
                            setCoin(null);
                          }
                        }}
                        sx={{ width: 700 }}
                        renderInput={(params) => <TextField {...params} label="Coin" />}
                        getOptionLabel={(option) => option.common_name}
                        renderOption={(props: object, option: CoinType, state: object) => (
                          <div {...props} key={option.id}>
                            {option.common_name}
                          </div>
                        )}
                      />
                    </Grid>
                  </>
                )}

                {allListsPopulated && (
                  <>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Year:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Autocomplete
                        disablePortal
                        id="year-select"
                        options={yearRange}
                        value={year}
                        defaultValue={year}
                        onChange={(_e, value) => {
                          if (value) {
                            setYear(value);
                          } else {
                            setYear(null);
                          }
                        }}
                        sx={{ width: 700 }}
                        renderInput={(params) => <TextField {...params} label="Year" />}
                        getOptionLabel={(option) => option.toString()}
                        renderOption={(props: object, option: number, state: object) => (
                          <div {...props} key={option}>
                            {option.toString()}
                          </div>
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Mint:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Autocomplete
                        disablePortal
                        id="mint-select"
                        options={mintList}
                        value={mint}
                        defaultValue={mint}
                        onChange={(_e, value) => {
                          if (value) {
                            setMint(value);
                          } else {
                            setMint(null);
                          }
                        }}
                        sx={{ width: 700 }}
                        renderInput={(params) => <TextField {...params} label="Mint" />}
                        getOptionLabel={(option) => {
                          let value = option.mint;
                          if (option.mint_mark) {
                            value = `${value} (${option.mint_mark})`;
                          }
                          return value;
                        }}
                        renderOption={(props: object, option: MintType, state: object) => {
                          let value = option.mint;
                          if (option.mint_mark) {
                            value = `${value} (${option.mint_mark})`;
                          }
                          return (
                            <div {...props} key={option.id}>
                              {value}
                            </div>
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Is Proof:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{
                          marginRight: 8,
                        }}
                        checked={isProof}
                        onClick={(e) => setIsProof(!isProof)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Was Cleaned:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{
                          marginRight: 8,
                        }}
                        checked={isCleaned}
                        onClick={(e) => setIsCleaned(!isCleaned)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Paid Amount:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        type="number"
                        value={paidAmount}
                        variant="outlined"
                        inputProps={{
                          maxLength: 8,
                          step: '1',
                        }}
                        onChange={({ target: { value } }) => {
                          if (/^\d+(\.\d{0,2})?$/.test(value)) {
                            setPaidAmount(value);
                          }
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Paid Amount Currency:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Autocomplete
                        disablePortal
                        id="currency-select"
                        options={currencyList}
                        value={paidCurrency}
                        defaultValue={paidCurrency}
                        onChange={(_e, value) => {
                          if (value) {
                            setPaidCurrency(value);
                          } else {
                            setPaidCurrency(null);
                          }
                        }}
                        sx={{ width: 700 }}
                        renderInput={(params) => <TextField {...params} label="Currency" />}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props: object, option: CurrencyType, state: object) => (
                          <div {...props} key={option.id}>
                            {option.name} ({option.years})
                          </div>
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Sourced From:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        type="text"
                        value={sourcedFrom}
                        variant="outlined"
                        onChange={(e) => {
                          setSourcedFrom(e.target.value);
                        }}
                        sx={{ width: 700 }}
                        required
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Sourced When:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={setSourcedWhen} />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Condition:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        type="text"
                        value={condition}
                        variant="outlined"
                        onChange={(e) => {
                          setCondition(e.target.value);
                        }}
                        sx={{ width: 700 }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Storage:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        type="text"
                        value={storage}
                        variant="outlined"
                        required
                        onChange={(e) => {
                          setStorage(e.target.value);
                        }}
                        sx={{ width: 700 }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            )}
            {country?.id && !isNaN(country?.id) && coin?.id && !isNaN(coin?.id) && (
              <div className="">
                <br />
                <Button
                  variant="contained"
                  sx={{ width: 700 }}
                  onClick={saveForm}
                  disabled={
                    country === null ||
                    coin === null ||
                    year === null ||
                    mint === null ||
                    paidAmount === '' ||
                    paidCurrency === null ||
                    sourcedFrom === '' ||
                    storage == ''
                  }
                >
                  <SaveIcon className="pr-2" />
                  Save
                </Button>
              </div>
            )}
          </FormControl>
        )}
        <Snackbar
          open={snackbarAlertOpen}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setSnackbarAlertOpen(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Coin saved to your Collection!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
