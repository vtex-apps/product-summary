import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'

const useIsPriceAsync = () => {
  const searchPage = useSearchPage()

  if (!searchPage) {
    return false
  }

  const { searchQuery } = searchPage

  return {
    isPriceAsync: searchQuery?.variables?.simulationBehavior === 'async',
  }
}

export default useIsPriceAsync
