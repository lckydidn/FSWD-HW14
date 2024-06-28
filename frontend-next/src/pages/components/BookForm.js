import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch/index.js";

const BookForm = ({ bookData }) => {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel mt={4}>Title</FormLabel>
            <Input name='title' required defaultValue={bookData?.title} />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input name='author' required defaultValue={bookData?.author} />
          </FormControl>
          <FormControl>
            <FormLabel>Publisher</FormLabel>
            <Input
              name='publisher'
              required
              defaultValue={bookData?.publisher}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input
              name='year'
              type='number'
              required
              defaultValue={bookData?.year}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Pages</FormLabel>
            <Input
              name='pages'
              type='number'
              required
              defaultValue={bookData?.pages}
            />
          </FormControl>
          {selectedImage && (
            <Image w={64} src={selectedImage} alt='Selected Image' />
          )}
          {!bookData?.image && (
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                pt={2}
                pb={4}
                name='image'
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                }}
              />
            </FormControl>
          )}

          <Button type='submit'>
            {bookData ? "Edit Book" : "Create Book"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default BookForm;
