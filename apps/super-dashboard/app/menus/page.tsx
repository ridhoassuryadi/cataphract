'use client'

import { useState } from 'react'
import {
  Icon
} from "@/components/ui/icon";

import { ScrollView } from "@/components/ui/scroll-view";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";


import { Search, ShoppingCart, User, History, Settings, Plus, Minus } from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  price: number
  image: string
  description: string
  quantity: number
}

export default function Component() {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([])
  const [menuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: 'Crispy Dory',
      price: 50.50,
      image: '/placeholder.svg?height=80&width=80',
      description: 'Served with tartar sauce',
      quantity: 0
    },
    {
      id: 2,
      name: 'Kopag Benedict',
      price: 75.50,
      image: '/placeholder.svg?height=80&width=80',
      description: 'House special eggs benedict',
      quantity: 0
    },
    {
      id: 3,
      name: 'Spicy Tuna Nachos',
      price: 42.50,
      image: '/placeholder.svg?height=80&width=80',
      description: 'Crispy nachos with spicy tuna',
      quantity: 0
    },
    {
      id: 4,
      name: 'Banana Wrap',
      price: 35.00,
      image: '/placeholder.svg?height=80&width=80',
      description: 'Sweet banana wrapped in crispy dough',
      quantity: 0
    },
  ])

  const addToOrder = (item: MenuItem) => {
    const existingItem = selectedItems.find(i => i.id === item.id)
    if (existingItem) {
      setSelectedItems(selectedItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ))
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromOrder = (item: MenuItem) => {
    const existingItem = selectedItems.find(i => i.id === item.id)
    if (existingItem && existingItem.quantity > 1) {
      setSelectedItems(selectedItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      ))
    } else {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id))
    }
  }

  return (
    <Box flex={1} bg="$backgroundLight100">
      <HStack space="md" p="$4" bg="$primary500" alignItems="center">
        <Heading size="xl" color="$textLight0">Kopag</Heading>
        <HStack space="xl" ml="auto">
          <Button variant="link">
            <ButtonText color="$textLight0">Dashboard</ButtonText>
          </Button>
          <Button variant="link">
            <ButtonText color="$textLight0">Order List</ButtonText>
          </Button>
          <Button variant="link">
            <ButtonText color="$textLight0">History</ButtonText>
          </Button>
          <Button variant="link">
            <ButtonText color="$textLight0">Bills</ButtonText>
          </Button>
        </HStack>
        <Icon as={User} size="md" color="$textLight0" />
      </HStack>

      <HStack flex={1} space="md" p="$4">
        <VStack flex={2} space="md">
          <HStack space="md" alignItems="center">
            <Input flex={1} size="md" variant="outline" borderColor="$borderLight300">
              <InputField placeholder="Search menu..." />
            </Input>
            <Button variant="solid" action="primary" borderRadius="$full">
              <ButtonText>Add Note</ButtonText>
            </Button>
          </HStack>

          <ScrollView>
            <VStack space="md">
              {menuItems.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => addToOrder(item)}
                  bg="$backgroundLight0"
                  p="$4"
                  borderRadius="$lg"
                  borderWidth={1}
                  borderColor="$borderLight200"
                  shadowColor="$shadowLight100"
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={0.1}
                  shadowRadius={4}
                >
                  <HStack space="md" alignItems="center">
                    <Image
                      source={{ uri: item.image }}
                      alt={item.name}
                      size="lg"
                      borderRadius="$md"
                    />
                    <VStack flex={1} space="xs">
                      <Text size="lg" fontWeight="$bold">{item.name}</Text>
                      <Text size="sm" color="$textLight500">{item.description}</Text>
                      <Text size="lg" fontWeight="$bold" color="$primary500">${item.price.toFixed(2)}</Text>
                    </VStack>
                    <Badge size="md" variant="solid" action="success" borderRadius="$full">
                      <BadgeText>Add</BadgeText>
                    </Badge>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
        </VStack>

        <VStack flex={1} space="md" bg="$backgroundLight0" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
          <Heading size="lg" color="$textLight900">Order Details</Heading>
          <Input size="md" variant="outline" borderColor="$borderLight300">
            <InputField placeholder="Customer name..." />
          </Input>

          <ScrollView flex={1}>
            <VStack space="md" divider={<Divider />}>
              {selectedItems.map((item) => (
                <HStack key={item.id} space="md" justifyContent="space-between" alignItems="center">
                  <VStack flex={1}>
                    <Text fontWeight="$bold">{item.name}</Text>
                    <Text size="sm" color="$textLight500">${item.price.toFixed(2)} each</Text>
                  </VStack>
                  <HStack space="sm" alignItems="center">
                    <Button size="sm" variant="outline" onPress={() => removeFromOrder(item)}>
                      <Icon as={Minus} size="sm" />
                    </Button>
                    <Text>{item.quantity}</Text>
                    <Button size="sm" variant="outline" onPress={() => addToOrder(item)}>
                      <Icon as={Plus} size="sm" />
                    </Button>
                  </HStack>
                  <Text fontWeight="$bold">${(item.price * item.quantity).toFixed(2)}</Text>
                </HStack>
              ))}
            </VStack>
          </ScrollView>

          <VStack space="sm" borderTopWidth={1} borderColor="$borderLight200" pt="$4">
            <HStack justifyContent="space-between">
              <Text fontWeight="$bold">Subtotal</Text>
              <Text fontWeight="$bold">
                ${selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
              </Text>
            </HStack>
            <Button size="lg" action="primary" borderRadius="$full">
              <ButtonText>Process Transaction</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </HStack>
    </Box>
  )
}