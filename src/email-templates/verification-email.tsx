import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailTemplateProps {
  otp: string;
  baseUrl?: string;
}

const defaultBaseUrl = process.env.VERCEL_URL
  ? `https://blockfirst.io`
  : '';

const VerificationEmailTemplate = ({
  otp,
  baseUrl = defaultBaseUrl,
}: VerificationEmailTemplateProps) => {
  const otpDigits = otp.split('');

  const logoUrl = `${baseUrl}/email/logo.svg`;
  const keyIconUrl = `${baseUrl}/email/key-icon.svg`;
  const copyIconUrl = `${baseUrl}/email/copy-asset.svg`;
  const telegramIconUrl = `${baseUrl}/email/telegram-icon.svg`;
  const youtubeIconUrl = `${baseUrl}/email/youtube-icon.svg`;
  const mediumIconUrl = `${baseUrl}/email/medium-icon.svg`;
  const twitterIconUrl = `${baseUrl}/email/twitter-icon.svg`;
  const topCoverUrl = `${baseUrl}/email/top-cover.png`;

  return (
    <Html>
      <Head />
      <Preview>Подтвердите ваш E-Mail</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                'brand-dark': '#01050D',
                'brand-light': '#F2F2F2',
                'brand-secondary': '#9AA6B5',
                'brand-blue': '#1859F4',
                'brand-blue-light': 'rgba(24, 89, 244, 0.1)',
                'brand-border': '#282D33',
              },
              fontFamily: {
                sans: ['Inter', 'sans-serif'],
              },
            },
          },
        }}
      >
        <Body className="bg-brand-dark text-brand-light mx-auto my-auto font-sans">
          <Container className={`mx-auto py-[40px] max-w-[600px] p-[20px] bg-[url(${topCoverUrl})] bg-no-repeat bg-top-left bg-contain`}>
            <Section className="pt-[32px] text-center">
              <Img
                src={logoUrl}
                width="140"
                height="40"
                alt="BlockFirst Logo"
                className="mx-auto my-0"
              />
            </Section>

            <Section className="px-[40px] py-[40px]">
              <Heading className="text-brand-light mx-0 my-[30px] p-0 text-center text-[28px] font-bold">
                Подтвердите ваш E-Mail
              </Heading>
              <Text className="text-brand-secondary text-center text-[14px] leading-[24px]">
                Благодарим вас за регистрацию на платформе BlockFirst. Прежде
                чем вы сможете завершить процесс, нам необходимо подтвердить
                правильность указанного вами адреса.
              </Text>

              <Section className="mt-[24px] mb-[32px] text-center">
                <div className="inline-block">
                  <Row className="mb-[8px] align-middle">
                    <Column className="pr-[8px] align-middle">
                      <Img
                        src={keyIconUrl}
                        width="14"
                        height="14"
                        alt="Key Icon"
                      />
                    </Column>
                    <Column className="align-middle">
                      <Text className="text-brand-secondary/50 text-center text-[12px]">
                        Ваш 5-ти значный код
                      </Text>
                    </Column>
                  </Row>
                </div>

                <Row>
                  {otpDigits.map((digit, index) => (
                    <Column key={index} className="px-[6px] text-center">
                      <Section className="border-brand-light/80 mx-auto border-b border-solid pt-[18px] pb-[18px]">
                        <Text className="text-brand-light m-0 text-[24px] font-semibold">
                          {digit}
                        </Text>
                      </Section>
                    </Column>
                  ))}
                </Row>
              </Section>

              <Text className="text-brand-secondary/50 text-center text-[12px]">
                Не регистрировались у нас? Пожалуйста, проигнорируйте это
                письмо.
              </Text>
            </Section>

            <Hr className="mx-0 my-[26px] w-full" style={{ borderColor: '#282D33', borderTop: "1px solid #282D33" }} />

            <Section className="text-center">
              <div className="inline-block">
                <Row className="mb-[16px]">
                  <Column className="px-[16px]">
                    <Link href="https://t.me/blockfirst">
                      <Img
                        src={telegramIconUrl}
                        width="40"
                        height="40"
                        alt="Telegram"
                      />
                    </Link>
                  </Column>
                  <Column className="px-[16px]">
                    <Link href="https://youtube.com/blockfirst">
                      <Img
                        src={youtubeIconUrl}
                        width="40"
                        height="40"
                        alt="YouTube"
                      />
                    </Link>
                  </Column>
                  <Column className="px-[16px]">
                    <Link href="https://medium.com/blockfirst">
                      <Img
                        src={mediumIconUrl}
                        width="40"
                        height="40"
                        alt="Medium"
                      />
                    </Link>
                  </Column>
                  <Column className="px-[16px]">
                    <Link href="https://twitter.com/blockfirst">
                      <Img
                        src={twitterIconUrl}
                        width="40"
                        height="40"
                        alt="Twitter"
                      />
                    </Link>
                  </Column>
                </Row>
              </div>

              <Text className="text-brand-secondary text-[12px]">
                Официальный сайт платформы —{' '}
                <Link
                  href="https://blockfirst.io"
                  className="text-brand-light underline"
                >
                  blockfirst.io
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerificationEmailTemplate.PreviewProps = {
  otp: '21392',
  baseUrl: 'http://localhost:3000',
} as VerificationEmailTemplateProps;

export default VerificationEmailTemplate;
