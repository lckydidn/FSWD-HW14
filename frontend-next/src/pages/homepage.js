import { HStack, Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../pages/components/Books.js";
import { getAllBooks } from "./modules/fetch/index.js";

const Homepage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const booksData = await getAllBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        window.alert("Database belum nyala");
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      {loading ? (
        <Spinner size='xl' mt={4} />
      ) : (
        <HStack spacing={4}>
          {books?.books?.map((book) => (
            <Books key={book.id} {...book} />
          ))}
        </HStack>
      )}
    </Box>
  );
};

export default Homepage;
