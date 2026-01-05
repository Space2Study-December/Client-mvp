import { FC, useEffect, useState } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import {
  initialValues,
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

import { StepProvider } from '~/context/step-context'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'

interface UserStepsWrapperProps {
  userRole: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const childrenArr = [
    <GeneralInfoStep
      isUserFetched={isUserFetched}
      key='1'
      setIsUserFetched={setIsUserFetched}
    />,
    <SubjectsStep key='2' role={userRole} />,
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
