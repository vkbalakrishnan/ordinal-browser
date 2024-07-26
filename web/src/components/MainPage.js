import { useState } from "react";
import Badge from "./Badge";
const getUTXOsAPI = (address, limit, offset) =>
  `https://api-3.xverse.app/v1/address/${address}/ordinal-utxo?limit=${limit}&offset=${offset}`;

const getInscriptions = async (address, pageSize, offset) => {
  const response = await fetch(getUTXOsAPI(address, pageSize, offset));
  const data = await response.json();
  return data;
};
const MainPage = ({ onSelect, showOn, address, setAddress }) => {
  const [results, setResults] = useState([]);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const handleSearch = async () => {
    if (!address) return;
    const data = await getInscriptions(address, pageSize, results.length);
    setResults(data.results);
    setTotal(data.total);
  };

  const onLoadMore = () => {
    const fetchData = async () => {
      const data = await getInscriptions(address, pageSize, results.length);
      setResults(results.concat(data.results));
    };
    fetchData();
  };

  return (
    <div className="mt-8" style={{ display: showOn ? "" : "none" }}>
      <form className="mb-8 p-4">
        <label
          htmlFor="ownerAddress"
          className="mb- text-sm font-medium text-gray-900 dark:text-white"
        >
          Owner Bitcoin Address
        </label>
        <input
          type="text"
          id="ownerAddress"
          className="mb-4 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Address"
          required
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="mb-2 text-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Look up
        </button>
      </form>
      <h1 className="p-4">Results</h1>
      <ul>
        {results.map((result) => (
          <li
            key={result.inscriptions[0].id}
            className="my-4 p-4 cursor-pointer	hover:bg-gray-800"
            onClick={() => onSelect(result.inscriptions[0])}
          >
            Inscription {result.inscriptions[0].id.slice(-8)}
            <Badge text={result.inscriptions[0].content_type} />
            <span className="float-right">{">"}</span>
          </li>
        ))}
        <li className="m-4">
          {total > 0 && results.length <= total && (
            <button
              type="button"
              disabled={results.length >= total}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={onLoadMore}
            >
              Load More
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};
export default MainPage;
