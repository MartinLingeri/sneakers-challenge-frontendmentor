import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import products from "../src/products";
import useCartStore from "../src/store";

import CartIcon from "./icons/CartIcon";
import MinusIcon from "./icons/MinusIcon";
import PlusIcon from "./icons/PlusIcon";
import PreviousIcon from "./icons/PreviousIcon";
import NextIcon from "./icons/NextIcon";

export default function Product() {
  const [selectedImageIndex, setSeletedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prevIconColor, setPrevIconColor] = useState<string>("#1D2026");
  const [nextIconColor, setNextIconColor] = useState<string>("#1D2026");

  const addProductToCartStore = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  function addToCart() {
    const productInCart = cart[products[1].id];
    if (productInCart) {
      const newQuantity = Math.min(productInCart.quantity + quantity, 9);
      addProductToCartStore({ id: products[1].id, quantity: newQuantity });
    } else {
      addProductToCartStore({ id: products[1].id, quantity });
    }
  }

  function handlePlusQuantity() {
    if (quantity < 9) {
      setQuantity(quantity + 1);
    }
  }

  function handleMinusQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function selectNextImage() {
    if (selectedImageIndex < products[1].images.length - 1) {
      setSeletedImageIndex(selectedImageIndex + 1);
    }
  }

  function selectPreviousImage() {
    if (selectedImageIndex > 0) {
      setSeletedImageIndex(selectedImageIndex - 1);
    }
  }

  return (
    <Container maxW="container.lg" marginBlock={{ base: 0, md: 12 }}>
      <Stack
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 6, md: 24 }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack display={["none", "none", "flex", "flex"]} w="600px" gap={6}>
          <Image
            src={products[1].images[selectedImageIndex]}
            borderRadius="xl"
            cursor="pointer"
            _hover={{ transform: "scale(1.1)", opacity: "0.8" }}
            onClick={onOpen}
          />
          <Stack direction="row" justifyContent="space-between">
            {products[1].thumbnails.map((thumbnail, index) => (
              <Box
                key={index}
                w="90px"
                borderRadius="xl"
                outline={
                  selectedImageIndex === index
                    ? "3px solid hsl(26, 100%, 55%)"
                    : ""
                }
                _hover={{
                  cursor: "pointer",
                }}
                onClick={() => setSeletedImageIndex(index)}
              >
                <Image
                  src={thumbnail}
                  borderRadius="xl"
                  opacity={selectedImageIndex === index ? 0.7 : 1}
                  _hover={{
                    opacity: "0.7",
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
        <Stack
          display={["flex", "flex", "none", "none"]}
          direction="row"
          w="100vw"
          alignItems="center"
        >
          <IconButton
            aria-label="previous"
            icon={<PreviousIcon color={prevIconColor} />}
            borderRadius="50%"
            size="lg"
            position="absolute"
            left={2}
            onClick={selectPreviousImage}
            onMouseEnter={() => setPrevIconColor("#FF7E1B")}
            onMouseLeave={() => setPrevIconColor("#1D2026")}
          />
          <Image
            src={products[1].images[selectedImageIndex]}
            w="100vw"
            marginInlineStart={0}
          />
          <IconButton
            aria-label="next"
            icon={<NextIcon color={nextIconColor} />}
            borderRadius="50%"
            size="lg"
            position="absolute"
            right={2}
            onClick={selectNextImage}
            onMouseEnter={() => setNextIconColor("#FF7E1B")}
            onMouseLeave={() => setNextIconColor("#1D2026")}
          />
        </Stack>
        <Stack gap={6}>
          <Stack>
            <Heading
              as="h2"
              size="sm"
              textTransform="uppercase"
              color="primary"
            >
              sneaker company
            </Heading>
            <Heading as="h1" size="2xl" textTransform="capitalize">
              {products[1].title}
            </Heading>
          </Stack>
          <Text fontWeight="500" maxW="50ch" color="darkGrayishBlue">
            {products[1].description}
          </Text>
          <Stack
            direction={{ base: "row", md: "column" }}
            alignItems={{ base: "center", md: "normal" }}
            justifyContent={{ base: "space-between", md: "normal" }}
          >
            <Stack direction="row" alignItems="center">
              <Heading>{products[1].finalPrice}</Heading>
              <Badge
                paddingInline={2}
                borderRadius="md"
                fontSize="lg"
                backgroundColor="secondary"
                color="primary"
              >
                {products[1].discount}
              </Badge>
            </Stack>
            <Heading
              as="h2"
              size="md"
              color="grayishBlue"
              textDecoration="line-through"
            >
              {products[1].price}
            </Heading>
          </Stack>
          <Stack direction={{ base: "column", md: "row" }} alignItems="center">
            <Stack
              direction="row"
              w={{ base: "100%", md: "120px" }}
              justifyContent="space-between"
              bgColor="gray.100"
              borderRadius="md"
              p={1}
            >
              <IconButton
                aria-label="minus"
                icon={<MinusIcon />}
                onClick={handleMinusQuantity}
              />
              <Text
                w={4}
                alignSelf="center"
                variant="unstyled"
                fontWeight="700"
                textAlign="center"
              >
                {quantity}
              </Text>
              <IconButton
                aria-label="plus"
                icon={<PlusIcon />}
                onClick={handlePlusQuantity}
              />
            </Stack>
            <Button
              w={{ base: "100%", md: "270px" }}
              h="56px"
              bgColor="primary"
              color="white"
              _hover={{ opacity: "0.7" }}
              boxShadow="2xl"
              leftIcon={<CartIcon color="white" />}
              onClick={addToCart}
            >
              Add to cart
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="transparent" boxShadow="none">
          <ModalCloseButton
            size="lg"
            borderRadius="50%"
            position="relative"
            insetY={-2}
            insetX={2}
            transform="scale(1.4)"
            alignSelf="flex-end"
            color="white"
            _hover={{ color: "primary" }}
          />
          <Stack justifyContent="center" alignSelf="center" w="600px" gap={6}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <IconButton
                aria-label="previous"
                icon={<PreviousIcon color={prevIconColor} />}
                borderRadius="50%"
                size="lg"
                insetX={8}
                onClick={selectPreviousImage}
                onMouseEnter={() => setPrevIconColor("#FF7E1B")}
                onMouseLeave={() => setPrevIconColor("#1D2026")}
              />
              <Image
                src={products[1].images[selectedImageIndex]}
                borderRadius="xl"
              />
              <IconButton
                aria-label="next"
                icon={<NextIcon color={nextIconColor} />}
                borderRadius="50%"
                size="lg"
                insetX={-8}
                onClick={selectNextImage}
                onMouseEnter={() => setNextIconColor("#FF7E1B")}
                onMouseLeave={() => setNextIconColor("#1D2026")}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-around">
              {products[1].thumbnails.map((thumbnail, index) => (
                <Box
                  key={index}
                  w="120px"
                  borderRadius="xl"
                  outline={
                    selectedImageIndex === index
                      ? "3px solid hsl(26, 100%, 55%)"
                      : ""
                  }
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => setSeletedImageIndex(index)}
                >
                  <Image
                    src={thumbnail}
                    borderRadius="xl"
                    opacity={selectedImageIndex === index ? 0.7 : 1}
                    _hover={{
                      opacity: "0.7",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Stack>
        </ModalContent>
      </Modal>
    </Container>
  );
}
