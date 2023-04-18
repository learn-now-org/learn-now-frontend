import React from "react";
import { Box, Divider, FlatList, HStack, Heading, Icon, Input, VStack } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Pressable } from "react-native";

export default function SearchBar() {
    const [searchText, setSearchText] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [noSearchResults, setNoSearchResults] = React.useState(false);

    const getSearchResultsOnSubmit = () => {
        axios.get(`http://localhost:5000/classes/search?query=${searchText}&limit=10`)
        .then((res) => {
            setSearchResults(res.data);
            if (res.data.length === 0) {
                setNoSearchResults(true);
            } else {
                setNoSearchResults(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    React.useEffect(() => {
        if (searchText.length > 0) {
            getSearchResultsOnSubmit();
        } 
    }, [searchText]);

    return (
        <VStack
        my="4"
        space={5}
        w="100%"
        maxW="95%"
        style={{
            // Put to the top of the screen.
            position: "absolute",
            top: 0,
        }}
        >
        <Heading size="lg">Search Classes</Heading>
        <VStack w="100%" space={5} alignSelf="center">
            <Input
            placeholder="Search Classes (by class name)"
            width="100%"
            borderRadius="10"
            py="5"
            px="1"
            fontSize="14"
            value={searchText}
            onChangeText={setSearchText}
            InputLeftElement={
                <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
                />
            }
            />
        </VStack>
        {/* Display the search results as formatted boxes. Use a FlatList for better performance and show only 5 results at a time. */}
        {/* If searchResults is empty, show a message. */}
        {noSearchResults && searchText.length > 0 && (
            <Box
            px="1"
            py="2"
            w="100%"
            bg="white"
            shadow={1}
            _dark={{
                bg: "gray.700",
            }}
            marginBottom="2"
            >
            <HStack space={3} alignItems="center">
                <Icon
                size="6"
                color="gray.400"
                as={<Ionicons name="alert-circle-outline" />}
                />
                <VStack space={1} w="100%">
                <Heading size="xs">No Results</Heading>
                <Heading size="xs" color="gray.500">
                    No results found. Try searching for something else.
                </Heading>
                </VStack>
            </HStack>
            </Box>
        )}
        {searchResults.length > 0 && (
            <FlatList
            data={searchResults}
            renderItem={({ item }) => (
            <Box
                px="1"
                py="2"
                w="100%"
                bg="white"
                shadow={1}
                _dark={{
                bg: "gray.700",
                }}
                marginBottom="2"
            >
                <Pressable
                    onPress={() => {
                        console.log("Pressed the class name: " + item.name);
                    }}
                >
                <HStack space={3} alignItems="center">
                <Icon
                    size="6"
                    color="gray.400"
                    as={<Ionicons name="school" />}
                />
                <VStack space={1} w="100%">
                    <Heading size="xs">{item.name}</Heading>
                    <Heading size="xs" color="gray.500">
                    {item.number} ({item.section})
                    </Heading>
                </VStack>
                </HStack>
                </Pressable>
            </Box>
            )}
            keyExtractor={(item) => item._id}
            style={{
            width: "100%",
            // Make sure the height of the FlatList is not too big.
            maxHeight: 300,
            }}
        />
        )}
        </VStack>
        
    );
}




        