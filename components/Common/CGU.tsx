import { Text, StyleSheet } from "react-native";

export const CGU = () => {
  return (
    <>
      <Text style={styles.paragraph}>
        Les présentes conditions générales d’utilisation (ci-après dénommées «
        Conditions Générales ») sont conclues entre : La société "AgroLeague"
        (ci-après dénommée "La Société") et "Julien Grangé-Guermente" (ci-après
        dénommé "Le futur Agrobuddy")
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quae
        doloremque vero illo explicabo animi velit dicta hic officia rem.
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quae
        doloremque vero illo explicabo animi velit dicta hic officia rem.
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 14,
    marginBottom: 20,
  },
});
