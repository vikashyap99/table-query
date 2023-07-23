import {  useEffect, useState, useMemo } from "react";
import { tableData } from "./data";
import Inputs from "./Component/Inputs";
import Pagination from "./Component/Pagination";
import "./styles.css";

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};


// predefined queries
const Querys = [
  {
    id: 1,
    query: "SELECT * FROM TABLE LIMIT 10 OFFSET 5",
    offset: 5,
    limit: 10
  },
  {
    id: 2,
    query: "SELECT * FROM TABLE LIMIT 5 OFFSET 10",
    offset: 10,
    limit: 5
  },
  {
    id: 3,
    query: "SELECT * FROM TABLE LIMIT 15 OFFSET 20",
    offset: 20,
    limit: 15
  }
];

function App() {

  const [data, setData] = useState(tableData);
  const [visualData, setVisualData] = useState(data)
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(8)   // limit of each page is 8 rows only

  useEffect(() => {
    if( offset+limit <= data.length ){
      const arr = data.slice(offset, offset+limit)
      setVisualData(arr)
    }
    else  {
      if(offset+limit > data.length && offset === 0 )
        setVisualData(data)
      else {
        let ind = data.length - offset
        const arr = data.slice(offset, offset+ ind)
        setVisualData(arr)
      }
     
    }
  }, [offset,data])

    // handler of input queries
  const searchHandler = (value) => {

    if(value === '')
      alert('Invalid Query')

    let offsetTemp = Math.floor(Math.random() * 30);
    let limitTemp = Math.floor(Math.random() * 40)+1; 
    const arr = tableData.slice(offsetTemp, offsetTemp + limitTemp);
    setOffset(0)
    setData(arr);
    setQuery('')
  };

  // handler for predefined queries
  const selectHandler = (event) => {
    let index = event.target.value
    setQuery(index)
    let offsetTemp = Querys[index-1].offset
    let limitTemp = Querys[index-1].limit
    const arr = tableData.slice(offsetTemp, offsetTemp + limitTemp);
    setOffset(0)
    setData(arr);
  };

// function to render content fo table

  const renderContent = () => {
    return visualData.map((el, index) => {
      const temp = Object.values(el);
      return (
        <tr>
          {temp.map((val) => {
            return (
              <td style={{ padding: "10px", border: "1px solid black" }}>
                {val}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  // function to render header fo table
  const renderHeader = () => {
    return (
      <tr>
        {Object.keys(visualData[0]).map((key) => (
          <th style={{ padding: "10px", border: "1px solid black" }}>
            {capitalize(key)}
          </th>
        ))}
      </tr>
    );
  };

// used useMemo to reduce repeted rendering cost of repeted quries
  const renderTableContent = useMemo(() => renderContent(), [visualData])
  const renderTableHeader = useMemo(() => renderHeader(), [visualData])


  return (
    <div >
      <Inputs
        searchHandler={searchHandler}
        selectHandler={selectHandler}
        Querys = {Querys}
        query = {query}
      />
      <div className="table">
        <div className="table-header">
          <h2>Table have {data.length} row(s)</h2>
          <div>Each page have 8 rows only</div>
        </div>
        
        <table>
          {renderTableHeader}
          <tbody>{renderTableContent}</tbody>
        </table>
        <Pagination
          limit ={limit}
          offset = {offset}
          setOffset = {setOffset}
          data = {data}
        />
      </div>
    </div>
  );
}

export default App;
