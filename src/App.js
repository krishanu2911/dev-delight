import "./App.css";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import { TrainModel } from "./components/TrainModel";
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="App">
      <Button onClick={onOpen} colorScheme="teal" size="md">
        Train Model
      </Button>
      <Modal colorScheme="teal" size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Text fontSize="2xl" as="b">Let's Train the Modal with you customized Data Input</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TrainModel />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
