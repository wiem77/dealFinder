import React from 'react';
import { Box, IconButton, HStack, Icon, Text } from 'native-base';
import {
  MaterialIcons,
  MaterialCommunityIcons,
} from 'react-native-vector-icons';

const CustomStagger = ({ items }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderItems = () => {
    return items.map((item, index) => (
      <HStack key={index} alignItems="center">
        <IconButton
          variant="solid"
          bg={item.color}
          colorScheme={item.color}
          borderRadius="full"
          icon={
            <Icon
              as={item.iconFamily}
              size="6"
              name={item.iconName}
              _dark={{ color: 'warmGray.50' }}
              color="warmGray.50"
            />
          }
        />
        <Text>{item.label}</Text>
      </HStack>
    ));
  };

  return (
    <Box>
      <Box alignItems="center">
        <Box
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
        >
          {renderItems()}
        </Box>
      </Box>
      <HStack justifyContent="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={toggleOpen}
          bg="cyan.400"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name="dots-horizontal"
              color="warmGray.50"
              _dark={{ color: 'warmGray.50' }}
            />
          }
        />
      </HStack>
    </Box>
  );
};

export default CustomStagger;
