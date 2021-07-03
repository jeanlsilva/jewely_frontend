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

type CreatePecasFormData = {
  name: string;
  materialRef: Number;
  quantidade: Number;
};

const createPecasFormSchema = yup.object().shape({
  name: yup.string().required("Nome Obrigatório"),
  email: yup.string().required("Email Obrigatório").email("Email Inválido"),
  password: yup
    .string()
    .required("Senha Obrigatório")
    .min(6, "No minimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreatePeca() {
  const router = useRouter()

  const createPecas = useMutation(async (peca: CreatePecasFormData) => {
    const response = await api.post("peças", {
      peca: {
        ...peca,
        created_at: new Date(),
      },
    });

    return response.data.peca;
  },{
    onSuccess: () => {
      queryClient.invalidateQueries('pecas')
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createPecasFormSchema),
  });

  const { errors } = formState;

  const handleCreatePeca: SubmitHandler<CreatePecasFormData> = async (
    values
  ) => {
   await createPecas.mutateAsync(values);
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
          onSubmit={handleSubmit(handleCreatePeca)}
        >
          <Heading size="lg" fontWeight="normal">
            Relatório de Peças
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
                  <NumberInput max={50} min={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
              </FormControl>
              <FormControl id="artesão">
                <FormLabel>Artesão</FormLabel>
                <Select placeholder="Escolha Artesão">
                  <option>Artesão 1</option>
                  <option>Artesão 2</option>
                </Select>
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
                Criar Peça
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}