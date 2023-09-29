import { Button, Calendar, Modal, TextField, Textarea } from "@/app/components/UI"
import { Errors } from "@/app/types/errorsDictionary"
import type { HealthRecordsForms } from "@/app/types/health"
import { yupResolver } from "@hookform/resolvers/yup"
import dayjs from "dayjs"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"

const schema = yup.object({
  name: yup.string().required(Errors.EMPTY_FIELD),
  dose: yup.string().required(Errors.EMPTY_FIELD),
  interval: yup.string().required(Errors.EMPTY_FIELD),
  until: yup.date().required(Errors.EMPTY_FIELD).typeError(Errors.INCORRECT_DATE),
  comments: yup.string(),
})

type FormData = yup.InferType<typeof schema>

export const DrugForm = ({ formIsOpen, formOnClose, formOnSubmit, formTitle }: HealthRecordsForms) => {
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
      dose: "",
      interval: "",
      until: undefined,
      comments: "",
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    resetField("name")
    resetField("dose")
    resetField("interval")
    resetField("until")
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
                placeholder="Aspiryna"
                label="Nazwa"
                value={value}
                onChange={onChange}
                error={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            name="dose"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                name="dose"
                id="dose"
                placeholder="Pół tabletki"
                label="Dawka"
                value={value}
                onChange={onChange}
                error={!!errors.dose}
                errorMessage={errors.dose?.message}
              />
            )}
          />
          <Controller
            name="interval"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                name="interval"
                id="interval"
                placeholder="Rano"
                label="Pora podawania"
                value={value}
                onChange={onChange}
                error={!!errors.interval}
                errorMessage={errors.interval?.message}
              />
            )}
          />
          <Controller
            name="until"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Calendar
                label="Podawać do"
                name="until"
                id="until"
                onChange={onChange}
                value={value}
                error={!!errors.until}
                errorMessage={errors.until?.message}
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
                placeholder="Podać po posiłku"
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
              Dodaj lek
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
