import React, { useState } from 'react';

const runtimes = [
    { "language": "bash", "version": "5.2.0", "aliases": ["sh"] },
    { "language": "c++", "version": "10.2.0", "aliases": ["cpp", "g++"], "runtime": "gcc" },
    { "language": "java", "version": "15.0.2", "aliases": [] },
    { "language": "javascript", "version": "18.15.0", "aliases": ["node-javascript", "node-js", "javascript", "js"], "runtime": "node" },
    { "language": "python", "version": "3.10.0", "aliases": ["py", "py3", "python3", "python3.10"] },
];
// currently supported runtimes only the 5 , we can add another runtime as static 
const languages = ["javascript", "python", "java", "c++", "bash"];

const LanguageSelector = ({ onLanguageSelect }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [output, setOutput] = useState('');

    // runtimes : contains all runtime , top5Languages : conatain top 5 element of the runtimes 
    const top5Languages = runtimes.slice(0,5);

    const handleLanguageChange = (event) => {
        const selected = event.target.value;
        setSelectedLanguage(selected);
        const languageInfo = top5Languages.find(lang => lang.language === selected);
        onLanguageSelect(languageInfo);
        
    };

    return (
        <>
            <h3>Choose Language</h3>
            <select
                id="language-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
            >
                {languages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </>
    );
};

export default LanguageSelector;
