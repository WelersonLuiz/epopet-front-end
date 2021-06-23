import React from 'react';

const SearchBar = () => {
  const BarStyling = {width:"100%",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"Procurar Estabelecimento"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar;