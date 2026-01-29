import { useState, useMemo, useCallback, useRef, useEffect } from 'react'

import useAxios from '~/hooks/use-axios'

import { defaultResponses } from '~/constants'
import { ServiceFunction, ItemsWithCount } from '~/types'

interface UseLoadMoreProps<Data, Params> {
  service: ServiceFunction<ItemsWithCount<Data>, Params>
  limit: number
  params?: Params
}
const useLoadMore = <Data, Params>({
  service,
  limit,
  params
}: UseLoadMoreProps<Data, Params>) => {
  const [skip, setSkip] = useState(0)
  const [data, setData] = useState<Data[]>([])
  const isFetched = useRef(false)
  const stableParams = useMemo(() => params, [params])
  const lastRequestSkip = useRef(0)

  const handleResponse = useCallback((response: ItemsWithCount<Data>) => {
    setData((prev) => {
      const existingIds = new Set(prev.map((i) => i.id as string))
      const newItems = response.items.filter(
        (i) => !existingIds.has(i.id as string)
      )
      return lastRequestSkip.current === 0
        ? response.items
        : [...prev, ...newItems]
    })
  }, [])

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Data>,
    Params
  >({
    service,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: false,
    onResponse: handleResponse
  })

  const loadMore = useCallback(() => {
    setSkip((prev) => prev + limit)
  }, [limit])

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
    isFetched.current = false
  }, [])

  useEffect(() => {
    lastRequestSkip.current = skip
    void fetchData({ ...stableParams, limit, skip } as Params)
    isFetched.current = true
  }, [limit, skip, fetchData, stableParams])

  const isExpandable = useMemo(() => {
    return data.length < response.count
  }, [data.length, response.count])

  return {
    data,
    loading,
    loadMore,
    resetData,
    isExpandable
  }
}

export default useLoadMore
