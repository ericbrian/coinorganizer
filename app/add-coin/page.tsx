import Input from "../context-component/Input";
import Select from "../context-component/Select";
import TextField from "../context-component/TextField";

export default function AddCoin() {
  return (
    <div className="m-auto mt-4 grid max-w-2xl">
      <h1 className="mb-4 text-2xl">Add Coin</h1>
      <div>
        <table className="w-9/12 table-fixed" id="add-coin-table">
          <tbody>
            <tr>
              <td className="pr-4 text-right">Country:</td>
              <td>
                <Select />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Currency:</td>
              <td>
                <Select />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Ruler:</td>
              <td>
                <Select />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Period:</td>
              <td>
                <Select />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Nominal Value:</td>
              <td></td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Numeric Value:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Series/Theme Name:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Common Name:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Obverse:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Reverse:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Edge:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Edge Inscription:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Year(s):</td>
              <td>
                <Input />
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
              <td></td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Coin is Bullion?</td>
              <td></td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Composition:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Diameter:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Weight:</td>
              <td>
                <Input />
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
              <td></td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Numista Number:</td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td className="pr-4 text-right">Comment(s):</td>
              <td>
                <TextField />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
