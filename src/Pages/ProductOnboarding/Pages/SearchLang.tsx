import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../../redux/slice";
import SearchIcon from "../../../assets/Icons/blackSearchIcon.svg";

type SearchLangProps = {
  productData: any;
  setProductData: any;
};

const SearchLang: React.FC<SearchLangProps> = ({
  productData,
  setProductData,
}) => {
  const dispatch = useDispatch();
  const [proData, setProData] = useState<any>(productData);

  const indianLanguages: { [key: string]: string } = {
    Hindi: "hi",
    English: "en",
    Bengali: "bn",
    Telugu: "te",
    Marathi: "mr",
    Tamil: "ta",
    Gujarati: "gu",
    Kannada: "kn",
    Odia: "or",
    Punjabi: "pa",
    malayalam: "ml",
    assamese: "as",
  };

  const languageNames: string[] = Object.keys(indianLanguages);

  // Function to generate three random language names
  const generateRandomLanguages = (): string[] => {
    const randomLanguages: string[] = [];
    while (randomLanguages.length < 3) {
      const randomIndex: number = Math.floor(
        Math.random() * languageNames.length
      );
      const randomLanguage: string = languageNames[randomIndex];
      if (!randomLanguages.includes(randomLanguage)) {
        randomLanguages.push(randomLanguage);
      }
    }
    return randomLanguages;
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [randomLanguages, setRandomLanguages] = useState<string[]>(
    generateRandomLanguages()
  );
  const [clickedText, setClickedText] = useState<string>("");

  // Function to handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    // Filter languages based on search term
    const results: string[] = languageNames.filter((language: string) =>
      language.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResult(results.length > 0 ? results[0] : "");
  };

  // Function to handle click on search result or random language
  const handleClick = (language: string): void => {
    setClickedText(language);
    setSearchResult(language);
    dispatch(setLanguage(language));
    setProductData({ ...productData, inputLanguage: language.toLowerCase() });

    // Store the language code in localStorage
    const languageCode = indianLanguages[language];
    if (languageCode) {
      localStorage.setItem("languageCode", languageCode);
    }
  };

  return (
    <div className=" px-8 h-[20rem]">
      <div>
        <h1 className="text-[#170F49] font-bold font-poppins text-2xl mb-2">
          Language Selection
        </h1>
        <p className="text-[#6F6C90] font-poppins text-sm">
          Select language you will use to input product details.
        </p>
      </div>

      <div className=" px-4">
        <div className="mt-4 font-poppins relative">
          <div
            className="flex items-center"
            style={{
              backgroundColor: "#FDCF46",
              padding: 10,
              borderRadius: 14,
            }}
          >
            <div style={{ marginRight: 7 }}>
              <img src={SearchIcon} style={{ width: 18, height: 18 }} />
            </div>
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={handleChange}
              style={{ backgroundColor: "#FDCF46", color: "#19213D", flex: 1 }}
              className="placeholder-[#19213D] outline-none"
            />
          </div>
        </div>
        {/* Display search result */}
        {searchResult && (
          <div
            style={{
              marginTop: 10,
              backgroundColor: "#fff",
              borderRadius: 14,
              fontFamily: "poppins",
              fontSize: 14,
              border: `2px solid ${
                searchResult === clickedText ? "#FCBD01" : "#E5E5E5"
              }`,
              fontWeight: "600",
              paddingLeft: 10,
            }}
          >
            <div
              className="cursor-pointer rounded-md p-2"
              onClick={() => handleClick(searchResult)}
            >
              {searchResult}
            </div>
          </div>
        )}
        {/* Display three random language names */}
        <div className="mt-4 border-2 border-[#E5E5E5] rounded-lg">
          {randomLanguages.map((language: string, index: number) => (
            <div
              key={index}
              className={`
            cursor-pointer 
            ${language === clickedText ? "text-[#FCBD01]" : "text-[#170F49]"}`}
              style={{
                borderColor: "#E5E5E5",
                borderBottomWidth: index !== randomLanguages.length - 1 ? 2 : 0,
                cursor: "pointer",
                fontWeight: "600",
                paddingLeft: 20,
                paddingTop: 10,
                paddingBottom: 10,
                fontFamily: "poppins",
                fontSize: 14,
              }}
              onClick={() => handleClick(language)}
            >
              {language}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchLang;
