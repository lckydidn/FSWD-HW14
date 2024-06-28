import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Image,
} from "@chakra-ui/react";
import { loginUser } from "../modules/fetch/index.js";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(
        e.target.email.value,
        e.target.password.value
      );
      window.localStorage.setItem("token", token.token);
      setIsLogin(true);
      router.push("/");
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setIsLogin(false);
    router.push("/");
  };

  return (
    <Flex
      w='full'
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1rem'
      bg='lightgray'
      color='blue'
    >
      <Link href='/' passHref>
        <Flex align='center' mr={5} cursor='pointer'>
          <Image objectFit='cover' src='/BooksDB.svg' alt='Logo' />
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link href='/newbook' passHref>
            <Button colorScheme='purple' variant='ghost'>
              Create New Book
            </Button>
          </Link>
        )}
        {!isLogin ? (
          <Button
            onClick={onOpen}
            colorScheme='teal'
            variant='solid'
            borderRadius='10px'
          >
            Login
          </Button>
        ) : (
          <Button colorScheme='red' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form id='login-form' onSubmit={handleLogin}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name='email'
                    type='email'
                    placeholder='Enter your email address'
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' form='login-form' colorScheme='blue' mr={3}>
                Login
              </Button>
              <Link href='/register' passHref>
                <Button variant='ghost' onClick={onClose}>
                  Don't Have an Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
