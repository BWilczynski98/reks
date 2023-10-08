import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthCard } from "./components/HealthCard"
import { Profile } from "./components/Profile"

export default async function AnimalPage({ params }: { params: { slug: string } }) {
  const animalId = params.slug

  return (
    <div className="container mx-auto py-5">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="health-card">Karta zdrowia</TabsTrigger>
          <TabsTrigger
            value="adoption-announcement"
            disabled
          >
            Ogłoszenie adopcyjne
          </TabsTrigger>
          <TabsTrigger
            value="release-sheet"
            disabled
          >
            Karta wydania
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile animalId={animalId} />
        </TabsContent>
        <TabsContent value="health-card">
          <HealthCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
