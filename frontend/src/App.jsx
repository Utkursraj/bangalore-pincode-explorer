const API_URL = "https://name-bangalore-pincode-explorer-api.onrender.com/api/pincodes";

const fetchPincodes = async (query = "") => {
  try {
    setLoading(true);

    const url = query ? `${API_URL}?search=${query}` : API_URL;
    const response = await axios.get(url);

    setPincodes(response.data?.data || []);
  } catch (error) {
    console.error("Error fetching pincodes:", error);
    setPincodes([]);
  } finally {
    setLoading(false);
  }
};