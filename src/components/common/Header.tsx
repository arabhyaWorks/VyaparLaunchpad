// Header.tsx

import React, { useContext } from "react";
import Profile from "../../assets/images/profile.png";
import Text from "../../Bhasini/Text";
import { AppContext } from "../../AppContext";

interface LanguageCode {
  language: string;
  code: string;
}

const Header: React.FC = () => {
  const languageCodes: LanguageCode[] = [
    { language: "English", code: "en" },
    { language: "Hindi", code: "hi" },
    { language: "Odia", code: "or" },
    { language: "Marathi", code: "mr" },
    { language: "Gujarati", code: "gu" },
    { language: "Tamil", code: "ta" },
    { language: "Telugu", code: "te" },
    { language: "Kannada", code: "kn" },
    { language: "Bengali", code: "bn" },
    { language: "Punjabi", code: "pa" },
    { language: "Assamese", code: "as" },
    { language: "Malayalam", code: "ml" },
  ];

  const { selectedLanguage, setSelectedLanguage } = useContext(AppContext);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <header className="flex justify-between items-center p-3 bg-yellow-50 shadow-sm font-poppins">
      <Text className="text-2xl font-normal text-[#45464E]">Home</Text>
      <div className="flex items-center space-x-4">
        <select
          className="bg-transparent p-1 rounded border border-[1.5px] border-gray-300 outline-none"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {languageCodes.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.language}
            </option>
          ))}
        </select>
        <img
          className="w-10 h-10 rounded-full"
          src={Profile}
          alt="User Avatar"
        />
      </div>
    </header>
  );
};

export default Header;
