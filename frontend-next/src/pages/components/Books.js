import { Card, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

const Books = ({ id, title, author, image, publisher, year }) => {
  return (
    <Link href={`/books/${id}`} passHref>
      <Card key={id} my={4} mx={2} p={4} cursor='pointer' w='250px' h='100%'>
        <VStack>
          <Heading size={"md"}>
            {title} ({year})
          </Heading>
          <Text>{author}</Text>
          <Image
            w={24}
            h={24}
            src={`http://localhost:8000/${image}`}
            alt={title}
          />
          <Text>
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
};

export default Books;
