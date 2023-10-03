"use client"
import { MultiFileDropzone, type FileState } from "@/components/MultiFileDropzone/MultiFileDropzone"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useDisclose } from "@/hooks"
import { useEdgeStore } from "@/lib/edgestore"
import { cn, formatPostalCode } from "@/lib/utils"
import { useCreateAnimalMutation, useGetAllAnimalQuery } from "@/redux/services/animalApi"
import { AnimalGender, AnimalResidence, AnimalType } from "@/types/animal"
import { Routes } from "@/types/routes"
import { yupResolver } from "@hookform/resolvers/yup"
import { Gender, Residence, Type } from "@prisma/client"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { AnimalFormData, animalFormSchema } from "./schema"

export function AnimalForm() {
  const form = useForm<AnimalFormData>({
    resolver: yupResolver(animalFormSchema),
    defaultValues: {
      name: "",
      genre: "",
      gender: "",
      birthDate: undefined,
      streetWhereFound: "",
      cityWhereFound: "",
      postalCodeWhereFound: "",
      dateOfSecurity: undefined,
      residence: "",
      stateOfHealth: "",
    },
  })

  const { state: isLoading, handleOpen: handleStartLoading, handleClose: handleStopLoading } = useDisclose()
  const router = useRouter()
  const session = useSession()
  const userId = session.data?.user.id
  const [createAnimal] = useCreateAnimalMutation()
  const { refetch } = useGetAllAnimalQuery()
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const { edgestore } = useEdgeStore()
  const [urls, setUrls] = useState<string[]>([])

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates)
      const fileState = newFileStates.find((fileState) => fileState.key === key)
      if (fileState) {
        fileState.progress = progress
      }
      return newFileStates
    })
  }

  async function onSubmit(formData: AnimalFormData) {
    await handleStartLoading()
    await createAnimal({
      photoUrl: urls,
      name: formData.name,
      type: formData.genre === AnimalType.CAT ? Type.CAT : Type.DOG,
      gender: formData.gender === AnimalGender.MALE ? Gender.MALE : Gender.FEMALE,
      birthDate: formData.birthDate,
      locationWhereFound: `${formData.cityWhereFound} ${formData.postalCodeWhereFound} ${formData.streetWhereFound}`,
      timeWhenFound: formData.dateOfSecurity,
      residence: formData.residence === AnimalResidence.BASE ? Residence.BASE : Residence.TEMPORARY_HOME,
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
        refetch()
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
            <MultiFileDropzone
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię *</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-off"
                      required
                      placeholder="Reks"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gatunek *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cat" />
                        </FormControl>
                        <FormLabel className="font-normal">Kot</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="dog" />
                        </FormControl>
                        <FormLabel className="font-normal">Pies</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Płeć *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Samica</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Samiec</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data urodzenia *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP", { locale: pl }) : <span>Wybierz date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() ||
                          new Date(form.getValues("dateOfSecurity")) < date ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className="mb-2">
                <Label>Miejsce złapania *</Label>
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="streetWhereFound"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoComplete="new-off"
                          required
                          placeholder="Ulica"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="cityWhereFound"
                    render={({ field }) => (
                      <FormItem className="w-2/3">
                        <FormControl>
                          <Input
                            required
                            placeholder="Miasto"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCodeWhereFound"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormControl>
                          <Input
                            required
                            placeholder="Kod pocztowy"
                            value={formatPostalCode(field.value)}
                            onChange={field.onChange}
                            maxLength={5}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="dateOfSecurity"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data zabezpieczenia *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP", { locale: pl }) : <span>Wybierz date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() ||
                          new Date(form.getValues("birthDate")) > date ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="residence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gdzie przebywa *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz miejsce gdzie przebywa zwierze" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={AnimalResidence.BASE}>Siedziba</SelectItem>
                      <SelectItem value={AnimalResidence.TEMPORARY_HOME}>Dom tymczasowy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <div className="w-full flex justify-end space-x-6">
              <Button
                variant={"outline"}
                type="button"
                asChild
              >
                <Link href="/">Anuluj</Link>
              </Button>
              <Button
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
