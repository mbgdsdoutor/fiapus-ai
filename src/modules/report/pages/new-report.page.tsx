import { Box } from '@mantine/core';
import { useState } from 'react';

import { FiapusSpeechBubble } from '@/components/data-display/fiapus-speech-bubble';
import { ReportInput } from '@/modules/report/components/report-input';

import { CardLinkGroup } from '../components/card-link-group';
import { FiapusStatusEnum } from '../report.types';

export default function NewReportPage() {
  const [status, setStatus] = useState<FiapusStatusEnum>(
    FiapusStatusEnum.HAPPY_INITIAL,
  );

  const handleUpdateFiapusStatus = (status: FiapusStatusEnum) => {
    setStatus(status);
  };

  return (
    <Box w={704} maw="100%" mt={80}>
      <FiapusSpeechBubble status={status} />
      <Box mt="md">
        <ReportInput handleUpdateFiapusStatus={handleUpdateFiapusStatus} />
      </Box>

      <CardLinkGroup />
    </Box>
  );
}
