import { Suspense, useLayoutEffect, useRef } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import AppBreadCrumbs from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs'
import Footer from '~/containers/layout/footer/Footer'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'
import Loader from '~/components/loader/Loader'
import { checkAuth } from '~/redux/reducer'

import { styles } from '~/containers/app-content/AppContent.styles'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

const AppMain = () => {
  const mainWithFooter = useRef(null)
  const authCheckRef = useRef(false)
  const { loading } = useAppSelector((state) => state.appMain)
  const { state } = useNavigation()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    !authCheckRef.current && void dispatch(checkAuth())

    return () => {
      authCheckRef.current = true
    }
  }, [dispatch])

  if (loading || state === 'loading') {
    return <Loader pageLoad />
  }

  return (
    <Box ref={mainWithFooter} sx={styles.content}>
      <Suspense fallback={<Loader pageLoad />}>
        <PageWrapper>
          <AppBreadCrumbs />
          <ScrollToTop element={mainWithFooter} />
          <Outlet context={{ pageRef: mainWithFooter }} />
          <ScrollToTopButton element={mainWithFooter} />
        </PageWrapper>
        <Footer />
      </Suspense>
    </Box>
  )
}

export default AppMain
