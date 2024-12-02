import type { Metadata } from "next";
import { Box, Center, Container, Flex, Text } from "@chakra-ui/react";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Financial Monitoring",
  description: "Financial Monitoring Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={"body"}>
        <Providers>
          <Flex flexDirection="column" bg="#ddd">
            <Box flex="1" bg="#333">
              <Center>
                <Container mx="auto" p="5px">
                  <Text fontSize="12px" color="#aaa">
                    Luciano Fiorin - Financial Monitoring
                  </Text>
                </Container>
              </Center>
            </Box>
            <Center>
              <Container p="1em" bg="#fff">
                {children}
              </Container>
            </Center>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
