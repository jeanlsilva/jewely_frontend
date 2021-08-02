import { Box, Button, Divider, Flex, Spacer, Heading, HStack, Icon, Link, VStack, SimpleGrid, GridItem, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, FormLabel, Select } from "@chakra-ui/react";
import React, { FormEvent } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";

export default function Shipment() {
    const [userData, setUserData] = useState([]);

    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            items: [{referenceNumber: '', amount: 0}]
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
                    <Heading size="lg" fontWeight="normal">Registrar Envo</Heading>                

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
                                        <Link href="#" passhref>
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
                                        <Link href="#" passhref>
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