import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  FormControl,
  NumberInput,
  FormLabel,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../services/apiClient";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/dist/client/router";
import { GetServerSideProps } from "next";
import { useUsers } from "../../services/hooks/useUsers";
import { RiAddLine } from "react-icons/ri";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  cargo: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  email: yup.string().required('Email Obrigatório').email('Email Inválido'),
  password: yup.string().required('Senha Obrigatório').min(6, 'No minimo 6 caracteres'),
  avatar: yup.string(),
  cargo: yup.string().required('Cargo Necessário')
})

export default function CreateUser(){
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const router = useRouter()

  const {data} = useUsers();
  console.log(data)

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) =>{
    await new Promise(resolve => setTimeout(resolve,2000));
    await api.post('users', values)

    console.log(values);
    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Registar Envio
          </Heading>

          <Divider my="6" borderColor="gray.700" />
          
          <VStack spacing="8">
          
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            
              <Input
                name="ref"
                label="Referência"
                error={errors.ref}
                {...register("ref")}
              />
              <FormControl 
                id="quantidade" 
                label="Quantidade"
                error={errors.qtd}
                {...register("qtd")}>
                  <FormLabel>Quantidade</FormLabel>
                  <NumberInput defaultValue={1} min={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
              </FormControl>
              <Link href="#" passHref>
                <Button as="a"
                  size="md"
                  mt="8"
                  width="10"
                  colorScheme="pink">
                    <Icon as={RiAddLine} fontSize="20"/></Button>
              </Link>
              
              
                
            </SimpleGrid>
            
          </VStack>
          <Flex mt="8" justify="flex-end"  width="25%">
          <FormControl id="artesão" >
                <FormLabel>Artesão</FormLabel>
                
                <Select placeholder="Escolha Artesão">
                {data.map(user =>{
                return (
                  <>
                  {user.cargo==='Artesao' && <option key={user.id} >{user.name}</option>}
                  </>)})}
                </Select>
              </FormControl>
          </Flex>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Envio
              </Button>
            </HStack>
          </Flex>
        </Box> 
      </Flex>
    </Box>
  );
}