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
  Text,
  Spinner
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
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
import { FormItem } from "../../components/Form/FormItem";
import { useRef } from "react";
import { useEffect } from "react";

type CreateShipmentFormData = {
  reference: string;
  quantity: number;
}

interface Item {
  reference: string;
  quantity: number;
}

const ShipmentFormSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  email: yup.string().required('Email Obrigatório').email('Email Inválido'),
  password: yup.string().required('Senha Obrigatório').min(6, 'No minimo 6 caracteres'),
  avatar: yup.string(),
  cargo: yup.string().required('Cargo Necessário')
})

const createShipmentFormSchema = yup.object().shape({
  reference: yup.string().required('Campo obrigatório')
})

export default function Shipment(){
  const [itemList, setItemList] = useState([] as Item[])
  const [reference, setReference] = useState('')
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [userData, setUserData] = useState([])

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createShipmentFormSchema)
  })
  const router = useRouter()

  const { errors } = formState
  const {data, isLoading, isFetching, error, refetch} = useUsers();

  /*
  const handleShipment: SubmitHandler<ShipmentFormData> = async (values) =>{
    await new Promise(resolve => setTimeout(resolve,2000));
    await api.post('users', values)

    router.push('/users')
  }*/

  useEffect(() => {
    if (data) {
      setUserData(data)
    }
  }, [data])

  useEffect(() => {
    if (itemList.length < 1) {
      setItemList([{
        reference,
        quantity,
      }])
    } else {
      setItemList(itemList)
    }
  }, [itemList])

  const handleSave = () => {
    for (const item of itemList) {
      console.log(`cadastrar item ref #${item.reference}`)
    }
  }

  const handleAddItem = () => {
    setItemList([...itemList, {
      reference,
      quantity,
    }])
    setReference('')
  }

  const handleRegisterRef = data => {
    setReference(data)
  }

  const handleRegisterName = data => {
    setName(data)
  }

  const handleRegisterQt = data => {
    setQuantity(Number(data))
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
          onSubmit={handleSubmit(handleSave)}
        >
          <Heading size="lg" fontWeight="normal">
            Registar Envio
          </Heading>

          <Divider my="6" borderColor="gray.700" />
          {
            isLoading ? (
              <Flex justify="center">
                <Spinner/>
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários.</Text>
              </Flex>
            ) : (
              <>
                <VStack spacing="8">
                  {
                    itemList.map(item => (
                      <SimpleGrid key={item.reference} minChildWidth="240px" spacing={["6", "8"]} w="100%">
                        <FormItem
                          registerRef={data => handleRegisterRef(data)} 
                          registerName={data => handleRegisterName(data)}
                          registerQt={data => handleRegisterQt(data)} 
                        />
                        <Link href="#" passHref>
                          <Button as="a"
                            size="md"
                            mt="8"
                            width="10"
                            colorScheme="pink"
                            onClick={handleAddItem}
                          >
                            <Icon as={RiAddLine} fontSize="20"/></Button>
                        </Link>                                                          
                      </SimpleGrid>
                    ))
                  }

                  </VStack>
                  <Flex mt="8" justify="flex-end"  width="25%">
                    <FormControl id="artesão" >
                      <FormLabel>Artesão</FormLabel>
                      
                      <Select placeholder="Escolha Artesão">
                      { 
                        userData.map(user => user.cargo == 'artesao' && <option key={user.id}>{user.name}</option>) 
                      }
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
                        type="button"
                        colorScheme="pink"
                        isLoading={formState.isSubmitting}
                        onClick={handleSave}
                      >
                        Envio
                      </Button>
                    </HStack>
                  </Flex>
              </>
            )
          }          
        </Box> 
      </Flex>
    </Box>
  );
}