import { styles } from '~/containers/new-study-modal/NewStudyModal.style'
import { Box, Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import React, { useState } from 'react'
import { t } from 'i18next'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import categoryService from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

const NewStudyModal = ({ closeModal }) => {
  // const [chartCount, setCharCount] = useState(0)
  const [categoryName, setCategoryName] = useState('')
  const [subjectName, setSubjectName] = useState('')
  // const [description, setDescription] = useState('')

  const onCreateNewStudy = async () => {
    try {
      // await subjectService.createSubject(categoryName, subjectName, description)
      await subjectService.createSubject(categoryName, subjectName)

      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const autoCompleteCategories = (
    <AsyncAutocomplete
      freeSolo
      labelField='name'
      onChange={(e, newValue) => {
        setCategoryName(newValue?.name)
      }}
      onInputChange={(e, newInputValue) => {
        setCategoryName(newInputValue)
      }}
      service={categoryService.getAllCategories}
      sx={styles.categoryInput}
      textFieldProps={{
        placeholder: t('breadCrumbs.categories')
      }}
      value={categoryName}
      valueField='name'
    />
  )

  return (
    <Box sx={styles.box}>
      <IconButton onClick={closeModal} sx={styles.icon}>
        <CloseIcon />
      </IconButton>
      <Box sx={styles.mainContainer}>
        <Box
          alt='flowerpot'
          component='img'
          src={studentImg}
          sx={styles.plantImg}
        />

        <Box sx={styles.contentWrapper}>
          <Box sx={styles.fieldsWrapper}>
            <Typography sx={styles.title}>Request a new study</Typography>
            <Typography sx={styles.description}>
              If you can’t find a specific category or subject that you need,
              you can submit a request to our team to review your request and
              take necessary actions.
            </Typography>
            <Typography sx={styles.fieldLabel}>Create new subject</Typography>
            <TextField
              fullWidth
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder='New subject'
              size='small'
              sx={styles.textField}
              variant='outlined'
            />
            <Typography sx={styles.fieldLabel}>
              Add subject to existing category or create a new one
            </Typography>
            {autoCompleteCategories}
            <Typography sx={styles.fieldLabel}>
              Provide a brief explanation of why you believe this subject or
              category should be added.
            </Typography>
            {/*<TextField*/}
            {/*  fullWidth*/}
            {/*  inputProps={{ maxLength: 1000 }}*/}
            {/*  multiline*/}
            {/*  onChange={(e) => {*/}
            {/*    setCharCount(e.target.value.length)*/}
            {/*    setDescription(e.target.value)*/}
            {/*  }}*/}
            {/*  placeholder='Additional information'*/}
            {/*  rows={4}*/}
            {/*  size='small'*/}
            {/*  sx={styles.textArea}*/}
            {/*  variant='outlined'*/}
            {/*/>*/}
            {/*<Typography sx={styles.charCount}>{chartCount}/1000</Typography>*/}
          </Box>
          <Box sx={styles.buttonWrapper}>
            <Button
              onClick={onCreateNewStudy}
              sx={styles.button}
              variant='contained'
            >
              Send request
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NewStudyModal
