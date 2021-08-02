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
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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
import { FiMinus, FiPlus } from "react-icons/fi";

type CreateShipmentFormData = {
  reference: string;
  quantity: number;
}

interface Item {
  reference: string;
  name: string;
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

export default function Waste(){
  const [userData, setUserData] = useState([]);

    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            items: [{referenceNumber: '', materialName: '', amount: 0}]
        }
    });
    const { fields, append, remove, insert } = useFieldArray({
        control,
        name: 'items'
    });
    const { data } = useUsers();

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data]);
    
    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(data => console.log(data.items))}> 
                    <Heading size="lg" fontWeight="normal">Registrar Desperdício</Heading>                

                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing={8}>
                        {fields.map((item, index) => {
                            return (
                                <Flex key={item.id} w="100%">
                                    <Flex flex="10">
                                        <Input 
                                            label='Número de referência' 
                                            w="90%"
                                            {...register(`items.${index}.referenceNumber`)}
                                            focusBorderColor="white"
                                        />
                                        <Input 
                                            label='Nome do material' 
                                            w="90%"
                                            {...register(`items.${index}.materialName`)}
                                            focusBorderColor="white"
                                        />
                                        <FormControl label="Quantidade">
                                            <FormLabel>Quantidade</FormLabel>
                                            <NumberInput w="90%">
                                                <NumberInputField {...register(`items.${index}.amount`)} />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                    </Flex>
                                    <Flex flex="2" justify="space-between">
                                        <Link href="#" passHref>
                                            <Button
                                                as="a" 
                                                size="md" 
                                                mt="8" 
                                                width="10" 
                                                colorScheme="pink" 
                                                onClick={() => append({referenceNumber: '', materialName: '', amount: 0})}
                                            >
                                                <Icon as={FiPlus} fontSize="20" />
                                            </Button>
                                        </Link>
                                        <Link href="#" passHref>
                                            <Button
                                                as="a" 
                                                size="md" 
                                                mt="8" 
                                                width="10" 
                                                colorScheme="pink" 
                                                onClick={() => remove(index)}
                                            >
                                                <Icon as={FiMinus} fontSize="20" />
                                            </Button>
                                        </Link>
                                    </Flex>
                                </Flex>
                            );
                        })}
                    </VStack>
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