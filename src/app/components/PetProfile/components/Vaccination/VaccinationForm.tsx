import { Button, Calendar, Modal, TextField, Textarea } from "@/app/components/UI"
import { Errors } from "@/app/types/errorsDictionary"
import type { HealthRecordsForms } from "@/app/types/health"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"

const schema = yup.object({
  name: yup.string().required(Errors.EMPTY_FIELD),
  date: yup.date().required(Errors.EMPTY_FIELD).typeError(Errors.INCORRECT_DATE),
  term: yup.date().required(Errors.EMPTY_FIELD).typeError(Errors.INCORRECT_DATE),
  comments: yup.string(),
})

type FormData = yup.InferType<typeof schema>

export const VaccinationForm = ({ formIsOpen, formOnClose, formOnSubmit, formTitle }: HealthRecordsForms) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      date: undefined,
      term: undefined,
      comments: "",
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    resetField("name")
    resetField("date")
    resetField("term")
    resetField("comments")
    formOnSubmit()
  }

  const handleCloseForm = () => {
    formOnClose()
  }

  return (
    <Modal
      open={formIsOpen}
      onClose={handleCloseForm}
      onConfirm={formOnSubmit}
      title={formTitle}
      disabledButtons
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                name="name"
                id="name"
                placeholder="Purevax RCP"
                label="Nazwa"
                value={value}
                onChange={onChange}
                error={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Calendar
                name="date"
                id="date"
                label="Data szczepienia"
                value={value}
                onChange={onChange}
                error={!!errors.date}
                errorMessage={errors.date?.message}
              />
            )}
          />
          <Controller
            name="term"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Calendar
                name="term"
                id="term"
                label="Data następnego szczepienia"
                value={value}
                onChange={onChange}
                error={!!errors.term}
                errorMessage={errors.term?.message}
              />
            )}
          />
          <Controller
            name="comments"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Textarea
                name="comments"
                id="comments"
                placeholder="Szczepienie przeciwko panleukopenii"
                label="Uwagi"
                value={value}
                onChange={onChange}
                error={!!errors.comments}
                errorMessage={errors.comments?.message}
              />
            )}
          />

          <div>
            <Button
              fullWidth
              type="submit"
              loading={false}
            >
              Dodaj szczepienie
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
