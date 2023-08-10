import { Body, Button, Container, Head, Heading, Html, Tailwind, Text } from "@react-email/components"

export const WelcomeTemplate = ({ firstName, tokenToActivate }: { firstName: string; tokenToActivate: string }) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Container>
            <Heading className="text-lg font-medium text-neutral-950">Hello {firstName} 👋</Heading>
            <Text>
              Na podany adres email zostało założone konto w aplikacji reks-manager. Aby dokończyć proces rejestracji
              przejdz na strone aktywacji naciskając przycisk i nadaj hasło.
            </Text>
            <Button
              className="bg-[#6921ef] text-white border p-2 rounded-[4px] cursor-pointer"
              href={`https://www.reks-manager.pl/activate/${tokenToActivate}`}
            >
              Aktywuj konto
            </Button>
            <Text className="text-xs italic text-gray-900 text-opacity-70">
              Ta wiadomość została wygenerowana automatycznie, nie odpisuj na nią. Jeśli nie jesteś adresatem
              wiadomości, zignoruj ją.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
