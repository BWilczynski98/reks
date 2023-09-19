import { Button, Modal, TextField, Textarea } from "@/app/components/UI"
import { Select } from "@/app/components/UI/Select"
import { Errors } from "@/app/types/errorsDictionary"
import { AllergyCategory, HealthRecordsForms } from "@/app/types/health"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"

const schema = yup.object({
  category: yup.string().required(Errors.EMPTY_FIELD),
  allergen: yup.string().required(Errors.EMPTY_FIELD),
  symptoms: yup.string().required(Errors.EMPTY_FIELD),
})

type FormData = yup.InferType<typeof schema>

export const AllergyForm = ({ formIsOpen, formOnClose, formOnSubmit, formTitle }: HealthRecordsForms) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "",
      allergen: "",
      symptoms: "",
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    resetField("category")
    resetField("allergen")
    resetField("symptoms")
    formOnSubmit()
  }

  const handleCloseForm = () => {
    formOnClose()
    clearErrors("category")
    clearErrors("allergen")
    clearErrors("symptoms")
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
            name="category"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                name="category"
                id="category"
                placeholder="Rodzaj alergi"
                label="Rodzaj"
                value={value}
                onChange={onChange}
                options={[AllergyCategory.CONTACT, AllergyCategory.FOOD, AllergyCategory.INHALATION]}
                error={!!errors.category}
                errorMessage={errors.category?.message}
              />
            )}
          />
          <Controller
            name="allergen"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                name="allergen"
                id="allergen"
                placeholder="Substancja wywołująca alergie"
                label="Alergen"
                value={value}
                onChange={onChange}
                error={!!errors.allergen}
                errorMessage={errors.allergen?.message}
              />
            )}
          />
          <Controller
            name="symptoms"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Textarea
                name="symptoms"
                id="symptoms"
                placeholder="Objawy jakie towarzyszą alergii"
                label="Objawy"
                value={value}
                onChange={onChange}
                error={!!errors.symptoms}
                errorMessage={errors.symptoms?.message}
              />
            )}
          />
        </div>

        <div>
          <Button
            loading={false}
            type="submit"
            fullWidth
          >
            Dodaj alergie
          </Button>
        </div>
      </form>
    </Modal>
  )
}
