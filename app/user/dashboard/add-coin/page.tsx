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
import { country as CountryType, coin as CoinType, mint as MintType, coin_mint } from '@prisma/client';
import { useState, useEffect } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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

  const [yearRange, setYearRange] = useState<number[]>([]);
  const [year, setYear] = useState<number | null>(null);

  const [mintList, setMintList] = useState<MintType[]>([]);
  const [mint, setMint] = useState<MintType | null>(null);

  const [isProof, setIsProof] = useState<boolean>(false);

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
      const mints = coin.coin_mint.map((cm: coin_mint) => cm.mint);
      console.log(mints);
      setMintList(mints);

      setAllListsPopulated(true);
    }
  }, [coin]);

  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }} gutterBottom>
          Add Coin to your Collection
        </Typography>{' '}
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
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Paid Amount:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Paid Amount Currency:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Sourced From:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Sourced When:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Condition:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Storage:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                        Comments:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}></Grid>
                  </>
                )}
              </Grid>
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
            Coin saved!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
