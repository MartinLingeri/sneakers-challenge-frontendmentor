import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  IconButton,
  Image,
  Link,
  Stack,
  StackDivider,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import logo from "../images/logo.svg";
import avatar from "../images/image-avatar.png";
import CartIcon from "./icons/CartIcon";
import DeleteIcon from "./icons/DeleteIcon";
import MenuIcon from "./icons/MenuIcon";

import products from "../src/products";
import useCartStore from "../src/store";

export default function Navbar() {
  const links = ["Collections", "Men", "Women", "About", "Contact"];
  const [cartColor, setCartColor] = useState("#69707D");
  const [displayCart, setDisplayCart] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const removeProductFromCartStore = useCartStore(
    (state) => state.removeFromCart
  );
  const cart = useCartStore((state) => state.cart);

  function removeProduct(id: number) {
    removeProductFromCartStore(id);
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgColor="white"
      paddingTop={{ base: 0, md: 2 }}
      paddingBottom={2}
    >
      <Stack
        direction={{ base: "row-reverse", md: "row" }}
        gap={{ base: 0, md: 12 }}
        alignItems="center"
      >
        <Drawer placement="left" size="xs" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent paddingInline={8} paddingBlock={4}>
            <Stack gap={8}>
              <DrawerCloseButton
                variant="unstyled"
                display="block"
                position="relative"
              />
              <Stack gap={3}>
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href="#"
                    fontWeight="700"
                    fontSize="lg"
                    textDecoration="none"
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </DrawerContent>
        </Drawer>
        <Image w="100%" h="100%" src={logo} _hover={{ cursor: "pointer" }} />
        <Stack
          display={["none", "none", "flex", "flex"]}
          direction={{ base: "column", md: "row" }}
          position={{ base: "static", md: "static" }}
          gap={6}
          color="darkGrayishBlue"
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href="#"
              position="relative"
              _hover={{
                color: "black",
                textUnderlineOffset: "10px",
                _after: {
                  content: "''",
                  display: "block",
                  position: "absolute",
                  insetY: "62px",
                  width: "100%",
                  height: "6px",
                  backgroundColor: "hsl(26, 100%, 55%)",
                  marginLeft: "auto",
                  marginRight: "auto",
                },
              }}
            >
              {link}
            </Link>
          ))}
        </Stack>
        <IconButton
          display={["flex", "flex", "none", "none"]}
          aria-label="Open Menu"
          size="md"
          variant="unstyled"
          icon={<MenuIcon />}
          onClick={onOpen}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        gap={{ base: 2, md: 6 }}
        position="relative"
      >
        <Box
          position="relative"
          _hover={{ cursor: "pointer" }}
          onMouseEnter={() => setCartColor("#000")}
          onMouseLeave={() => setCartColor("#69707D")}
          onClick={() => setDisplayCart(!displayCart)}
        >
          <IconButton
            aria-label="cart"
            icon={<CartIcon color={cartColor} />}
            variant="unstyled"
            width="5.5"
            height="5"
          />
          {Object.keys(cart).length > 0 && (
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w={5}
              h={3}
              insetY="-1px"
              insetX={2}
              bg="primary"
              borderRadius="50px"
              color="white"
              fontSize="x-small"
              fontWeight="bold"
              textAlign="center"
              px={2}
              py={1}
            >
              {Object.keys(cart).reduce(
                (acc, key) => acc + cart[key].quantity,
                0
              )}
            </Box>
          )}
        </Box>
        {displayCart && (
          <Stack
            divider={<StackDivider />}
            position="absolute"
            top={{ base: "60px", md: "100%" }}
            right="-1vw"
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            zIndex="1"
            w={{ base: "95vw", md: "360px" }}
            h="200px"
            overflowY="auto"
          >
            <Heading size="md" marginInline={4} fontFamily="Kumbh Sans">
              Cart
            </Heading>
            {Object.keys(cart).length > 0 ? (
              <Stack
                marginInline={4}
                divider={<StackDivider alignSelf="center" w="90%" />}
              >
                {Object.keys(cart).map((key, index) => (
                  <Stack key={index} direction="row">
                    <Image
                      src={products[key].thumbnails[0]}
                      w={12}
                      h={12}
                      borderRadius="lg"
                    />
                    <Stack>
                      <Heading
                        as="h2"
                        size="sm"
                        color="darkGrayishBlue"
                        fontWeight="400"
                        fontFamily="Kumbh Sans"
                      >
                        {products[key].title}
                      </Heading>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Heading
                          as="h2"
                          size="sm"
                          color="darkGrayishBlue"
                          fontWeight="400"
                          fontFamily="Kumbh Sans"
                        >
                          {products[key].finalPrice} x {cart[key].quantity}{" "}
                        </Heading>
                        <Heading
                          as="h2"
                          size="sm"
                          color="varkBlue"
                          fontWeight="700"
                          fontFamily="Kumbh Sans"
                        >
                          $
                          {(
                            Number(products[key].finalPrice.slice(1)) *
                            cart[key].quantity
                          ).toFixed(2)}
                        </Heading>
                      </Stack>
                    </Stack>
                    <IconButton
                      aria-label="delete"
                      variant="unstyled"
                      icon={<DeleteIcon />}
                      size="sm"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      onClick={() => removeProduct(Number(key))}
                    />
                  </Stack>
                ))}
                <Button
                  w="100%"
                  marginBottom={4}
                  p={6}
                  bgColor="primary"
                  color="white"
                  _hover={{ opacity: "0.7" }}
                  boxShadow="2xl"
                >
                  Checkout
                </Button>
              </Stack>
            ) : (
              <Stack h="100%" alignItems="center" justifyContent="center">
                <Heading
                  size="md"
                  marginInline={4}
                  color="darkGrayishBlue"
                  textAlign="center"
                  fontFamily="Kumbh Sans"
                >
                  Your cart is empty
                </Heading>
              </Stack>
            )}
          </Stack>
        )}
        <Avatar
          src={avatar}
          w={{ base: 8, md: 12 }}
          h={{ base: 8, md: 12 }}
          _hover={{ outline: "2px solid #FF7E1B", cursor: "pointer" }}
        />
      </Stack>
    </Stack>
  );
}
