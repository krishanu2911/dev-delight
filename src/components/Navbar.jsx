import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Link,
    useColorModeValue,
    useDisclosure,
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
  } from '@chakra-ui/icons';
  import herogif from "../assets/hero.gif"
  
  export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Box zIndex={9} position={"fixed"} left={0} right={0}>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems={{base: "center"}}>
            <Link href='/'>
            <Flex justifyContent={"center"} alignItems={"center"} gap={"2"} >
            <img style={{
                height: "5rem",
                width: "5rem"
            }} src={herogif}  alt="Logo"/>  
            <Text>Dev Delight</Text>
            </Flex>
            </Link>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'xl'}
                  fontWeight={700}
                  color={linkColor}
                  borderRadius={"md"}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
          </Box>
        ))}
      </Stack>
    );
  };
  
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, href }) => {
  
    return (
      <Stack spacing={4}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
        </Flex>
  
      </Stack>
    );
  };
  
  
  const NAV_ITEMS  = [
    {
      label: 'Back Care',
      href: '/backcare'
    },
    {
      label: 'Eye Care',
      href: '/eyecare'
    },
    {
      label: 'Water Intake',
      href: '/waterintake',
    }
  ];