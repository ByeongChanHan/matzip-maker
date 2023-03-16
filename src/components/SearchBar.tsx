import { removeMarkers, searchNearbyPlaces } from "@/util/Kakaomap";
import { useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (): void => {
    removeMarkers();
    const searchText = inputRef.current?.value.trim();
    if (!searchText) {
      alert("검색어를 입력해주세요");
      return;
    }
    searchNearbyPlaces(searchText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon" onClick={handleSearch}>
          <FaSearch />
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
        }

        .search {
          display: flex;
          align-items: center;
          position: relative;
        }

        input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-size: 1rem;
          height: 1.5rem;
          outline: none;
        }

        .search-icon {
          position: absolute;
          right: 1rem;
          top: 25%;
          color: #ccc;
          cursor: pointer;
          font-size: 1.3rem;
        }
      `}</style>
    </div>
  );
}
