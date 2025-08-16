// import React from "react";

// interface searchProps {
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onClick: () => void;
//   text: string;
//   value: string;
// }
// const SearchBar: React.FC<searchProps> = ({
//   onChange,
//   onClick,
//   text,
//   value,
// }) => {
//   return (
//     <div>
//       <input className="title" value={value} onChange={onChange} />
//       <button onClick={onClick}>{text}</button>
//     </div>
//   );
// };

// export default SearchBar;

import React from "react";
import "./SearchBar.css"; // Import the CSS file

interface searchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  text: string;
  value: string;
}

const SearchBar: React.FC<searchProps> = ({
  onChange,
  onClick,
  text,
  value,
}) => {
  return (
    <div className="search-container">
      <input
        className="search-input"
        value={value}
        onChange={onChange}
        placeholder="Enter city name..."
        onKeyPress={(e) => e.key === "Enter" && onClick()}
      />
      <button className="search-button" onClick={onClick}>
        <span className="search-icon">🔍</span>
        {text}
      </button>
    </div>
  );
};

export default SearchBar;
