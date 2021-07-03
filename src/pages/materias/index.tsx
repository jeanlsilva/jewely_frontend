import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Td,
  Tbody,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiAddLine, RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import NextLink from "next/link";
import { useUsers, getUsers, pageUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { api } from "../../services/apiClient";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { SubmitHandler } from "react-hook-form";
import router from "next/router";
import { useMaterias } from "../../services/hooks/useMaterias";

type Materia = {
  id: string;
  name: string;
  quantity: number;
  reference: number;
  user_id: string;
}

export default function MateriaList() {
  const {data, isLoading, isFetching, error, refetch} = useMaterias();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handleRemoveMateria(id: string) {
    await api.delete(`materias/${id}`)

    // router.reload()
    refetch()
  }

  

return(
  <Box>
    <Header/>

    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Sidebar/>

      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Matérias Primas
            { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>

          <NextLink href="/registos/compra" passHref>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
            >
              Adicionar Compra
            </Button>
          </NextLink>
        </Flex>
        
      {isLoading ?(
        <Flex justify="center">
          <Spinner/>
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter dados dos usuários.</Text>
        </Flex>
      ) : (
        <>
          <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th px="6" color="gray.300" width="8">
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>
                Referência
              </Th>
              <Th>
                Matéria
              </Th>
              { isWideVersion && <Th>Quantidade</Th>}
              <Th width="8"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(user =>{
              return (
                <Tr key={user.id}> 
                  <Td px={["4", "4", "6"]}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Link color ="purple.400">
                        <Text>{user.reference}</Text>
                      </Link>
                    </Box>
                  </Td>
                  <Td>
                  <Text fontWeight="bold">{user.name}</Text>
                  </Td>
                  { isWideVersion && <Td>{user.quantity}</Td> }
                  {isWideVersion &&
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="purple"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                      onClick={() => handleEditUser(user.id)}
                    >
                      Editar
                    </Button>
                  </Td>}
                  {isWideVersion &&
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleRemoveMateria(user.id)}
                    ><Icon as={RiDeleteBin6Line} fontSize="16"/>
                    </Button>
                  </Td>}
                </Tr>
              )
            })}
          </Tbody>

        </Table>

        <Pagination
          // totalCountOfRegisters={}
          // currentPage={pageUsers}
          // onPageChange={setPage}
        />
      </>
      )}
      </Box>


    </Flex>
  </Box>
);
}

export function handleEditUser (id: string){
  // router.push(`materias/update/${id}`)

    // Always do navigations after the first render
    // router.push('/materias/update', undefined, { id_Mat: id })
    router.push({
      pathname: 'materias/update', 
      query: {id: id}
    })
  

  console.log(id)

  // return userId;
}