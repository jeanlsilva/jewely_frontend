import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
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
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import Link from "next/link";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function CreateReceipt(){
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
        items: [{referenceNumber: '', amount: 0}]
    },
});
const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'items'
});

return (
    <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
            <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(data => console.log(data.items))}> 
                <Heading size="lg" fontWeight="normal">Registrar Recebimento</Heading>                

                <Divider my="6" borderColor="gray.700" />
                <VStack spacing={8}>
                    {fields.map((item, index) => {
                        return (
                            <Flex key={item.id} w="100%">
                              <Flex flex="10">
                                  <Input label='Número de referência' {...register(`items.${index}.referenceNumber`)} w="90%" />
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
                                          onClick={() => append({referenceNumber: '', amount: 0})}
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