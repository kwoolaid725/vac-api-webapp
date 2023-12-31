import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";



export default function SearchVac({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.brand.toLowerCase().includes(searchWord.toLowerCase()) ||
             value.model_name.toLowerCase().includes(searchWord.toLowerCase())
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const searchInput = (e) => {
    setFilteredData([]);
    setWordEntered(e.target.innerText);
  }


  return (
        <div className="search">
          <div className="searchInputs">
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                      <SearchIcon />
                    ) : (
                      <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                    </div>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                  />
                </div>
          {filteredData.length !== 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <a className="dataItem" onClick={searchInput}>
                    <p> {value.brand} {value.model_name} : [{value.inv_no}] ({value.type})  </p>
                  </a>
                );
              })}
            </div>
          )}
        </div>
  );
}

