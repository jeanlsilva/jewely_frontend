
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

type DesperdicioFormData = {
  ref: Number;
  nome: string;
  quantidade: string;
};

const desperdicioFormSchema = yup.object().shape({
  ref: yup.number().required('Referência Obrigatória'),
  nome: yup.string().required("Nome Obrigatório"),
  quantidade: yup.number().required("Quantidade Obrigatória"),
});

export default function Desperdicio() {
  const router = useRouter()

  const desperdicio = useMutation(async (desperdicio: DesperdicioFormData) => {
    const response = await api.post("desperdicio", {
      desperdicio: {
        ...desperdicio,
        created_at: new Date(),
      },
    });

    return response.data.desperdicio;
  },{
    onSuccess: () => {
      queryClient.invalidateQueries('desperdicios')
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(desperdicioFormSchema),
  });

  const { errors } = formState;

  const handleDesperdicio: SubmitHandler<DesperdicioFormData> = async (
    values
  ) => {
   await desperdicio.mutateAsync(values);
  };

  

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
          onSubmit={handleSubmit(handleDesperdicio)}
        >
          <Heading size="lg" fontWeight="normal">
            Registar Desperdicio
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
              <Input
                name="nome"
                label="Nome do Material"
                error={errors.nome}
                {...register("nome")}
              />
              <FormControl>
                  <FormLabel>Quantidade</FormLabel>
                  <NumberInput max={50} min={1}
                    id="quantidade" 
                    label="Quantidade"
                    error={errors.quantidade}
                    {...register("quantidade")}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
              </FormControl>

              
            </SimpleGrid>
            
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/dashboard" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Registar Desperdicio
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}