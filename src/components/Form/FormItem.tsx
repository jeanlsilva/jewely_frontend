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
import { ChangeEvent, ChangeEventHandler, FormEvent, MutableRefObject, Ref, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormItemProps {
  referenceRef: Ref<HTMLInputElement>
  quantityRef: Ref<HTMLInputElement>
  nameRef?: Ref<HTMLInputElement>
  registerRef: (data: string) => void
}

const createShipmentFormSchema = yup.object().shape({
  reference: yup.string().required('Campo obrigatório')
})

export const FormItem = ({ referenceRef, quantityRef, nameRef, registerRef }: FormItemProps) => {
    const { formState, register } = useForm({
      resolver: yupResolver(createShipmentFormSchema)
    });
    const [quantity, setQuantity] = useState(1)

    const { errors } = formState;

    const increment = () => {
      setQuantity(quantity + 1)
    }

    const decrement = () => {
      setQuantity(quantity - 1)
    }

    const handleRegisterRef = (e: ChangeEvent<HTMLInputElement>) => {
      registerRef(e.target.value)
    }
    
    return (
      <>
        <Input
          name="ref"
          label="Referência"
          {...register("ref")}
          ref = {referenceRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleRegisterRef(e)}
        />
        {
          nameRef && (
            <Input
              name="name"
              label="Nome do Material"
              {...register("name")}
              ref = {nameRef}
            />
          ) 
        }
        <FormControl 
          id="quantidade" 
          label="Quantidade"
          error={errors.qtd}
          {...register("qtd")}          
        >
          <FormLabel>Quantidade</FormLabel>
          <NumberInput defaultValue={quantity} min={1}>
            <NumberInputField ref = {quantityRef} />
            <NumberInputStepper>
              <NumberIncrementStepper onClick={increment} />
              <NumberDecrementStepper onClick={decrement} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </>
    );
}