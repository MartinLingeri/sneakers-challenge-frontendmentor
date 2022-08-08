import { Container, Stack, StackDivider } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import Product from "../components/Product";

function App() {
  return (
    <Container maxW="container.xl" marginBlock={4}>
      <Stack
        divider={<StackDivider display={{ base: "none", md: "block" }} />}
        gap={{ base: 0, md: 2 }}
      >
        <Navbar />
        <Product />
      </Stack>
    </Container>
  );
}

export default App;
