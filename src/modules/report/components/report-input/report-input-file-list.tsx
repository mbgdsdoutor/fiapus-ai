import { ActionIcon, Box, Card, Flex, Text } from '@mantine/core';

import { extractExtensionFromMime } from '@/common/utils/file.utils';
import { CloseIcon } from '@/components/icons';

import classes from './report-input.module.css';

type ReportInputFileListProps = {
  diagramType: string;
  uploadedFile: File;
  handleRemoveFile: () => void;
};

export function ReportInputFileList({
  diagramType,
  uploadedFile,
  handleRemoveFile,
}: ReportInputFileListProps) {
  const hasUploadedFiles = !!uploadedFile;

  return (
    <Flex mt={hasUploadedFiles ? 'lg' : 0} direction="column" gap={4} w="100%">
      <Card
        key={`${diagramType}-${uploadedFile.name}`}
        className={classes.fileCard}
      >
        <Flex align="center" justify="space-between">
          <Text fw={700} fz="sm">
            {diagramType}
          </Text>

          <Flex gap="xs" align="center">
            <Box maw={300}>
              <Text fz="sm" truncate="end">
                {uploadedFile.name}
              </Text>
            </Box>
            <Flex className={classes.fileCardMimeType} mr="xs">
              {extractExtensionFromMime(uploadedFile.type)}
            </Flex>
            <ActionIcon variant="transparent" onClick={handleRemoveFile}>
              <CloseIcon size={24} color="#303030" />
            </ActionIcon>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
