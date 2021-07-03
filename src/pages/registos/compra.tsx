import {Box, Flex, RadioGroup, Heading, Divider, VStack, SimpleGrid, Button, HStack, Radio, FormLabel, FormControl, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/react'
import React from 'react'
import {Header} from '../../components/Header'
import {Sidebar} from '../../components/Sidebar'
import {Input} from '../../components/Form/Input'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { api } from '../../services/apiClient'
import { useUsers } from '../../services/hooks/useUsers'
import { useRouter } from "next/dist/client/router";
import { useMaterias } from '../../services/hooks/useMaterias'

type CreateMateriaFormData = {
  name: string;
  quantity: number;
  reference: number;
}

const createMateriaFormSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  quantity: yup.number().required('Qunatidade Obrigatória'),
  reference: yup.number().required('Referência Obrigatória')
})

export default function CreateMateria(){
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createMateriaFormSchema)
  })

  const router = useRouter()

  const {data} = useMaterias();

  const { errors } = formState

  const handleCreateMateria: SubmitHandler<CreateMateriaFormData> = async (values) =>{
    await new Promise(resolve => setTimeout(resolve,2000));
    await api.post('materias', values)

    console.log(values);
    router.push('/materias')
  }

  

  return(
    <Box>
      <Header/>

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar/>

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6","8"]}
          onSubmit={handleSubmit(handleCreateMateria)}
        >
          <Heading size="lg" fontWeight="normal">Registar Compra</Heading>
          
          <Divider my="6" borderColor="gray.700"/>

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
              <Input name="reference" type="reference" label="Referência" error={errors.reference} {...register('reference')}/>
              <Input name="name" type="name" label="Nome da Matéria" error={errors.name} {...register('name')}/>
              <FormControl as="fieldset">
                <FormLabel>Quantidade (und/gr)</FormLabel>
                <NumberInput defaultValue={1} min={1} name="quantity" type="quantity" error={errors.quantity} {...register('quantity')} >
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
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit"colorScheme="pink" isLoading={formState.isSubmitting}>Guardar</Button>
            </HStack>

          </Flex>
        </Box>


      </Flex>
    </Box>
  );
}