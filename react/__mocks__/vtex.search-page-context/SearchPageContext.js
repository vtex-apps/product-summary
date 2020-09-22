import { createContext, useContext } from 'react'

const SearchPageContext = createContext({})

export const useSearchPage = () => {
  return useContext(SearchPageContext)
}
