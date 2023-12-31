type Animal = {
  id: string
  createAt: string
  updateAt: string
  name: string
  type: string
  gender: string
  birthDate: string
  locationWhereFound: string
  timeWhenFound: string
  photoUrl: string
  residence: string
  description: string
  status: string
  userId: string
  referenceNumber: number
  descriptionOfHealth: string
  homeId?: string
  healthCardId: string
}

type TableFilter = {
  label: string
  value: string
  active: boolean
}

type User = {
  email: string
  password: string
  id: string
  active: boolean
  createdAt: string
  name: string
  role: string
  updatedAt: string
}

type TemporaryHomeType = {
  id: string
  createAt: string
  updateAt: string
  owner: string
  street: string
  phoneNumber: string
  city: string
  postalCode: string
}
