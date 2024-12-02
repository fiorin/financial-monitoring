import { Box, Card, Flex, Stack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { IoIosPause } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";
import { Status } from "../status";

interface TransactionsListenerProps {
  onClick: (newState: boolean) => void;
}

const TransactionsListener = ({ onClick }: TransactionsListenerProps) => {
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    onClick(!active);
    setActive(!active);
    setTimeout(() => {
      setLoading(false);
    }, 180);
  };

  return (
    <Box mb="1em">
      <Flex direction={"row"} align="center" gap={"1em"}>
        <Tooltip
          content={
            active
              ? "Pause transaction incoming"
              : "Resume transaction incoming"
          }
        >
          <Button
            onClick={handleButtonClick}
            p={4}
            colorPalette={active ? "black" : "blue"}
            loading={loading}
            width={"120px"}
          >
            {active ? (
              <>
                Pause
                <IoIosPause />
              </>
            ) : (
              <>
                Resume <IoIosPlay />
              </>
            )}
          </Button>
        </Tooltip>
        <Card.Root>
          <Card.Body p={"8px"}>
            <Stack direction={"row"} align="center">
              <Text fontSize={"14px"} lineHeight={"24px"}>
                Connection Status:
              </Text>{" "}
              {active ? (
                <Status value="success">
                  <Text fontWeight={"bold"}>Active</Text>
                </Status>
              ) : (
                <Status value="warning">
                  <Text fontWeight={"bold"}>Paused</Text>
                </Status>
              )}
            </Stack>
          </Card.Body>
        </Card.Root>
      </Flex>
    </Box>
  );
};

export default TransactionsListener;
