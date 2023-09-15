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

export type HealthRecords = {
  allergies: Allergy[]
}
