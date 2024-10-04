import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface DebugInfoProps {
  data: any;
  title: string;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ data, title }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Button onClick={copyToClipboard} variant="outlined" size="small" sx={{ mb: 1 }}>
        Copy to Clipboard
      </Button>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </Box>
  );
};

export default DebugInfo;