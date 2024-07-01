import { useCallback, useState, useEffect, useRef } from "react";

function App() {

  const [length, setLength]=useState(8);
  const[number, setNumber]=useState(false);
  const[character, setCharacter]=useState(false);
let [pass, setPassword]=useState(null);

const passwordGenerator= useCallback( ()=>{
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  pass="";
  if(number) str+="1234567890";
  if(character) str+="!@#$%^&*()";
  for (let i=0;i<=length;i++){
    const index= Math.floor((Math.random() * str.length) + 1);
    pass+=str.charAt(index)
  }
  setPassword(pass)
  console.log(pass)
} , [length,number, character, setPassword])
 
useEffect( ()=>{
  passwordGenerator()}
  ,[length,number, character, setPassword, passwordGenerator] )

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handleNumberCheckboxChange = () => {
    setNumber((prev) => !prev);
  };

  const handleSpecialCharacterCheckboxChange = () => {
    setCharacter((prev) => !prev);
  };
  const inputRef = useRef(null);
 
  const copyPassword=()=>{
    navigator.clipboard.writeText(pass)
inputRef.current.select()
  }

  useEffect(()=>{
    inputRef.current.select()},[])
  
  return (
  
    <div className="min-h-screen flex justify-center items-center">
    <div className="p-4 bg-gray-100 rounded-md shadow-md flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="password"
          readOnly
          value={pass}
          onChange={handlePasswordChange}
          ref={ inputRef}
        />

        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={copyPassword}>
          Copy
        </button>
      </div>

      <div className="mt-4 w-full">
        <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Length: {length}
        </label>
        <input
          name="length"
          id="default-range"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          type="range"
          min={8}
          max={99}
          value={length}
          onChange={handleLengthChange}
        />
      </div>

      <div className="flex items-center">
        <input
          id="default-checkbox1"
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={number}
          onChange={handleNumberCheckboxChange}
        />
        <label htmlFor="default-checkbox1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Include Numbers
        </label>
      </div>

      <div className="flex items-center">
        <input
          id="default-checkbox2"
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={character}
          onChange={handleSpecialCharacterCheckboxChange}
        />
        <label htmlFor="default-checkbox2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Include Special Characters
        </label>
      </div>
    </div>
  </div>
  )
}

export default App;
