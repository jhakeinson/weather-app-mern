import React from "react";

interface SearchFormProps {
    queryInput: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
    queryInput,
    onChange,
    onSubmit
}) => {

    return (
        <div className="bg-blue-500 w-3/4 h-3/4 flex flex-col gap-y-16 justify-center items-center">
            <h1 className="text-sky-300 text-5xl">My Weather App</h1>
            <div className="w-3/4">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input value={queryInput} onChange={onChange} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type a zip code or a city..." required />
                    <button onClick={onSubmit} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </div>
        </div>
    );
}

export {SearchForm}