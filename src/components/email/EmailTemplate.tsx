import { Body, Button, Container, Head, Heading, Html, Tailwind, Text } from "@react-email/components"

type TemplateProps = {
  description: string
  notice?: string
  link: string
  buttonTitle: string
}

export const EmailTemplate = ({ description, notice, link, buttonTitle }: TemplateProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Container className="text-neutral-950">
            <Heading className="text-lg font-medium">Cześć 👋</Heading>
            <Text>{description}</Text>
            {notice ? <Text className="font-medium">{notice}</Text> : null}
            <Button
              className="bg-[#6921ef] text-white border p-2 rounded-[8px] cursor-pointer"
              href={`https://www.reks-manager.pl/${link}`}
            >
              {buttonTitle}
            </Button>
            <Text className="text-xs italic text-gray-900 text-opacity-70">
              Ta wiadomość została wygenerowana automatycznie, nie odpisuj na nią.
              <br /> Jeśli nie jesteś adresatem wiadomości, zignoruj ją.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
