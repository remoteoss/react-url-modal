import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
export const Code = ({ code }: { code: string }) => (
  <Highlight {...defaultProps} code={code} theme={theme} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={`${className} p-4`}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);
