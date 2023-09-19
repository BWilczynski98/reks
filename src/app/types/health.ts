export enum AllergyCategory {
  FOOD = "Pokarmowa",
  CONTACT = "Kontaktowa",
  INHALATION = "Wziewna",
}

export type Allergy = {
  category: AllergyCategory
  allergen: string
  symptoms: string
}

export type Drug = {
  name: string
  dose: string
  interval: string
  until: Date
  comments?: string
}

export type Vaccination = {
  name: string
  date: Date
  term: Date
  comments?: string
}

export type HealthRecords = {
  allergies: Allergy[] | []
  drugs: Drug[] | []
  vaccination: Vaccination[] | []
}

export type HealthRecordsForms = {
  formIsOpen: boolean
  formOnClose: () => void
  formOnSubmit: () => void
  formTitle: string
}
