import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from './Categories.styles'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { t } from 'i18next'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DirectionLink from '~/components/direction-link/DirectionLink'
import { authRoutes } from '~/router/constants/authRoutes'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import CardsList from '~/components/cards-list/CardsList'
import { ParametrizedText } from '~/components/parametrized-text/ParametrizedText'
import React, { useState, useCallback, useMemo, SetStateAction } from 'react'
import { CardListItemInterface, SizeEnum } from '~/types'
import categoryService from '~/services/category-service'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import { useNavigate } from 'react-router-dom'
import CardItem from '~/containers/card-item/CardItem'
import useLoadMore from '~/hooks/use-load-more'
import { Modal } from '@mui/material'
import NewStudyModal from '~/containers/new-study-modal/NewStudyModal'

const Categories = () => {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  // const breakpoints = useBreakpoints()
  // const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const handleSearch = (v: SetStateAction<string>) => {
    setSearch(v)
  }

  const onChooseCategory = (id: string | null) => {
    navigate(`/subjects?categoryId=${id}`)
  }

  const fetchCategories = useCallback(
    async (params: {
      skip?: number
      limit: number
      page: number
      search: string
    }) => {
      return categoryService.getCategories({
        limit: params.limit ?? 10,
        skip: params.search
          ? 0
          : params.skip ?? (params.page - 1) * params.limit,
        search: params.search
      })
    },
    []
  )

  const params = useMemo(
    () => ({
      search: search,
      limit: 0,
      page: 0
    }),
    [search]
  )
  const closeModal = () => {
    setOpen(false)
  }
  const { data, loadMore, loading, isExpandable } = useLoadMore<
    CardListItemInterface,
    { skip?: number; limit: number; page: number; search: string }
  >({
    service: fetchCategories,
    limit: 3,
    params
  })

  // const { data, loadMore, loading, isExpandable } = useLoadMore({
  //   // limit: itemsPerPage,
  //   limit: 3,
  //   params,
  //   service: fetchCategories
  // })

  const cards = data.map((category: CardListItemInterface, index: number) => (
    <CardItem
      icon={category.icon}
      id={category.id}
      key={index}
      name={category.name}
      offers={category.offers}
      onCardSelect={onChooseCategory}
      theme={category.theme}
    />
  ))

  return (
    <div>
      <TitleWithDescription
        description={'Explore categories you`re passionate about.'}
        style={styles.titleWithDescription}
        title={'Categories'}
      />
      <Box>
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchComponent}>
        <SearchAutocomplete
          loading={loading}
          // onFocus={fetchData}
          onSearchChange={setSearch}
          options={[]}
          search={search}
          setSearch={(value: SetStateAction<string>) => handleSearch(value)}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        ></SearchAutocomplete>
      </AppToolbar>

      {!data?.length ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'category' })}
          description={t('errorMessages.tryAgainText', { name: 'category' })}
          onClick={() => setOpen(true)}
        />
      ) : (
        <div>
          <Box sx={styles.noSearchResult}>
            <ParametrizedText
              components={{
                categoryOrSubject: (
                  <a href='/request-category' style={styles.link}>
                    category or subject
                  </a>
                )
              }}
              text={`Can't find what you're looking for? Request a new {categoryOrSubject}`}
            />
          </Box>
          <CardsList
            btnText={t('categoriesPage.viewMore')}
            cards={cards}
            isExpandable={isExpandable}
            loading={loading}
            onClick={loadMore}
          />
        </div>
      )}
      <Modal onClose={closeModal} open={open}>
        <NewStudyModal closeModal={closeModal} />
      </Modal>
    </div>
  )
}

export default Categories
