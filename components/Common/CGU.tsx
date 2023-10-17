import { Text, StyleSheet } from "react-native";

export const CGU = () => {
  return (
    <>
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab aspernatur
        quas commodi voluptatum! Voluptatem distinctio eveniet eius numquam est
        labore temporibus, expedita quo assumenda culpa!
      </Text>
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quae
        doloremque vero illo explicabo animi velit dicta hic officia rem.
      </Text>
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ipsa,
        quae quidem error voluptatibus ad necessitatibus corrupti dolores
        accusamus recusandae sequi, amet cum quasi iusto soluta excepturi dicta
        ipsam illum ea ipsum esse velit adipisci magnam!
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 14,
    marginBottom: 20,
    paddingHorizontal: 8,
    textAlign: "justify",
  },
});
