import { FileButton, Flex, Image, Menu, Text } from '@mantine/core';

import ChevronDownIcon from '@/assets/chevron-down.svg';
import UploadIcon from '@/assets/upload-icon.svg';
import { CloseIcon, InfoIcon } from '@/components/icons';

import classes from './report-input.module.css';

type ReportInputTypeMenuProps = {
  selectedDiagramType: string | undefined;
  diagramTypes: string[];
  handleSelectDiagramType: (value: string | undefined) => void;
  handleUpload: (file: File) => void;
};

const allowedTypes = ['image/png', 'image/jpeg'];

export function ReportInputTypeMenu({
  selectedDiagramType,
  diagramTypes,
  handleSelectDiagramType,
  handleUpload,
}: ReportInputTypeMenuProps) {
  return (
    <Menu shadow="md" width={360} disabled={!!selectedDiagramType}>
      <Menu.Target>
        <Flex
          className={classes.reportInputSelect}
          onClick={() => handleSelectDiagramType(undefined)}
        >
          <Text fw={700} fz="sm" c="secondary.7">
            {selectedDiagramType || 'Selecione o tipo de diagrama'}
          </Text>
          {selectedDiagramType ? (
            <CloseIcon />
          ) : (
            <Image
              src={ChevronDownIcon}
              alt="chevron down"
              w={selectedDiagramType ? 24 : 16}
              h={selectedDiagramType ? 24 : 16}
            />
          )}
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        {diagramTypes.map((diagramType) => (
          <FileButton
            key={diagramType}
            accept={allowedTypes.join(',')}
            onChange={(file) => {
              if (!file) return;
              console.log('entrei aqui');
              handleSelectDiagramType(diagramType);
              handleUpload(file);
            }}
          >
            {(props) => (
              <Menu.Item
                {...props}
                closeMenuOnClick={false}
                rightSection={
                  <Image src={UploadIcon} alt="icone de upload" w={24} h={24} />
                }
                fz="sm"
                // onClick={() => handleSelectReport(reportType.name)}
              >
                {diagramType}
              </Menu.Item>
            )}
          </FileButton>
        ))}
        <Menu.Label c="primary.7">
          <Flex align="center" gap="xs">
            <InfoIcon />
            <Text fz="sm">
              Escolher um tipo de diagrama auxilia nossa IA, ao direcionar sua
              análise de maneira mais específica.
            </Text>
          </Flex>
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
}
