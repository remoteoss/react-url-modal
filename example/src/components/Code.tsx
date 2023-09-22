import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import clipboardCopy from 'clipboard-copy';
import { CopyIcon } from './Icons';

export const Code = ({ code }: { code: string }) => (
  <div className="relative max-w-screen overflow-auto">
    <button
      onClick={() => clipboardCopy(code)}
      className="right-6 top-6 absolute
      text-slate-100 hover:text-indigo-200 active:text-green-500 hidden md:block"
      type="button"
    >
      <CopyIcon />
    </button>
    <Highlight {...defaultProps} code={code} theme={theme} language="jsx">
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} p-4 text-sm`}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </div>
);
