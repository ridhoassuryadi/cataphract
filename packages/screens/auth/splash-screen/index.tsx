import { VStack } from "@/bungas/ui/vstack";
import { Button, ButtonText } from "@/bungas/ui/button";
import { Icon } from "@/bungas/ui/icon";
import {
  GluestackIcon,
  GluestackIconDark,
} from "./assets/icons/gluestack-icon";
import useRouter from "@unitools/router";
import { AuthLayout } from "../layout";
import { useColorScheme } from "nativewind";

const SplashScreenWithLeftBackground = () => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  return (
    <VStack
      className="w-full max-w-[440px] items-center h-full justify-center"
      space="lg"
    >
      {colorScheme === "dark" ? (
        <Icon as={GluestackIconDark} className="w-[219px] h-10" />
      ) : (
        <Icon as={GluestackIcon} className="w-[219px] h-10" />
      )}
      <VStack className="w-full" space="lg">
        <Button
          className="w-full"
          onPress={() => {
            router.push("/auth/signin");
          }}
        >
          <ButtonText className="font-medium">Log in</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.push("/auth/signup");
          }}
        >
          <ButtonText className="font-medium">Sign Up</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export const SplashScreen = () => {
  return (
    <AuthLayout>
      <SplashScreenWithLeftBackground />
    </AuthLayout>
  );
};
