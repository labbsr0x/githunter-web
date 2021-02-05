import React from 'react';

import {
  NodeJSIcon,
  PythonIcon,
  ShellIcon,
  ActionScriptIcon,
  OthersTypesIcon,
} from '../../assets/svg';

interface LanguageIconProps {
  lang: string;
}

const LanguageIcon: React.FC<LanguageIconProps> = ({
  lang,
}: LanguageIconProps) => {
  const language = lang.toLowerCase();
  switch (language) {
    case 'node.js':
    case 'nodejs':
      return <NodeJSIcon title={lang} />;
    case 'python':
      return <PythonIcon title={lang} />;
    case 'shell':
    case 'bash':
      return <ShellIcon title={lang} />;
    case 'actionscript':
      return <ActionScriptIcon title={lang} />;

    default:
      return <OthersTypesIcon title={lang} />;
  }
};

export default LanguageIcon;
