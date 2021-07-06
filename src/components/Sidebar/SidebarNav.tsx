import  { Box, Stack, Text, Link, Icon, Button } from '@chakra-ui/react'
import { RiArticleLine, RiContactsLine, RiDashboardLine, RiDraftLine, RiFridgeLine, RiFundsBoxLine, RiGitMergeLine, RiInputMethodLine, RiSendPlane2Line } from 'react-icons/ri'
import { NavSection } from './NavSection'
import { NavLink } from './NavLink'
import { AuthContext, signOut } from '../../contexts/AuthContext'
import { useContext } from 'react'

export function SidebarNav(){
  const {signOut} = useContext(AuthContext);

  return(
    <Stack spacing="12" align="flex-start">
      {/* <Can roles={['administrator']}> */}
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
      </NavSection>
      {/* </Can> */}
      {/* <Can roles={['artesao']}> */}
      {/* <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
      </NavSection> */}
      {/* </Can>
       <Can roles={['administrator']}> */}
      <NavSection title="ARMAZEM PRINCIPAL">
        <NavLink icon={RiFundsBoxLine} href="/materias">Stock Matérias</NavLink>
        <NavLink icon={RiFridgeLine} href="/joias">Stock Joias</NavLink>
      </NavSection>
      <NavSection title="REGISTOS">
        <NavLink icon={RiDraftLine} href="/registos/compra">Registar Compra</NavLink>
        <NavLink icon={RiArticleLine} href="/registos/vendas">Registar Venda</NavLink>
        <NavLink icon={RiSendPlane2Line} href="/registos/shipment">Registar Envio</NavLink>
      </NavSection>
      {/* </Can>
      <Can roles={['artesao']}> */}
      <NavSection title="REGISTOS">
        <NavLink icon={RiSendPlane2Line} href="/registos/receipt">Registar Recebimento</NavLink>
        <NavLink icon={RiSendPlane2Line} href="/registos/waste">Registar Desperdicio</NavLink>
      </NavSection>
      {/* </Can> */}
      <NavSection title="ARTESÂO X">
        <NavLink icon={RiInputMethodLine} href="/materias">Stock Matérias</NavLink>
        <NavLink icon={RiGitMergeLine} href="/joias">Stock Joias</NavLink>
      </NavSection>
      <Button fontWeight="bold" color="gray.900" fontSize="small"
       onClick={signOut}
      >SAIR</Button>
        </Stack>
  )
}