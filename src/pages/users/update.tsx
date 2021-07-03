import {Box, Flex, RadioGroup, Heading, Divider, VStack, SimpleGrid, Button, HStack, Radio, FormLabel, FormControl} from '@chakra-ui/react'
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
import { handleEditUser } from './index'

type UpdateUserFormData = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  cargo: string;
}
type Edit ={
  id: string;
}

const updateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  email: yup.string().required('Email Obrigatório').email('Email Inválido'),
  password: yup.string().required('Senha Obrigatório').min(6, 'No minimo 6 caracteres'),
  avatar: yup.string(),
  cargo: yup.string().required('Cargo Necessário')
})

export default function UpdateUser(){ 
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateUserFormSchema)
  })
  const idUser = handleEditUser;

  const {data} = useUsers();
  const { errors } = formState

  const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (values) =>{
    await new Promise(resolve => setTimeout(resolve,2000));
    await api.put('users', values)

    console.log(values);
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
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          {data.map(user =>{
          <Heading size="lg" fontWeight="normal">Editar Usuário {user.name}</Heading>
          })}
          <Divider my="6" borderColor="gray.700"/>

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
              <Input name="name" type="name" label="Nome Completo" error={errors.name} {...register('name')}/>
              <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')}/>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
              <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
              <Input name="avatar" type="avatar" label="Avatar" error={errors.avatar} {...register('avatar')} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
              <FormControl as="fieldset">
                <FormLabel as="legend">Cargos</FormLabel>
                  <RadioGroup defaultValue="Artesao">
                    <HStack spacing="24px">
                      <Radio name="cargo" value="Administrador" type="cargo" error={errors.cargo} {...register('cargo')} >Administrador</Radio>
                      <Radio name="cargo" value="Artesao"type="cargo" error={errors.cargo} {...register('cargo')} >Artesão</Radio>
                    </HStack>
                  </RadioGroup>
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