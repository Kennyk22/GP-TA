import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import { useSelector } from "react-redux";
import { WholeState } from "../Types/Types";

export default function CopyToClipboardButton() {
  const [isCopied, setIsCopied] = useState(false);
  const GPTAstate = useSelector((state: WholeState) => state.GPTA)
  const textToCopy = GPTAstate.highlightResult + GPTAstate.listResult + GPTAstate.suggestionResult

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

function cleanText(html:any) {
  let cleaned = html.replace(/<[^>]*>/g, '').replace(/\\/g, '');
  return cleaned;
}

const finalText = cleanText(textToCopy)
  return (
    <div className="container mb-3 font-bold text-red-700 text-xl">
      <div className="code-snippet">
        <div className="code-section">
          {/* <pre>{codeSnippet}</pre> */}
          <CopyToClipboard text={finalText} onCopy={onCopyText}>
            <span>{isCopied ? "Copied!" : <MdContentCopy />}</span>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}