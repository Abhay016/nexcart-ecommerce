import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortby") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      navigate(`${pathname}?${searchParams.toString()}`);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchParams, searchTerm, navigate, pathname]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${pathname}?${params}`);
    setCategory(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      params.set("sortby", newOrder);
      navigate(`${pathname}?${params}`);
      return newOrder;
    });
  };

  const handleClearFilters = () => {
    navigate({ pathname: window.location.pathname });
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 rounded-xl shadow-lg">
      {/* SEARCH BAR */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <FiSearch className="absolute left-3 text-slate-500" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 text-slate-800 rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300"
        />
      </div>

      {/* CATEGORY SELECTION + SORT + CLEAR */}
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl variant="outlined" size="small" className="min-w-[180px]">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            className="w-full"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300, // ensures long lists scroll
                },
              },
            }}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip title={`Sorted by price: ${sortOrder}`}>
          <Button
            variant="contained"
            onClick={toggleSortOrder}
            color="primary"
            className="flex items-center gap-2 h-10 shadow-md hover:shadow-lg transition-transform hover:scale-105"
          >
            Sort By
            {sortOrder === "asc" ? <FiArrowUp size={20} /> : <FiArrowDown size={20} />}
          </Button>
        </Tooltip>

        <button
          className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
          onClick={handleClearFilters}
        >
          <FiRefreshCw className="font-semibold" size={16} />
          <span className="font-semibold">Clear Filter</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
