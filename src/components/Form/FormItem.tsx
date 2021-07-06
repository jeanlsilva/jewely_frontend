import { Input } from './Input';
import {
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { isError } from 'react-query';
import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Item {
  reference: string;
  name?: string;
  quantity: number;
}

interface FormItemProps {
  registerRef: (data: string) => void;
  registerQt: (data: number) => void;
  registerName?: (data: string) => void;
}

const createShipmentFormSchema = yup.object().shape({
  reference: yup.string().required('Campo obrigatório')
})

export const FormItem = ({ registerRef, registerQt, registerName }: FormItemProps) => {
    const { formState, register } = useForm({
      resolver: yupResolver(createShipmentFormSchema)
    });
    const [quantity, setQuantity] = useState(1)

    const { errors } = formState;

    useEffect(() => {
      registerQt(quantity)
    }, [quantity])

    const handleChange = e => {
      setQuantity(e)
    }

    const increment = () => {
      setQuantity(quantity + 1)
    }

    const decrement = () => {
      setQuantity(quantity - 1)
    }
    return (
      <>
        <Input
          name="ref"
          label="Referência"
          {...register("ref")}
          onChange={e => registerRef(e.target.value)}
        />
        {
          registerName && (
            <Input
              name="name"
              label="Nome do Material"
              {...register("name")}
              onChange={e => registerName(e.target.value)}
            />
          ) 
        }
        <FormControl 
          id="quantidade" 
          label="Quantidade"
          error={errors.qtd}
          {...register("qtd")}
          onChange={e => {
            const target = e.target as HTMLInputElement
            handleChange(Number(target.value))
          }}
        >
          <FormLabel>Quantidade</FormLabel>
          <NumberInput defaultValue={quantity} min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper onClick={increment} />
              <NumberDecrementStepper onClick={decrement} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </>
    );
}