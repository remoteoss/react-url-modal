import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import clipboardCopy from 'clipboard-copy';

export const Code = ({ code }: { code: string }) => (
  <div className="relative">
    <button
      onClick={() => clipboardCopy(code)}
      className="right-6 top-6 absolute
      text-slate-100 hover:text-indigo-200 active:text-green-500"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    </button>
    <Highlight {...defaultProps} code={code} theme={theme} language="jsx">
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} p-4 text-sm`}>
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
  </div>
);
