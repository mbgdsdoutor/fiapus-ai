import { Box, Flex, Image, Text } from '@mantine/core';

import FiapusHappy from '@/assets/fiapus-happy.png';
import FiapusNeutral from '@/assets/fiapus-neutral.png';
import FiapusSad from '@/assets/fiapus-sad.png';
import { FiapusStatusEnum } from '@/modules/report/report.types';

import classes from './fiapus-speech-bubble.module.css';

type FiapusSpeechBubbleProps = {
  status: FiapusStatusEnum;
  bubbleBg?: string;
  text?: string;
  helperText?: string;
};

type SpeechBubbleProps = {
  text: string;
  subText?: string;
  image: string;
};

const speechBubblePropsByStep: {
  [key in FiapusStatusEnum]: SpeechBubbleProps;
} = {
  HAPPY_INITIAL: {
    text: 'Olá, eu sou o Fiapus! 🥭',
    subText:
      'Para começar, selecione o tipo de diagrama a ser analisado e faça o upload da imagem.',
    image: FiapusHappy,
  },
  HAPPY_PRE_UPLOAD: {
    text: 'Confira se está tudo correto e clique em enviar.',
    image: FiapusHappy,
  },
  HAPPY_RESULT: {
    text: 'Aqui está o seu resultado!',
    subText: 'Parabéns! Seu diagrama possui pouco ou nenhum risco detectado.',
    image: FiapusHappy,
  },
  NEUTRAL: {
    text: 'Aqui está o seu resultado!',
    subText: 'Seu diagrama possui alguns riscos que precisam de sua atenção.',
    image: FiapusNeutral,
  },
  SAD_UPLOAD: {
    text: 'Houve um erro ao enviar o diagrama para análise.',
    subText: 'Tente novamente mais tarde',
    image: FiapusSad,
  },
  SAD_RESULT: {
    text: 'Aqui está o seu resultado!',
    subText:
      'Seu diagrama possui riscos críticos que precisam de atenção imediata.',
    image: FiapusSad,
  },
};

export default function FiapusSpeechBubble({
  status,
  bubbleBg = 'white',
  text,
  helperText,
}: FiapusSpeechBubbleProps) {
  return (
    <Flex mt="md" gap="md" align={helperText ? 'flex-end' : 'flex-start'}>
      <Flex mih={37} align="flex-end">
        <Image
          src={speechBubblePropsByStep[status].image}
          alt="fiapus"
          w={60}
          height="auto"
        />
      </Flex>

      <Flex direction="column" align="flex-end">
        <Box className={classes.loginSpeechBubble} bg={bubbleBg}>
          {text ? (
            <span>{text}</span>
          ) : (
            <>
              <span>{speechBubblePropsByStep[status].text}</span>
              {speechBubblePropsByStep[status].subText && (
                <>
                  <br />
                  <span>{speechBubblePropsByStep[status].subText}</span>
                </>
              )}
            </>
          )}
        </Box>
        <Text fz="xs" c="black">
          {helperText}
        </Text>
      </Flex>
    </Flex>
  );
}
