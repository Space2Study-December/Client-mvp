import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/user-steps/subjects.svg'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { UserRoleEnum } from '~/types'
import { useEffect, useState } from 'react'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useForm from '~/hooks/use-form'
import AppButton from '~/components/app-button/AppButton'
import { Chip } from '@mui/material'
import Stack from '@mui/material/Stack'
import useSubjectsByCategory from '~/hooks/use-subjects-by-category'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { categoryService } from '~/services/category-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import { snackbarVariants } from '~/constants'

const SubjectsStep = ({
  role,
  stepLabel,
  stepData,
  btnsBox,
  onStepDataChange
}) => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const tSubjects = (key) => t(`${translationKey}.subjects.${key}`)

  const translationKey =
    role === UserRoleEnum.Tutor ? 'becomeTutor' : 'becomeStudent'

  const [categoryId, setCategoryId] = useState('')
  const [isSubjectFieldDisabled, setIsSubjectFieldDisabled] = useState(true)
  const [subjects, setSubjects] = useState(stepData || [])

  const onCategoryChange = (_, value) => {
    const categoryId = value?._id ?? ''
    setCategoryId(categoryId)
    handleNonInputValueChange('subject', null)
    setIsSubjectFieldDisabled(!categoryId)
  }

  const {
    loading: subjectNamesLoading,
    response: subjectsNamesItems,
    fetchData: fetchSubjects
  } = useSubjectsByCategory({
    fetchOnMount: false,
    category: categoryId,
    transform: (data) => data.items
  })

  useEffect(() => {
    if (categoryId) {
      void fetchSubjects()
    }
  }, [categoryId])

  const { handleSubmit, handleNonInputValueChange, handleBlur, data } = useForm(
    {
      onSubmit: () => {
        const subject = subjects.find((s) => s._id === data.subject?._id)
        if (!subject) {
          const subjectsToSet = [...subjects, data.subject]
          setSubjects(subjectsToSet)
          onStepDataChange(stepLabel, subjectsToSet)
        } else {
          setAlert({
            severity: snackbarVariants.info,
            message: tSubjects('sameSubject')
          })
        }
        handleNonInputValueChange('subject', null)
      },
      initialValues: {
        subject: null
      }
    }
  )

  const handleSubjectDelete = (subjectToDelete) => () => {
    const subjectsToSet = subjects.filter(
      (subject) => subject._id !== subjectToDelete._id
    )
    setSubjects(subjectsToSet)
    onStepDataChange(stepLabel, subjectsToSet)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Typography sx={styles.description}>{tSubjects('title')}</Typography>
        <Box component='form' onSubmit={handleSubmit} sx={styles.formBox}>
          <AsyncAutocomplete
            labelField='name'
            onChange={onCategoryChange}
            service={categoryService.getCategories}
            textFieldProps={{
              label: tSubjects('categoryLabel')
            }}
            value={categoryId}
            valueField='_id'
          />

          <AppAutoComplete
            disabled={isSubjectFieldDisabled || subjectNamesLoading}
            getOptionLabel={(option) => option?.name ?? ''}
            loading={subjectNamesLoading}
            onBlur={handleBlur('subject')}
            onChange={(_, value) => handleNonInputValueChange('subject', value)}
            options={subjectsNamesItems}
            textFieldProps={{
              label: tSubjects('subjectLabel')
            }}
            value={data.subject}
          />

          <AppButton disabled={!data?.subject} type='submit'>
            {tSubjects('btnText')}
          </AppButton>

          {subjects?.length ? (
            <Stack direction='row' sx={styles.subjectsChips}>
              {subjects?.map((subject) => (
                <Chip
                  key={subject._id}
                  label={subject.name}
                  onDelete={handleSubjectDelete(subject)}
                />
              ))}
            </Stack>
          ) : null}
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
