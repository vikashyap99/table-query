
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function Inputs({searchHandler, selectHandler, Querys, query}){

  const [inputValue, setInputValue] = useState('')

    return (
        <div
        className="container" 
        >
        <div className="input-container">
            <strong>Your Query : </strong>
            <input type="search" className="input" onChange={(e) => setInputValue(e.target.value)} />
            <div>
            <button onClick={() => searchHandler(inputValue)} className="button">
              Search
            </button>
            </div>
        </div>
        <div>
          <strong>Select Query : </strong>
        <Select className="select" onChange={(event) => selectHandler(event)} value={query} label="Query">
          {Querys.map((el, index) => {
            return (
              <MenuItem key={index} value={el.id}>
                {el.query}
              </MenuItem>
            );
          })}
        </Select>
        </div>
        
      </div>
    )

}