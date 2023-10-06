"use client"
import { MultiFileDropzone, type FileState } from "@/components/MultiFileDropzone/MultiFileDropzone"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useDisclose } from "@/hooks"
import { useEdgeStore } from "@/lib/edgestore"
import { useCreateAnimalMutation, useGetAllAnimalQuery, useGetAllTemporaryHomesQuery } from "@/redux/services/animalApi"
import { AnimalGender, AnimalResidence, AnimalType } from "@/types/animal"
import { Routes } from "@/types/routes"
import { yupResolver } from "@hookform/resolvers/yup"
import { Gender, Residence, Type } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { BasicInformation } from "./BasicInformation"
import { LocationInformation } from "./LocationInformation"
import { TemporaryHome } from "./TemporaryHome"
import { AnimalFormData, animalFormSchema } from "./schema"

export function AnimalForm() {
  // React hook form
  const form = useForm<AnimalFormData>({
    resolver: yupResolver(animalFormSchema),
    defaultValues: {
      name: "",
      type: "",
      gender: "",
      birthDate: undefined,
      streetWhereFound: "",
      cityWhereFound: "",
      postalCodeWhereFound: "",
      dateOfSecurity: undefined,
      residence: "",
      firstNameTemporaryHome: "",
      lastNameTemporaryHome: "",
      phoneNumberTemporaryHome: "",
      streetTemporaryHome: "",
      buildingNumberTemporaryHome: "",
      apartmentNumberTemporaryHome: "",
      cityTemporaryHome: "",
      postalCodeTemporaryHome: "",
      stateOfHealth: "",
    },
  })

  // Next | NextAuth
  const router = useRouter()
  const session = useSession()

  // Custom hooks
  const { state: isLoading, handleOpen: handleStartLoading, handleClose: handleStopLoading } = useDisclose()

  // RTK Query hooks
  const [createAnimal] = useCreateAnimalMutation()
  const { data: temporaryHomes, refetch: refetchTemporaryHomes } = useGetAllTemporaryHomesQuery()
  const { refetch: refetchAnimal } = useGetAllAnimalQuery()

  // Edgestore file uploader hook
  const { edgestore } = useEdgeStore()

  // React hooks
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const [urls, setUrls] = useState<string[]>([])

  // Supporting variables
  const userId = session.data?.user.id
  const showTemporaryHome = form.watch("residence") === AnimalResidence.TEMPORARY_HOME

  // A helper function to handle progress bars for the edgestore library
  const updateFileProgress = (key: string, progress: FileState["progress"]) => {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates)
      const fileState = newFileStates.find((fileState) => fileState.key === key)
      if (fileState) {
        fileState.progress = progress
      }
      return newFileStates
    })
  }

  // Form submit function
  async function onSubmit(formData: AnimalFormData) {
    await handleStartLoading()
    await createAnimal({
      photoUrl: urls,
      name: formData.name,
      type: formData.type === AnimalType.CAT ? Type.CAT : Type.DOG,
      gender: formData.gender === AnimalGender.MALE ? Gender.MALE : Gender.FEMALE,
      birthDate: formData.birthDate,
      locationWhereFound: `${formData.cityWhereFound} ${formData.postalCodeWhereFound} ${formData.streetWhereFound}`,
      timeWhenFound: formData.dateOfSecurity,
      residence: formData.residence === AnimalResidence.BASE ? Residence.BASE : Residence.TEMPORARY_HOME,
      temporaryHomeFirstName: formData.firstNameTemporaryHome,
      temporaryHomeLastName: formData.lastNameTemporaryHome,
      temporaryHomePhoneNumber: formData.phoneNumberTemporaryHome,
      temporaryHomeStreet: formData.streetTemporaryHome,
      temporaryHomeBuildingNumber: formData.buildingNumberTemporaryHome,
      temporaryHomeApartmentNumber: formData.apartmentNumberTemporaryHome,
      temporaryHomeCity: formData.cityTemporaryHome,
      temporaryHomePostalCode: formData.postalCodeTemporaryHome,
      descriptionOfHealth: formData.stateOfHealth,
      userId: userId,
    })
      .unwrap()
      .then(() => {
        for (const url of urls) {
          edgestore.publicFiles.confirmUpload({
            url,
          })
        }
        refetchAnimal()
        refetchTemporaryHomes()
        router.push(Routes.DASHBOARD)
      })
      .catch((err) => console.log(err))
      .finally(() => handleStopLoading())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formularz nowego podopiecznego</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            autoComplete="off"
          >
            {/* Image uploader */}
            <MultiFileDropzone
              dropzoneOptions={{
                accept: { "image/png": [".png"], "image/jpg": [".jpg"], "image/jpeg": [".jpeg"] },
                maxFiles: 4,
                maxSize: 1024 * 1024 * 2, // 2MB
              }}
              className="w-full h-40"
              value={fileStates}
              onChange={(files) => {
                setFileStates(files)
              }}
              onFilesAdded={async (addedFiles) => {
                setFileStates([...fileStates, ...addedFiles])
                await Promise.all(
                  addedFiles.map(async (addedFileState) => {
                    try {
                      const res = await edgestore.publicFiles.upload({
                        file: addedFileState.file,
                        options: {
                          temporary: true,
                        },
                        onProgressChange: async (progress) => {
                          updateFileProgress(addedFileState.key, progress)
                          if (progress === 100) {
                            // wait 1 second to set it to complete
                            // so that the user can see the progress bar at 100%
                            await new Promise((resolve) => setTimeout(resolve, 1000))
                            updateFileProgress(addedFileState.key, "COMPLETE")
                          }
                        },
                      })
                      console.log(res)
                      setUrls((prev) => [...prev, res.url])
                    } catch (err) {
                      updateFileProgress(addedFileState.key, "ERROR")
                    }
                  })
                )
              }}
            />
            {/* Basic information */}
            <BasicInformation form={form} />
            {/* Location information */}
            <LocationInformation form={form} />
            {/* Temporary home information */}
            {showTemporaryHome ? (
              <TemporaryHome
                listOfTemporaryHomes={temporaryHomes}
                form={form}
              />
            ) : null}

            {/* Additional information: Health status*/}
            <FormField
              control={form.control}
              name="stateOfHealth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stan zdrowia</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Opisz stan zdrowia zwierzęcia w dniu przyjęcia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Approval buttons */}
            <div className="w-full flex flex-col md:flex-row justify-end gap-2 md:gap-6">
              <Button
                variant={"outline"}
                type="button"
                asChild
              >
                <Link href="/">Anuluj</Link>
              </Button>
              <Button
                className="order-first md:order-last"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tworzenie
                  </>
                ) : (
                  "Stwórz"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
