import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { ItemsWithCount, SubjectInterface, SubjectNameInterface } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const subjectService = {
  getSubjects: (
    params?: Pick<SubjectInterface, 'name'>,
    categoryId?: string
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.get}`, { params })
  },
  getSubjectsByCategory: (
    categoryId: string
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    // TODO: Remove console log and use categoryId in the request
    console.log(categoryId)

    const url = createUrlPath(URLs.subjects.getSubjectsByCategory)
    return axiosClient.get(url)
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.getNames}`)
  }
}
