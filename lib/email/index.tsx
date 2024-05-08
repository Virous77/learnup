import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface LearnUpEmailProps {
  password: string;
  type: string;
}

export const LearnUpEmail = ({ password, type }: LearnUpEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Text
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#f97316" }}
          >
            Learnup
          </Text>
        </Section>
        <Heading style={h1}>Your Temporary Password</Heading>
        <Text
          style={{ fontSize: "20px", lineHeight: "24px", marginBottom: "20px" }}
        >
          We glad to have you on board! We&apos;re excited to help you get
        </Text>
        <Text style={heroText}>
          You just registered on Learnup using {type}. We created a temporary
          password for you. With this password you can login and update your
          password.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{password}</Text>
        </Section>

        <Text style={text}>
          If you didn&apos;t created an account on Learnup, please ignore this
          email.
        </Text>

        <Section>
          <Text
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#f97316" }}
          >
            Learnup
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default LearnUpEmail;

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "16px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
