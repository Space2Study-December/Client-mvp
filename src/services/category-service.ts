import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CardListItemInterface,
  CategoryNameInterface,
  ItemsWithCount
} from '~/types'
import { categoryThemes } from '~/styles/category-theme/categoryThemes'

function getTheme(name: string) {
  return categoryThemes.find((el) => el.name === name)
}

interface Response {
  count: number
  items: CategoryNameInterface[]
}

const categoryService = {
  getAllCategories: async () => {
    return await axiosClient.get(URLs.categories.getAllCategories, {})
  },

  getCategories: async (params: {
    limit: number
    skip: number
    search: string
  }): Promise<{
    data: ItemsWithCount<CardListItemInterface>
  }> => {
    const res = await axiosClient.get(URLs.categories.get, { params })
    const categories = res.data as Response

    const mappedItems: CardListItemInterface[] =
      (categories.items || []).map((cat) => {
        return {
          name: cat.name,
          icon: cat.appearance?.icon || '',
          id: cat._id,
          offers: cat.offers || 0,
          theme: getTheme(cat.appearance?.color || 'default')
        }
      }) || []

    return {
      data: {
        count: categories.count || 0,
        items: mappedItems
      }
    }
  },

  getCategoriesByName: async (
    name: string
  ): Promise<CategoryNameInterface[]> => {
    const res = await axiosClient.get<{ items: CategoryNameInterface[] }>(
      URLs.categories.get,
      {
        params: { search: name }
      }
    )

    return res.data.items
  },

  getCategoriesNames: (): Promise<AxiosResponse<CategoryNameInterface[]>> => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
export default categoryService
