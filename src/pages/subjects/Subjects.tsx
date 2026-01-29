import React, { SetStateAction, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import useLoadMore from '~/hooks/use-load-more'
import { subjectService } from '~/services/subject-service'
import categoryService from '~/services/category-service'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardsList from '~/components/cards-list/CardsList'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import useBreakpoints from '~/hooks/use-breakpoints'
import { CategoryInterface, SizeEnum, CardListItemInterface } from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/subjects/Subjects.styles'
import CardItem from '~/containers/card-item/CardItem'
// import { itemsLoadLimit } from '~/containers/my-resources/questions-container/QuestionsContainer.constants'

const Subjects = () => {
  const [search, setSearch] = useState('')
  const [categoryName, setCategoryName] = useState<string>('')
  const breakpoints = useBreakpoints()
  // const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const { t } = useTranslation()
  // const { userRole } = useAppSelector((state) => state.appMain)
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const params = useMemo(
    () => ({
      search
    }),
    [search]
  )

  const fetchSubjects = useCallback(
    async (params?: {
      skip: number
      limit: number
      page: number
      search: string
      categoryId: string
    }) => {
      return await subjectService.getSubjects({
        limit: params?.limit ?? 10,
        skip: params?.skip ?? ((params?.page ?? 1) - 1) * (params?.limit ?? 10),
        search: params?.search ?? '',
        categoryId
      })
    },
    [categoryId]
  )

  // const oppositeRole = getOpositeRole(userRole)

  const { data, loadMore, resetData, loading, isExpandable } = useLoadMore<
    CardListItemInterface,
    { skip?: number; limit?: number; page?: number; search?: string }
  >({
    service: fetchSubjects,
    limit: 3,
    // limit: itemsPerPage,
    params: params
  })

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryInterface | null
  ) => {
    resetData()
    searchParams.set('categoryId', value?._id ?? '')
    setCategoryName(value?.name ?? '')
    setSearchParams(searchParams)
    setSelectedCategory(value?.name || null)
  }

  const onResponseCategory = (response: CategoryInterface[]) => {
    const category = response.find((option) => option._id === categoryId)
    onCategoryChange(this, category ?? null)
  }
  const handleSearch = (v: SetStateAction<string>) => {
    setSearch(v)
  }

  const autoCompleteCategories = (
    <AsyncAutocomplete
      axiosProps={{ onResponse: onResponseCategory }}
      labelField='name'
      onChange={onCategoryChange}
      service={categoryService.getAllCategories}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.categories')
      }}
      value={selectedCategory}
      valueField='name'
    />
  )

  const cards = data.map((category: CardListItemInterface, index: number) => (
    <CardItem
      icon={category.icon}
      id={category.id}
      key={index}
      name={category.name}
      offers={category.offers}
      onCardSelect={function (): void {
        throw new Error('Function not implemented.')
      }}
      theme={category.theme}
    />
  ))

  return (
    <div>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('subjectsPage.subjects.description')}
        style={styles.titleWithDescription}
        title={t('subjectsPage.subjects.title', {
          category: categoryName
        })}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autoCompleteCategories}
        <SearchAutocomplete
          loading={loading}
          onSearchChange={setSearch}
          // options={subjectsNamesItems}
          options={[]}
          search={search}
          // setSearch={setMatch}
          setSearch={(value: SetStateAction<string>) => handleSearch(value)}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>
      {breakpoints.isMobile && autoCompleteCategories}
      {!data.length && !loading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'subjects' })}
          description={t('errorMessages.tryAgainText', { name: 'subjects' })}
          // onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={loading}
          onClick={loadMore}
        />
      )}
    </div>
  )
}

export default Subjects
