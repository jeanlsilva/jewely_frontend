import { Flex, Button, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";
import Router from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type SignInFormData = {
  email: string;
  password: string;
};

const SignInSchema = yup.object().shape({
  email: yup.string().required("Email Obrigatório").email("Email Inválido"),
  password: yup.string().required("Senha Obrigatório"),
});

export default function SignIn() {

  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await signIn(values);
  };
  return (
    <Stack direction={["column", "row"]} w="100vw" h="100vh" align="center" justifyContent="center">
        <Text
          fontSize={["6xl", "8xl"]}
          fontWeight="bold"
          letterSpacing="tight"
          mt={['100', '0']}
          ml={['0', '50']}
        >
          Jewel
          <Text as="span" color="pink.500">
            y
          </Text>
        </Text>

    <Flex w="50vw" h="50vh" align="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
          // onClick={() => Router.push('/dashboard')}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  </Stack>
  );
}
