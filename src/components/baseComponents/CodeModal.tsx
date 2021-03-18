import React, { useState } from 'react';
import {
 Modal, IconButton, TooltipDelay, TooltipHost,
} from '@fluentui/react';
import { useId } from '@uifabric/react-hooks';
import { Prism } from 'react-syntax-highlighter';
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/vs';
import { CodeTextProps } from './CodeText';

export type CodeModalProps = {
  codeText: CodeTextProps;
  visible: boolean;
  onCancel: (ev: React.MouseEvent<HTMLButtonElement> | undefined) => void;
};

export function CodeModal({
  onCancel,
  codeText: {
    language,
    text,
  },
  visible,
}: CodeModalProps): JSX.Element {
  const [tooltipHidden, setTooltipHidden] = useState<boolean>(true);
  const tooltipId = useId('tooltip');
  const buttonId = useId('button');
  return (
<Modal onDismiss={onCancel} isOpen={visible} styles={{ scrollableContent: { position: 'inherit', maxHeight: 'calc(100vh - 50px)' } }}>
    <TooltipHost delay={TooltipDelay.medium} hidden={tooltipHidden} id={tooltipId} content="Скопировано" calloutProps={{ target: `#${buttonId}` }}>
      <IconButton
        aria-describedby={tooltipId}
        style={{ position: 'absolute', right: 10, top: 10 }}
        id={buttonId}
        onClick={async () => {
          await navigator.clipboard.writeText(text);
          setTooltipHidden(false);
          setTimeout(() => {
            setTooltipHidden(true);
          }, 2000);
        }}
        iconProps={{
          iconName: 'Copy',
        }}
      />
    </TooltipHost>

    <Prism
      customStyle={{ marginTop: '50px' }}
      language={language}
      style={{ ...vs, position: 'relative' }}
    >
      {text}
    </Prism>
</Modal>
);
}
