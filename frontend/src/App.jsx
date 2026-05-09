import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://name-bangalore-pincode-explorer-api.onrender.com";

function App() {
  const [search, setSearch] = useState("");
  const [pincodes, setPincodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPincodes = async (query = "") => {
    try {
      setLoading(true);

      const url = query ? `${API_URL}?search=${query}` : API_URL;
      const response = await axios.get(url);

      setPincodes(response.data.data);
    } catch (error) {
      console.error("Error fetching pincodes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPincodes();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchPincodes(value);
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Bangalore Pincode Explorer
          </h1>
          <p className="text-slate-600 mt-3">
            Search Bangalore areas by pincode or area name
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by pincode or area name..."
          className="w-full p-4 rounded-xl border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
        />

        <div className="mt-8">
          {loading ? (
            <p className="text-center text-slate-600">Loading...</p>
          ) : pincodes.length === 0 ? (
            <p className="text-center text-slate-600">No results found</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {pincodes.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-5 rounded-xl shadow border border-slate-200"
                >
                  <h2 className="text-xl font-semibold text-slate-800">
                    {item.area}
                  </h2>
                  <p className="text-slate-600 mt-2">
                    Pincode:{" "}
                    <span className="font-semibold">{item.pincode}</span>
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    {item.district}, {item.state}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;