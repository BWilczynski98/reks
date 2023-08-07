import { Body, Button, Container, Head, Heading, Html, Tailwind, Text } from "@react-email/components"

export const WelcomeTemplate = ({
  firstName,
  password,
  tokenToActivate,
}: {
  firstName: string
  password: string
  tokenToActivate: string
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Container>
            <Heading className="text-lg font-medium text-neutral-950">Hello {firstName} 👋</Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolores officiis molestias? Fugiat, omnis
              animi, repellendus accusamus tempore necessitatibus expedita a quibusdam illum non praesentium ipsam odio
              nisi quos voluptates.
            </Text>
            <Text>
              Twoje hasło tymczasowe to: <span className="font-bold">{password}</span>
            </Text>
            <Button
              className="bg-[#6921ef] text-white border p-2 rounded-[4px] cursor-pointer"
              href={`https://localhost:3000/activate/${tokenToActivate}`}
            >
              Aktywuj konto
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
