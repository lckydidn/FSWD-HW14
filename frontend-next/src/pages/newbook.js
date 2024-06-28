import { Box, Heading } from "@chakra-ui/react";
import BookForm from "./components/BookForm.js";

const NewBookPage = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Create New Book</Heading>
      <BookForm />
    </Box>
  );
};

export default NewBookPage;
