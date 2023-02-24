import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";
import { TrainModel } from "../components/TrainModel";
import HowItWork from "../components/HowItWork";
import { notifySitStraight } from "../utils/notification";
export const BackCare = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <HowItWork />
      <Flex
        gap={"2rem"}
        flexBasis={1}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={"2rem"}
        paddingBottom={"5rem"}
      >
        <Text onClick={() => notifySitStraight()} fontSize={"5xl"} fontWeight={"bold"}>
          Let's Train the model !!
        </Text>
        <Button onClick={onOpen} colorScheme="teal" size="lg">
          Train Model
        </Button>
      </Flex>

      <Modal colorScheme="teal" size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl" as="b">
              Let's Train the Modal with you customized Data Input
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TrainModel />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
