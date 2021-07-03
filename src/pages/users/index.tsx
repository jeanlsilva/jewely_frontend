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

type users = {
  name: string;
  email: string;
  created_at: string;
  totalCount: number;
};

export default function UserList() {
  const {data, isLoading, isFetching, error, refetch} = useUsers();

  console.log(data)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handleRemoveUser(id: string) {
    await api.delete(`users/${id}`)

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
            Usuários
            { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>

          <NextLink href="/users/create" passHref>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
            >
              Criar Novo
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
              </Th>
              <Th>
                Usuário
              </Th>
              <Th>
                Cargo
              </Th>
              { isWideVersion && <Th>Data de Criação</Th>}
              <Th width="8"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(user =>{
              return (
                <Tr key={user.id}> 
                  <Td px={["4", "4", "6"]}>
                  </Td>
                  <Td>
                    <Box>
                      <Link color ="purple.400">
                        <Text fontWeight="bold">{user.name}</Text>
                      </Link>
                      <Text fontSize="small" color="gray.300">{user.email}</Text>
                    </Box>
                  </Td>
                  <Td>
                    {user.cargo}
                  </Td>
                  { isWideVersion && <Td>{user.createdAt}</Td> }
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
                      onClick={() => handleRemoveUser(user.id)}
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
  router.push('users/update', id)

  console.log(id)
  const userId = id

  return userId;
}

