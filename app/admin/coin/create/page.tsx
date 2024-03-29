'use client';

import { Container, Box, Typography } from '@mui/material';
import React from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import SaveIcon from '@mui/icons-material/Save';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Link from 'next/link';

import {
  Prisma,
  country as CountryType,
  currency as CurrencyType,
  engraver as EngraverType,
  mint as MintType,
  period as PeriodType,
  ruler as RulerType,
  shape as ShapeType,
} from '@prisma/client';

import { useEffect, useState } from 'react';

import { getCountryList } from '@/http/country';
import { getCurrencyList } from '@/http/currency';
import { getEngraversList } from '@/http/engravers';
import { getMintList } from '@/http/mint';
import { getPeriodList } from '@/http/period';
import { getRulerList } from '@/http/ruler';
import { getShapeList } from '@/http/shape';
import { saveNewCoin } from '@/http/coin';
import { Alert, Snackbar } from '@mui/material';
import {
  getFilteredCurrencyList,
  getFilteredMintList,
  getFilteredPeriodList,
  getFilteredRulerList,
} from '@/lib/filters';
import { engraversSort } from '@/utils';
import { CoinInputType } from '@/global';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddCoin() {
  const [isCountryListLoading, setIsCountryListLoading] = useState<boolean>(true);
  const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);

  const [countryList, setCountryList] = useState<CountryType[] | null>([]);
  const [country, setCountry] = useState<CountryType | null>(null);

  const [currencyList, setCurrencyList] = useState<CurrencyType[]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<CurrencyType[]>([]);
  const [currency, setCurrency] = useState<CurrencyType | null>(null);

  const [rulerList, setRulerList] = useState<RulerType[]>([]);
  const [filteredRulers, setFilteredRulers] = useState<RulerType[]>([]);
  const [ruler, setRuler] = useState<RulerType | null>(null);

  const [periodList, setPeriodList] = useState<PeriodType[]>([]);
  const [filteredPeriods, setFilteredPeriods] = useState<PeriodType[]>([]);
  const [period, setPeriod] = useState<PeriodType | null>(null);

  const [faceValue, setFaceValue] = useState('');
  const [obverse, setObverse] = useState('');
  const [reverse, setReverse] = useState('');
  const [edge, setEdge] = useState('');
  const [edgeInscription, setEdgeInscription] = useState('');
  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');
  const [prettyFaceValue, setPrettyFaceValue] = useState('');
  const [seriesOrThemeName, setSeriesOrThemeName] = useState('');
  const [commonName, setCommonName] = useState('');
  const [composition, setComposition] = useState('');
  const [weightG, setWeightG] = useState('');
  const [diameterMm, setDiameterMm] = useState('');
  const [isNifc, setIsNifc] = useState(false);
  const [isBullion, setIsBullion] = useState(false);
  const [numistaNumber, setNumistaNumber] = useState('');
  const [comments, setComments] = useState('');

  const [mintList, setMintList] = useState<MintType[]>([]);
  const [filteredMints, setFilteredMints] = useState<MintType[]>([]);
  const [mints, setMints] = useState<MintType[] | null>(null);

  const [engraversList, setEngraversList] = useState<EngraverType[]>([]);
  const [obverseEngravers, setObverseEngravers] = useState<EngraverType | null>(null);
  const [reverseEngravers, setReverseEngravers] = useState<EngraverType | null>(null);

  const [shapeList, setShapeList] = useState<ShapeType[]>([]);
  const [shape, setShape] = useState<ShapeType | null>(null);

  const getFormValues = (): CoinInputType => {
    return {
      faceValue: +faceValue,
      obverse,
      reverse,
      edge,
      edgeInscription,
      yearStart,
      yearEnd,
      prettyFaceValue,
      seriesOrThemeName,
      commonName,
      composition,
      weightG: +weightG,
      diameterMm: +diameterMm,
      isNifc,
      isBullion,
      numistaNumber,
      comments,
      country,
      currency,
      shape,
      ruler,
      period,
      obverseEngravers,
      reverseEngravers,
      mints,
    };
  };

  const clearFormForNewCoin = () => {
    setCountry(null);
    setCurrency(null);
    setRuler(null);
    setPeriod(null);
    setFaceValue('');
    setObverse('');
    setReverse('');
    setEdge('');
    setEdgeInscription('');
    setYearStart('');
    setYearEnd('');
    setPrettyFaceValue('');
    setSeriesOrThemeName('');
    setCommonName('');
    setComposition('');
    setWeightG('');
    setDiameterMm('');
    setIsNifc(false);
    setIsBullion(false);
    setNumistaNumber('');
    setComments('');
    setMints(null);
    setObverseEngravers(null);
    setReverseEngravers(null);
    setShape(null);
  };

  const saveForm = async () => {
    const payload: CoinInputType = getFormValues();
    saveNewCoin(payload)
      .then((res) => {
        setSnackbarAlertOpen(true);
        clearFormForNewCoin();
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          const target = e.meta?.target;
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
            console.log(`There is a unique constraint violation, a new coin cannot be created in field ${target}.`);
          }
        }
        throw e;
      });
  };

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
        setEngraversList(res[2].sort(engraversSort));
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
    if (country?.id && currencyList && rulerList && periodList && mintList && shapeList) {
      const currenciesRes = getFilteredCurrencyList(currencyList, country?.id);
      setFilteredCurrencies(currenciesRes);
      if (currenciesRes.length === 1) {
        setCurrency(currenciesRes[0]);
      } else {
        setCurrency(null);
      }

      // Update Rulers Select Options and Widget
      const rulersRes = getFilteredRulerList(rulerList, country?.id);
      setFilteredRulers(rulersRes);
      if (rulersRes.length === 1) {
        setRuler(rulersRes[0]);
      } else {
        setRuler(null);
      }

      // Update Periods Select Options and Widget
      const periodsRes = getFilteredPeriodList(periodList, country?.id);
      setFilteredPeriods(periodsRes);
      if (periodsRes.length === 1) {
        setPeriod(periodsRes[0]);
      } else {
        setPeriod(null);
      }

      // Update Mints Select Options and Widget
      const mintsRes = getFilteredMintList(mintList, country?.id);
      setFilteredMints(mintsRes);
      if (mintsRes.length === 1) {
        setMints(mintsRes);
      } else {
        setMints(null);
      }
    }
  }, [country, currencyList, rulerList, periodList, mintList, shapeList]);

  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Country - Create
        </Typography>

        <h1 className="mb-4 text-2xl">Add Coin</h1>
        <div>
          {isCountryListLoading && <div>Loading...</div>}
          {!isCountryListLoading && (
            <FormControl fullWidth size="small">
              <table id="add-coin-table" className="border-separate border-spacing-4">
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
                      </td>
                    </tr>
                  )}
                  {country && !isNaN(country.id) && (
                    <>
                      {filteredCurrencies.length === 0 && (
                        <tr>
                          <td colSpan={2} className="text-center font-bold">
                            There is no currency defined for {country.short_name}. To be able to add a coin from{' '}
                            {country.short_name}, you must first{' '}
                            <Link
                              href={`/admin/currency/country/${country.short_name}-${country.id}`}
                              className="text-blue-700 underline"
                            >
                              define a currency
                            </Link>
                            .
                          </td>
                        </tr>
                      )}
                      {filteredCurrencies.length > 0 && (
                        <>
                          <tr className="mt-6">
                            <td className="pr-4 text-right">Currency:</td>
                            <td>
                              <Autocomplete
                                disablePortal
                                id="currency-select"
                                options={filteredCurrencies}
                                value={currency}
                                defaultValue={currency}
                                onChange={(e, value) => {
                                  if (value) {
                                    setCurrency(value);
                                  } else {
                                    setCurrency(null);
                                  }
                                }}
                                sx={{
                                  width: 700,
                                }}
                                renderInput={(params) => <TextField {...params} label="Currency" />}
                                getOptionLabel={(option) => `${option.name} (${option.short_name})`}
                                renderOption={(props: object, option: CurrencyType) => (
                                  <div {...props} key={option.id}>
                                    {option.short_name}
                                  </div>
                                )}
                              />
                            </td>
                          </tr>
                          {filteredRulers?.length > 0 && (
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
                                  sx={{
                                    width: 700,
                                  }}
                                  renderOption={(props: object, option: RulerType) => (
                                    <div {...props} key={option.id}>
                                      {`${option.name} ${option.years}`}
                                    </div>
                                  )}
                                  renderInput={(params) => <TextField {...params} label="Ruler" />}
                                  getOptionLabel={(option) => `${option.name} (${option.years})`}
                                />
                              </td>
                            </tr>
                          )}
                          {filteredPeriods?.length > 0 && (
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
                                  sx={{
                                    width: 700,
                                  }}
                                  renderInput={(params) => <TextField {...params} label="Period" />}
                                  getOptionLabel={(option) => `${option.name} (${option.years})`}
                                  renderOption={(props: object, option: PeriodType) => (
                                    <div {...props} key={option.id}>
                                      {`${option.name} (${option.years})`}
                                    </div>
                                  )}
                                />
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td className="pr-4 text-right">Nominal Value:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setPrettyFaceValue(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Numeric Value:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setFaceValue(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Series/Theme Name:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setSeriesOrThemeName(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Common Name:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setCommonName(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Obverse:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setObverse(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Reverse:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setReverse(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Edge:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setEdge(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Edge Inscription:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setEdgeInscription(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Start Year:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setYearStart(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">End Year:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setYearEnd(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">
                              Coin is{' '}
                              <span title="Not Intended for Circulation" className="underline decoration-dotted">
                                NIFC
                              </span>
                              ?
                            </td>
                            <td>
                              <Checkbox checked={isNifc} onChange={() => setIsNifc(!isNifc)} />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Coin is Bullion?</td>
                            <td>
                              <Checkbox checked={isBullion} onChange={() => setIsBullion(!isBullion)} />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Composition:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setComposition(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Diameter:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 500,
                                }}
                                onChange={(e) => setDiameterMm(e.target.value)}
                              />
                              millimeter
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Weight:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 500,
                                }}
                                onChange={(e) => setWeightG(e.target.value)}
                              />
                              grams
                            </td>
                          </tr>
                          {filteredMints?.length > 0 && (
                            <tr>
                              <td className="pr-4 text-right">Mints:</td>
                              <td>
                                <Autocomplete
                                  multiple
                                  disableCloseOnSelect
                                  id="checkboxes-tags-demo"
                                  options={filteredMints}
                                  sx={{
                                    width: 700,
                                  }}
                                  onChange={(e, values) => {
                                    if (values) {
                                      setMints(values);
                                    } else {
                                      setMints(null);
                                    }
                                  }}
                                  getOptionLabel={(option) => {
                                    let markLetter = '';
                                    if (option.mark) markLetter = `(${option.mark})`;
                                    return `${option.mint} ${markLetter}`;
                                  }}
                                  renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                      <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{
                                          marginRight: 8,
                                        }}
                                        checked={selected}
                                      />
                                      {option.mint}
                                      {option.mark_description && <>, {option.mark_description}</>}{' '}
                                      {option.mark && <>({option.mark})</>}
                                    </li>
                                  )}
                                  renderInput={(params) => <TextField {...params} label="Mints" />}
                                />
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td className="pr-4 text-right">Shape:</td>
                            <td>
                              <Autocomplete
                                disablePortal
                                id="shape-select"
                                options={shapeList}
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e, value) => {
                                  if (value) {
                                    setShape(value);
                                  } else {
                                    setShape(null);
                                  }
                                }}
                                renderOption={(props: object, option: ShapeType) => (
                                  <div {...props} key={option.id}>
                                    {option.name}
                                  </div>
                                )}
                                renderInput={(params) => <TextField {...params} label="Shape" />}
                                getOptionLabel={(option) => `${option.name}`}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Obverse Engravers/Designers:</td>
                            <td>
                              <Autocomplete
                                disablePortal
                                id="engraver-o-select"
                                options={engraversList}
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e, value) => {
                                  if (value) {
                                    setObverseEngravers(value);
                                  } else {
                                    setObverseEngravers(null);
                                  }
                                }}
                                renderOption={(props: object, option: EngraverType) => (
                                  <div {...props} key={option.id}>
                                    {option.name}
                                  </div>
                                )}
                                renderInput={(params) => <TextField {...params} label="Obverse Engravers/Designers" />}
                                getOptionLabel={(option) => `${option.name}`}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Reverse Engravers/Designers:</td>
                            <td>
                              <Autocomplete
                                disablePortal
                                id="engraver-r-select"
                                options={engraversList}
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e, value) => {
                                  if (value) {
                                    setReverseEngravers(value);
                                  } else {
                                    setReverseEngravers(null);
                                  }
                                }}
                                renderOption={(props: object, option: EngraverType) => (
                                  <div {...props} key={option.id}>
                                    {option.name}
                                  </div>
                                )}
                                renderInput={(params) => <TextField {...params} label="Reverse Engravers/Designers" />}
                                getOptionLabel={(option) => `${option.name}`}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Image(s):</td>
                            <td>
                              This functionality hasn&apos;t been implemented yet. To add images already uploaded, use
                              the `add-images` page.
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Numista Number:</td>
                            <td>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setNumistaNumber(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-4 text-right">Comment(s):</td>
                            <td>
                              <TextField
                                id="comments"
                                multiline
                                sx={{
                                  width: 700,
                                }}
                                onChange={(e) => setComments(e.target.value)}
                              />
                            </td>
                          </tr>
                        </>
                      )}
                    </>
                  )}
                </tbody>
              </table>
              {country?.id && !isNaN(country?.id) && filteredCurrencies.length > 0 && (
                <div className="flex basis-1/4 flex-col items-center justify-center">
                  <Button
                    variant="contained"
                    sx={{ width: 700 }}
                    onClick={saveForm}
                    disabled={
                      commonName === '' ||
                      yearStart === '' ||
                      prettyFaceValue === '' ||
                      faceValue === '' ||
                      obverse === '' ||
                      reverse === '' ||
                      edge === '' ||
                      composition === '' ||
                      diameterMm === '' ||
                      weightG === '' ||
                      numistaNumber === '' ||
                      mints == null
                    }
                  >
                    <SaveIcon className="pr-2" />
                    Save
                  </Button>
                </div>
              )}
            </FormControl>
          )}
        </div>
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
