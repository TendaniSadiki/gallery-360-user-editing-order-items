import { Link, Stack, usePathname } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';


export default function NotFoundScreen() {
  const pathname = usePathname()
  console.log({ pathname });
  
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text style={{ color: 'white' }}>Hi there bafo, are you lost?</Text>
        <Link href={'/(app)/(home)/market'} asChild>
          <Text style={{ color: 'white', paddingVertical: 20 }}>Go to market</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
