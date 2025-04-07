import React from "react";
import { Group, Anchor, Text } from "@mantine/core";
import IconGithub from "../../assets/icons/IconGithub";
import IconEmail from "../../assets/icons/IconEmail";
import IconPortfolio from "../../assets/icons/IconPortfolio";
import IconContact from "../../assets/icons/IconContact";
import IconLinkedIn from "../../assets/icons/IconLinkedIn";

const Footer: React.FC = () => {
  return (
    <Group justify="left" align="center" m={5}>
      <Text> Connect with me: </Text>
      <Anchor href="https://github.com/MaGu1997" target="_blank" title="GitHub">
        <IconGithub />
      </Anchor>
      <Anchor
        href="mailto:manyagurbani01@gmail.com"
        target="_blank"
        title="Email"
      >
        <IconEmail />
      </Anchor>
      <Anchor
        href="https://magu1997.github.io/"
        target="_blank"
        title="Portfolio"
      >
        <IconPortfolio />
      </Anchor>
      <Anchor href="tel:+33755209373" target="_blank" title="Phone">
        <IconContact />
      </Anchor>
      <Anchor
        href="https://www.linkedin.com/in/gurbanimanish/"
        target="_blank"
        title="LinkedIn"
      >
        <IconLinkedIn />
      </Anchor>
    </Group>
  );
};

export default Footer;
