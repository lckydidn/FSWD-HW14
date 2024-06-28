import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BookForm from "../components/BookForm.js";
import { getBookDetailById } from "../modules/fetch/index.js";

const EditBookPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
      } catch (e) {
        console.log(e);
      }
    };
    if (id) {
      fetchBook();
    }
  }, [id]);

  return <Box>{book && <BookForm bookData={book} />}</Box>;
};

export default EditBookPage;
