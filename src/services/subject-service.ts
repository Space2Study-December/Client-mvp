import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CardListItemInterface,
  ItemsWithCount,
  SubjectNameInterface
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'
import { categoryThemes } from '~/styles/category-theme/categoryThemes'
import * as MuiIcons from '@mui/icons-material'

function getTheme(name: string) {
  return categoryThemes.find((el) => el.name === name)
}

function getIconByName(categoryName: string) {
  if (!categoryName) return MuiIcons.Folder

  const lower = categoryName.toLowerCase()

  const possibleIcons = Object.entries(MuiIcons).filter(([iconName]) =>
    lower.split(' ').some((word) => iconName.toLowerCase().includes(word))
  )

  if (possibleIcons.length > 0) {
    return `${possibleIcons[0][0]}Icon`
  }

  return 'FolderIcon'
}

interface SubjectItems {
  categoryId: string
  name: string
  id: string
  icon: string | null
  theme: string | null
  offers: number
}
interface Response {
  count: number
  items: SubjectItems[]
}

export const subjectService = {
  getSubjects: async (params: {
    limit: number
    skip: number
    search: string
    categoryId: string
  }): Promise<{
    data: ItemsWithCount<CardListItemInterface>
  }> => {
    const res = await axiosClient.get<{ items: SubjectItems[] }>(
      URLs.subjects.get,
      { params }
    )
    const subjects = res.data as Response

    const mappedItems: CardListItemInterface[] =
      res.data.items.map((item) => ({
        ...item,
        theme: getTheme(item.theme as string)
      })) || []

    return {
      data: {
        count: subjects.count || 0,
        items: mappedItems
      }
    }
  },

  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.getNames}`)
  },

  createSubject: async (
    categoryName: string,
    subjectName: string,
    description: string
  ) => {
    const appearance = {
      icon: getIconByName(categoryName) || '',
      color:
        categoryThemes[Math.floor(Math.random() * categoryThemes.length)].name
    }
    return axiosClient.post(`${URLs.subjects.createSubject}`, {
      categoryName,
      appearance: appearance,
      subjectName,
      description
    })
  }
}
