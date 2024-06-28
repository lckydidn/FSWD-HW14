import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { deleteBook, getBookDetailById } from "../modules/fetch/index.js";
import { useEffect, useState } from "react";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      {isLoading ? (
        <Skeleton height='300px' my='6' />
      ) : (
        <Flex my='6'>
          <Box w='300px'>
            <Image
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
            />
          </Box>
          <Box ml='8'>
            <Heading as='h1' size='lg'>
              {book.title}
            </Heading>
            <Text fontSize='xl' fontWeight='semibold' color='gray.500'>
              {book.author}
            </Text>
            <Text fontSize='xl' fontWeight='semibold' color='gray.500'>
              {book.publisher}
            </Text>
            <Text fontSize='xl' fontWeight='semibold' color='gray.500' mb='4'>
              {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
      )}
      {localStorage.getItem("token") && (
        <HStack>
          <Button colorScheme='red' onClick={handleDeleteBook}>
            Delete
          </Button>
          <Button onClick={() => router.push(`/editbook/${id}`)}>Edit</Button>
        </HStack>
      )}
    </Box>
  );
};

export default BookDetails;
