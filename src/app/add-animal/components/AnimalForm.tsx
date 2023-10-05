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
import { cn, formatPhoneNumber, formatPostalCode } from "@/lib/utils"
import { useCreateAnimalMutation, useGetAllAnimalQuery, useGetAllTemporaryHomesQuery } from "@/redux/services/animalApi"
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
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { AnimalFormData, animalFormSchema } from "./schema"

export function AnimalForm() {
  const form = useForm<AnimalFormData>({
    resolver: yupResolver(animalFormSchema),
    defaultValues: {
      name: "",
      type: "",
      gender: "",
      race: "",
      size: "",
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

  const { state: isLoading, handleOpen: handleStartLoading, handleClose: handleStopLoading } = useDisclose()
  const router = useRouter()
  const session = useSession()
  const userId = session.data?.user.id
  const [createAnimal] = useCreateAnimalMutation()
  const { data: temporaryHomes, refetch: refetchTemporaryHomes } = useGetAllTemporaryHomesQuery()
  const { refetch: refetchAnimal } = useGetAllAnimalQuery()
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const { edgestore } = useEdgeStore()
  const [urls, setUrls] = useState<string[]>([])
  const [temporaryHomeListDisabled, setTemporaryHomeListDisabled] = useState(false)

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
    console.log(formData)
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

  useEffect(() => {
    form.resetField("lastNameTemporaryHome")
    form.resetField("firstNameTemporaryHome")
    form.resetField("phoneNumberTemporaryHome")
    form.resetField("streetTemporaryHome")
    form.resetField("buildingNumberTemporaryHome")
    form.resetField("apartmentNumberTemporaryHome")
    form.resetField("cityTemporaryHome")
    form.resetField("postalCodeTemporaryHome")
  }, [temporaryHomeListDisabled])

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
              dropzoneOptions={{
                accept: { "image/png": [".png"], "image/jpg": [".jpg"] },
                maxFiles: 4,
                maxSize: 1024 * 1024 * 2,
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
              name="type"
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
                          <RadioGroupItem value={AnimalType.CAT} />
                        </FormControl>
                        <FormLabel className="font-normal">Kot</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={AnimalType.DOG} />
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
                  <FormLabel>Szacowana data urodzenia *</FormLabel>
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
                            autoComplete="new-off"
                            required
                            placeholder="Kod pocztowy"
                            {...field}
                            value={formatPostalCode(field.value as string)}
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
                      <SelectItem value={AnimalResidence.BASE}>{AnimalResidence.BASE}</SelectItem>
                      <SelectItem value={AnimalResidence.TEMPORARY_HOME}>{AnimalResidence.TEMPORARY_HOME}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Temporary home section */}
            {form.watch("residence") === AnimalResidence.TEMPORARY_HOME ? (
              <div className="bg-zinc-50/50 dark:bg-zinc-900 rounded-xl p-4 space-y-4">
                <p className="text-lg font-semibold">Dane domu tymczasowego</p>
                {temporaryHomeListDisabled ? (
                  <>
                    <div className="flex justify-between space-x-2">
                      <FormField
                        control={form.control}
                        name="firstNameTemporaryHome"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Imię *</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="new-off"
                                required
                                placeholder="Jan"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastNameTemporaryHome"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Nazwisko *</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="new-off"
                                required
                                placeholder="Nowak"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name="phoneNumberTemporaryHome"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Numer telefonu *</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="new-off"
                                required
                                placeholder="555-444-333"
                                maxLength={9}
                                {...field}
                                value={formatPhoneNumber(field.value as string)}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="streetTemporaryHome"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Ulica *</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="new-off"
                                required
                                placeholder="Głowna"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name="buildingNumberTemporaryHome"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Numer budynku *</FormLabel>
                            <FormControl>
                              <Input
                                required
                                placeholder="10"
                                autoComplete="new-off"
                                maxLength={4}
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="apartmentNumberTemporaryHome"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Numer mieszkania</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1"
                                autoComplete="new-off"
                                maxLength={4}
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name="cityTemporaryHome"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Miasto *</FormLabel>
                            <FormControl>
                              <Input
                                required
                                placeholder="Gdańsk"
                                autoComplete="new-off"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCodeTemporaryHome"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Kod pocztowy *</FormLabel>
                            <FormControl>
                              <Input
                                required
                                placeholder="00-000"
                                autoComplete="new-off"
                                maxLength={6}
                                {...field}
                                value={formatPostalCode(field.value ? field.value : "")}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {!!temporaryHomes?.length ? (
                      <FormField
                        control={form.control}
                        name="firstNameTemporaryHome"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Domy tymczasowe</FormLabel> */}
                            <Select
                              defaultValue={field.value}
                              disabled={temporaryHomeListDisabled}
                              onValueChange={(value) => {
                                // selectTemporaryHomeById(value)
                                const home = temporaryHomes?.find((home) => home.id === value)

                                if (home) {
                                  const nameplate = home.owner.split(" ")
                                  const addressSplit = home.street.split(" ")
                                  const numberOfAddressSplit = addressSplit[1].split("/")
                                  const firstName = nameplate[0]
                                  const lastName = nameplate[1]
                                  const streetName = addressSplit[0]
                                  const buildNumber = numberOfAddressSplit[0]
                                  const apartmentNumber = numberOfAddressSplit[1]

                                  form.setValue("firstNameTemporaryHome", firstName)
                                  form.setValue("lastNameTemporaryHome", lastName)
                                  form.setValue("phoneNumberTemporaryHome", home.phoneNumber)
                                  form.setValue("streetTemporaryHome", streetName)
                                  form.setValue("buildingNumberTemporaryHome", buildNumber)
                                  form.setValue("apartmentNumberTemporaryHome", apartmentNumber)
                                  form.setValue("cityTemporaryHome", home?.city)
                                  form.setValue("postalCodeTemporaryHome", home?.postalCode)
                                }
                              }}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Wybierz z listy dom tymczasowy" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {temporaryHomes?.map((house, i) => {
                                  return (
                                    <SelectItem
                                      value={house.id.toString()}
                                      key={i}
                                    >
                                      <div>
                                        <div className="font-semibold">{house.owner}</div>
                                        <div>{house.street}</div>
                                        <div>
                                          {formatPostalCode(house.postalCode)}&nbsp;{house.city}
                                        </div>
                                      </div>
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : null}
                  </>
                )}
                <div className="flex justify-center">
                  <Button
                    // className="w-full"
                    variant={"secondary"}
                    type="button"
                    onClick={() => {
                      setTemporaryHomeListDisabled((prev) => !prev)
                    }}
                  >
                    {temporaryHomeListDisabled ? "Wybierz z listy" : "Stwórz nowy"}
                  </Button>
                </div>
              </div>
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
