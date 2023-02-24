import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
} from "@chakra-ui/react";
const Home = ({
  waterIntakeFeature,
  setWaterIntakeFeature,
  eyecareFeature,
  setEyecareFeature,
  backcareFeature,
  setBackcareFeature,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      <Card maxWidth={"35rem"} padding={"2rem"}>
        <CardHeader>
          <Heading size="lg">Enabled Features</Heading>
        </CardHeader>
        <CardBody>
          <Flex flexDirection={"column"} gap={"1rem"}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={"5rem"}
            >
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Back Care
              </Text>
              <Button onClick={() => setBackcareFeature((prev) => !prev)} colorScheme={"purple"}>
                {backcareFeature ? "Enabled" : "Not Enabled"}
              </Button>
            </Flex>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Eye Care
              </Text>
              <Button onClick={() => setEyecareFeature((prev) => !prev)} colorScheme={"purple"}>
                {eyecareFeature ? "Enabled" : "Not Enabled"}
              </Button>
            </Flex>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Water Intake
              </Text>
              <Button
                onClick={() => setWaterIntakeFeature((prev) => !prev)}
                colorScheme={"purple"}
              >
                {waterIntakeFeature ? "Enabled" : "Not Enabled"}
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </div>
  );
};

export { Home };
