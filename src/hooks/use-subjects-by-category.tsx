import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { ErrorResponse, ItemsWithCount, SubjectInterface } from '~/types'

interface UseSubjectsNamesProps<T> {
  category: string
  fetchOnMount?: boolean
  transform?: (data: ItemsWithCount<SubjectInterface>) => T[]
}

interface UseSubjectsNamesResult<T> {
  loading: boolean
  response: T[]
  fetchData: () => Promise<void>
  error: ErrorResponse | null
}

const useSubjectsByCategory = <T = SubjectInterface,>({
  category,
  fetchOnMount = true,
  transform
}: UseSubjectsNamesProps<T>): UseSubjectsNamesResult<T> => {
  const getSubjects = useCallback(
    () => subjectService.getSubjectsByCategory(category),
    [category]
  )

  const { loading, response, fetchData, error } = useAxios<
    ItemsWithCount<SubjectInterface>,
    undefined,
    T[]
  >({
    service: getSubjects,
    fetchOnMount,
    defaultResponse: defaultResponses.array,
    transform
  })

  return { loading, response, fetchData, error }
}

export default useSubjectsByCategory
