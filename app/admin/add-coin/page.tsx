"use client";

import Link from "next/link";
import { useState } from "react";

export default function AddCoin() {
  const [prettyFaceValue, setPrettyFaceValue] = useState(""); // nominal value
  const [faceValue, setFaceValue] = useState(""); // numeric value
  const [seriesOrThemeName, setSeriesOrThemeName] = useState("");
  const [commonName, setCommonName] = useState("");
  const [obverse, setObverse] = useState("");
  const [reverse, setReverse] = useState("");
  const [edge, setEdge] = useState("");
  const [edgeInscription, setEdgeInscription] = useState("");
  const [composition, setComposition] = useState("");
  const [yearStart, setYearStart] = useState(
    new Date().getFullYear().toString()
  );
  const [yearEnd, setYearEnd] = useState("");
  const [comments, setComments] = useState("");
  const [diameterMm, setDiameterMm] = useState("");
  const [weightGrams, setWeightGrams] = useState("");
  const [numistaNumber, setNumistaNumber] = useState("");
  const [isNifc, setIsNifc] = useState(false);
  const [isBullion, setIsBullion] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageIsPreferred, setImageIsPreferred] = useState<boolean>(false);

  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(
    null
  );
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<string | null>(
    null
  );
  const [selectedShapeId, setSelectedShapeId] = useState<string>("1");
  const [selectedRulerId, setSelectedRulerId] = useState<string | null>(null);
  const [selectedPeriodId, setSelectedPeriodId] = useState<string | null>(null);
  const [selectedMintIds, setSelectedMintIds] = useState<number[]>([]);
  const [selectedObverseDesignerId, setSelectedObverseDesignerId] = useState<
    string | null
  >(null);
  const [selectedReverseDesignerId, setSelectedReverseDesignerId] = useState<
    string | null
  >(null);

  const [filteredCurrencyList, setFilteredCurrencyList] = useState<
    CurrencyType[]
  >([]);
  const [filteredMintsList, setFilteredMintsList] = useState<MintType[]>([]);

  return (
    <div className="m-auto mt-4 grid max-w-2xl">
      <h1 className="mb-4 text-2xl">Add Coin</h1>
      <div>
        <table className="w-9/12 table-fixed">
          <tbody>
            <tr>
              <td className="text-right">
                <label className="mr-2">Select country/territory:</label>
              </td>
              <td>
                <select
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  value={selectedCountryId ?? ""}
                  onChange={(e) => {
                    setSelectedCountryId(e.target.value);
                    setFilteredCurrencyList([]);
                    setSelectedCurrencyId(null);
                  }}
                >
                  <option value="">--------</option>
                  {countriesList?.map((opt: CountryType) => (
                    <option value={opt.id} key={opt.id}>
                      {opt.short_name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                {selectedCountryId &&
                  (!filteredCurrencyList ||
                    filteredCurrencyList.length === 0) && (
                    <div className="mt-4 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none">
                      To be able to add a coin from the selected country, you
                      must add a Currency for it. Then, come back here.
                      <br />
                      Add new{" "}
                      <Link
                        className="text-custom-shamrock-green font-bold hover:underline dark:text-blue-500"
                        to="/create/currency"
                      >
                        Currency
                      </Link>
                      .
                    </div>
                  )}
              </td>
            </tr>
          </tbody>
        </table>
        {filteredCurrencyList && filteredCurrencyList.length > 0 && (
          <table className="w-9/12 table-fixed">
            <tbody>
              <tr>
                <td className="text-right">
                  <label className="mr-2">Curreny:</label>
                </td>
                <td>
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    onChange={(e) => setSelectedCurrencyId(e.target.value)}
                    value={selectedCurrencyId || ""}
                  >
                    <option value="">--------</option>
                    {filteredCurrencyList.map((opt) => (
                      <option value={opt.id} key={opt.id}>
                        {opt.name} ({opt.short_name}), {opt.years}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {selectedCountryId && selectedCurrencyId && (
          <table className="w-9/12 table-fixed">
            <tbody>
              <tr>
                <td className="text-right">
                  <label className="mr-2">Ruler:</label>
                </td>
                <td>
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    onChange={(e) => setSelectedRulerId(e.target.value)}
                  >
                    <option value="0">--------</option>
                    {rulersList
                      .filter(
                        (opt: RulerType) =>
                          opt.country_id === parseInt(selectedCountryId, 10)
                      )
                      .map((opt: RulerType) => (
                        <option value={opt.id} key={opt.id}>
                          {opt.name}, House of {opt.house}, {opt.years}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Period:</label>
                </td>
                <td>
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    onChange={(e) => setSelectedPeriodId(e.target.value)}
                    defaultValue={0}
                    value={selectedPeriodId || ""}
                  >
                    <option value="">--------</option>
                    {periodsList
                      .filter(
                        (opt: PeriodType) =>
                          opt.country_id === parseInt(selectedCountryId, 10)
                      )
                      .map((opt: PeriodType) => (
                        <option value={opt.id} key={opt.id}>
                          {opt.name} ({opt.years})
                        </option>
                      ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Nominal Value:</label>
                </td>
                <td>
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    value={prettyFaceValue}
                    onChange={(e) => setPrettyFaceValue(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Numeric Value:</label>
                </td>
                <td>
                  {" "}
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    required
                    value={faceValue}
                    onChange={(e) => setFaceValue(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Series/Theme Name:</label>
                </td>
                <td>
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    value={seriesOrThemeName}
                    onChange={(e) => setSeriesOrThemeName(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Common Name:</label>
                </td>
                <td>
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    required
                    value={commonName}
                    onChange={(e) => setCommonName(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Obverse:</label>
                </td>
                <td>
                  <textarea
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    required
                    value={obverse}
                    onChange={(e) => setObverse(e.target.value)}
                    onPaste={(e: Event) => setObverse(handlePaste(e))}
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Reverse:</label>
                </td>
                <td>
                  <textarea
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    required
                    value={reverse}
                    onChange={(e) => setReverse(e.target.value)}
                    onPaste={(e: Event) => setReverse(handlePaste(e))}
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Edge:</label>
                </td>
                <td>
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    required
                    value={edge}
                    onChange={(e) => setEdge(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <small>
                    Edge example values: Milled, Smooth, Reeded, Plain, etc.
                  </small>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Edge Inscription:</label>
                </td>
                <td>
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    required
                    value={edgeInscription}
                    onChange={(e) => setEdgeInscription(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Year(s):</label>
                </td>
                <td>
                  Start: &nbsp;
                  <input
                    className="w-40 appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="number"
                    min={0}
                    max={new Date().getFullYear().toString()}
                    required
                    value={yearStart}
                    onChange={(e) => setYearStart(e.target.value)}
                  />
                  &nbsp;&nbsp;&nbsp; End: &nbsp;
                  <input
                    className="w-40 appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="number"
                    min={0}
                    max={new Date().getFullYear().toString()}
                    required
                    value={yearEnd}
                    onChange={(e) => setYearEnd(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <small>
                    If this coin was only minted in 1 year, leave the end year
                    empty.
                  </small>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">
                    Coin is{" "}
                    <span
                      title="Not Intended for Circulation"
                      className="underline decoration-dotted"
                    >
                      NIFC
                    </span>
                    ?
                  </label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={isNifc}
                    onChange={() => setIsNifc(!isNifc)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Coin is Bullion?</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={isBullion}
                    onChange={() => setIsBullion(!isBullion)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Composition:</label>
                </td>
                <td>
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    required
                    value={composition}
                    onChange={(e) => setComposition(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Diameter:</label>
                </td>
                <td>
                  <input
                    className="w-40 appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="number"
                    required
                    value={diameterMm}
                    onChange={(e) => setDiameterMm(e.target.value)}
                  />{" "}
                  mm
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Weight:</label>
                </td>
                <td>
                  <input
                    className="w-40 appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="number"
                    required
                    value={weightGrams}
                    onChange={(e) => setWeightGrams(e.target.value)}
                  />{" "}
                  g
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Shape:</label>
                </td>
                <td>
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    onChange={(e) => setSelectedShapeId(e.target.value)}
                    value={selectedShapeId}
                  >
                    {shapesList.map((opt: ShapeType) => (
                      <option value={opt.id} key={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Mints:</label>
                </td>
                <td>
                  {filteredMintsList.map((opt) => {
                    let mintDisplay = opt.mint;
                    if (opt.mark) {
                      mintDisplay = `${mintDisplay} (${opt.mark} mark)`;
                    }
                    mintDisplay = `${mintDisplay}, ${opt.years}`;

                    return (
                      <div key={opt.id}>
                        <input
                          type="checkbox"
                          value={opt.id}
                          key={opt.id}
                          className="mr-2"
                          onChange={(e) => handleMintChange(e)}
                        />
                        {mintDisplay}
                      </div>
                    );
                  })}
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Obverse Designer:</label>
                </td>
                <td>
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    onChange={(e) =>
                      setSelectedObverseDesignerId(e.target.value)
                    }
                    value={selectedObverseDesignerId || ""}
                  >
                    <option value="">--------</option>
                    {engraversList.map((opt: DesignerType) => (
                      <option value={opt.id} key={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Reverse Designer:</label>
                </td>
                <td>
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    onChange={(e) =>
                      setSelectedReverseDesignerId(e.target.value)
                    }
                    value={selectedReverseDesignerId || ""}
                  >
                    <option value="">--------</option>
                    {engraversList.map((opt: DesignerType) => (
                      <option value={opt.id} key={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              {images.length > 0 && (
                <tr>
                  <td className="text-right">
                    {images.length > 0 && (
                      <label className="mr-2">Image(s) to Add:</label>
                    )}
                  </td>
                  <td>
                    {images.length > 0 &&
                      images.map((image) => (
                        <div key={image.id}>
                          &middot; {image.url} (preferred:{" "}
                          {image.is_preferred ? "yes" : "no"})
                        </div>
                      ))}
                  </td>
                </tr>
              )}
              <tr>
                <td className="text-right">
                  <label className="mr-2">Image(s):</label>
                </td>
                <td>
                  <table className="mb-4 mt-4 table-fixed">
                    <tbody>
                      <tr>
                        <td>filename with extension</td>
                        <td>Is Preferred?</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            type="text"
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            className="ml-6"
                            checked={imageIsPreferred}
                            onChange={(e) =>
                              setImageIsPreferred(!imageIsPreferred)
                            }
                          />
                        </td>
                        <td>
                          <button
                            className="rounded bg-orange-600 px-2 py-2 text-white focus:outline-none disabled:opacity-50"
                            disabled={imageUrl === ""}
                            onClick={handleAddImage}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Numista Number:</label>
                </td>
                <td>
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    required
                    onChange={(e) => setNumistaNumber(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <label className="mr-2">Comment(s):</label>
                </td>
                <td>
                  <textarea
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    required
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <button
                    onClick={handleSubmit}
                    disabled={
                      commonName === "" ||
                      yearStart === "" ||
                      prettyFaceValue === "" ||
                      faceValue === "" ||
                      obverse === "" ||
                      reverse === "" ||
                      edge === "" ||
                      composition === "" ||
                      diameterMm === "" ||
                      weightGrams === "" ||
                      numistaNumber === ""
                    }
                    className="bg-custom-shamrock-green mt-8 rounded px-8 py-3 text-white focus:outline-none disabled:opacity-50"
                  >
                    Save Coin
                  </button>
                  &nbsp;
                  <button
                    onClick={resetForm}
                    className="mt-8 rounded bg-red-600 px-8 py-3 text-white focus:outline-none disabled:opacity-50"
                  >
                    Reset
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
